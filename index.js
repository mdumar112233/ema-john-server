const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');

const port = 4000
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ij0ac.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express()
app.use(bodyParser.json());
app.use(cors());



app.get('/', (req, res) => {
  res.send('Hello World!')
})




client.connect(err => {
  const producCollection = client.db("ema-john-store").collection("products");
  const orderCollection = client.db("ema-john-store").collection("orders");

  app.post('/addProduct', (req, res) => {
      const products = req.body;
      producCollection.insertMany(products)
      .then(result => {
        res.send(result.insertedCount > 0)
      })
  })

  app.get('/products', (req, res) => {
    producCollection.find({})
    .toArray((err, documents) => {
      res.send(documents);
    })
  })

  app.get('/product/:key', (req, res) => {
    console.log({key: req.params.key});
    producCollection.find({key: req.params.key})
    .toArray((err, documents) => {
      res.send(documents[0]);
    })
  })

  app.post('/productsByKeys', (req, res) => {
    const productKeys = req.body;
    producCollection.find({key: {$in: productKeys}})
    .toArray((err, documents) => {
      res.send(documents);
    })
  })

  app.post('/addOrder', (req, res) => {
    const order  = req.body;
    orderCollection.insertOne(order)
    .then(result => {
      res.send(result.insertedCount > 0)
    })
})

});



app.listen(process.env.PORT || port)

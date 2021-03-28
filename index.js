const express = require('express')
const app = express()
const port = 4000
ema-john-store
const pass = 'gJlvwY7mzcO0DWGS';
app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.listen(port)

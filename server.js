const path = require('path')
const express = require('express')
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({ extended: false  }))
app.use(bodyParser.json())
app.use(express.static(path.resolve(__dirname, '..', 'html')))

const db = require('./config/db.js')
const port = 8000


MongoClient.connect(db.url,(err, database) => {
  if(err) return console.log(err)
  require('./routes')(app, database)

  app.listen(port, () => {
        console.log(`server is listening on ${port}`)
  }
)})

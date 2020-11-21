const express = require('express');
const app = express();
const connectionString = 'mongodb://localhost:27017/'
var cors = require('cors')
app.use(cors())



var bodyParser = require('body-parser')
  
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
 
// app.use(function (req, res) {
//   res.setHeader('Content-Type', 'text/plain')
//   res.write('you posted:\n')
//   res.end(JSON.stringify(req.body, null, 2))
// })




const MongoClient = require('mongodb').MongoClient

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    const db = client.db('recipes')
    console.log('Connected to Database')

    app.get('/recipes', (req, res) =>{
        console.log('asd')
        db.collection('recipes').find().toArray()
        .then(results => {
            console.log(results)
            res.send(results)
        })
    })
    app.post('/addrecipe', (req, res) => {
        db.collection('recipes').insertOne(req.body)
          .then(result => {
            console.log(result)
          })
          .catch(error => console.error(error))
        })
      }).catch(error => console.error(error))


app.listen(3000, function() {
    console.log('listening on 3000')
  })


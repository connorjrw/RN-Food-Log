const express = require('express');
const app = express();
const connectionString = 'mongodb://localhost:27017/'
var cors = require('cors')
app.use(cors())
const multer = require('multer');
const path = require('path');
const helpers = require('./helpers');
app.use(express.static(__dirname));
var fs = require('fs')




var bodyParser = require('body-parser')
  
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'uploads/');
  },

  // By default, multer removes file extensions so let's add them back
  filename: function(req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});



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
            var oldPath = req.body.photoLocation.substr(7)
            var newPath = './Images/' + result.insertedId + '.png'
            fs.rename(oldPath, newPath, function (err) {
              if (err) throw err
            })
            console.log(result)
          })
          .catch(error => console.error(error))
        })
      }).catch(error => console.error(error))


app.listen(3000, function() {
    console.log('listening on 3000')
  })


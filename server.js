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
// app.use(bodyParser.urlencoded({ extended: false }))
 
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

var mongodb = require('mongodb');

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
    app.get('/foodlog', (req, res) =>{
      date_req = req.query.date
      console.log('date', date_req)
      db.collection('foodlog').find({date:date_req}).toArray()
      .then(results => {
          db.collection('recipes').find({"_id":new mongodb.ObjectId(results[0].food_id)}).toArray()
            .then(rec_result => {
            // console.log('res', results). 
            console.log('the results', results, rec_result)
            var merged_results = {
              "_id": results[0]._id,
              "recipe_id":rec_result[0]._id,
              "name": rec_result[0].name,
              "description":rec_result[0].description,
              "photoLocation":rec_result[0].photoLocation,
              "fileName":rec_result[0].fileName,
              "date":results[0].date,
              "type":results[0].type
            }
            res.send([merged_results])
          }).catch(err => {
            console.log(err)
            res.send([])
          })
          // res.send(results)
      }).catch(err => {
        console.log('no results?')
        res.send([])
      })
  })
    app.post('/removefood', (req,res) => {
      var query = {"_id":new mongodb.ObjectId(req.body.id)}
      console.log(query)
      db.collection('recipes').deleteOne(query, () => {
          // console.log(res)
          console.log('deleted')
          // res.send()
      }).catch(err => {
        console.log(err)
      })
    })
    app.post('/addrecipe', (req, res) => {
        db.collection('recipes').insertOne(req.body)
          .then(result => {
            console.log(result)
            var oldPath = req.body.photoLocation.substr(7)
            var newPath = './Images/' + result.insertedId + '.png'
            fs.rename(oldPath, newPath, (err) => {
              console.log('do nothing with error')
            })
            res.send()
          })
          .catch(error => console.error(error))
        }) 
      }).catch(error => console.error(error))


app.listen(3000, function() {
    console.log('listening on 3000')
  })


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
      var final_result = [];
      db.collection('foodlog').find({date:date_req}).toArray()
      .then(results => {
            (async function loop() {
              if(results.length == 0){
                res.send([])
              }
              else{
              for (let i = 0; i < results.length; i++) {
                    await new Promise(resolve => {
                        db.collection('recipes').find({"_id":new mongodb.ObjectId(results[i].food_id)}).toArray()
                            .then(rec_result => {
                            var currentResult = {
                              "_id": results[i]._id,
                              "recipe_id":rec_result[0]._id,
                              "name": rec_result[0].name,
                              "description":rec_result[0].description,
                              "photoLocation":rec_result[0].photoLocation,
                              "fileName":rec_result[0].fileName,
                              "date":results[i].date,
                              "type":results[i].type
                            }
                            final_result.push(currentResult)
                            if(i == results.length - 1){
                              final_result.sort(function(a, b){
                                let aVal = 0
                                let bVal = 0
                                // console.log('namea.name)
                                switch(a.type){
                                  case 'Breakfast':
                                    aVal = 1
                                    break;
                                  case 'Lunch':
                                    aVal = 2
                                    break;
                                  case 'Dinner':
                                    aVal = 3
                                    break;
                                }
                                switch(b.type){
                                  case 'Breakfast':
                                    bVal = 1
                                    break;
                                  case 'Lunch':
                                    bVal = 2
                                    break;
                                  case 'Dinner':
                                    bVal = 3
                                    break;
                                }
                                console.log(aVal, bVal, a.type)
                                if (aVal < bVal) {
                                  return -1;
                                }
                                if (aVal > bVal) {
                                  return 1;
                                }
                                return 0;
                              })
                              // console.log('final', final_result)
                              res.send(final_result)
                            }
                            resolve()
                          }).catch(err => {
                            console.log(err)
                          })
                  }).then( () => {
                  });
              }
            }
        })()
      }).catch(err => {
        console.log(err)
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
    app.post('/addfood', (req,res) => {
      db.collection('foodlog').insertOne(req.body)
        .then(result => {
          res.send()
        })
    })
    app.post('/addrecipe', (req, res) => {
        db.collection('recipes').insertOne(req.body)
          .then(result => {
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


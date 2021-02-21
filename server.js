const config = require('./config.js')

const express = require('express');
const app = express();
const connectionString = config.connectionString

var cors = require('cors')
app.use(cors())

app.use(express.static(__dirname));
var fs = require('fs')

var bodyParser = require('body-parser')
app.use(bodyParser.json())


var mongodb = require('mongodb');
const MongoClient = require('mongodb').MongoClient
MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    const db = client.db('recipes')
    console.log('Connected to Database')

    app.get('/recipes', (req, res) =>{
        db.collection('recipes').find().toArray()
        .then(results => {
            var reversed_results = results.reverse()
            res.send(reversed_results)
        })
    })
    app.get('/getrecipe/', (req,res) => {
      db.collection('recipes').find({"_id":new mongodb.ObjectId(req.query.id)}).toArray()
        .then(results => {
          res.send(results)
        })
    })
    app.get('/foodlog', (req, res) =>{
      date_req = req.query.date
      var final_result = [];
      var new_result = {};
      db.collection('foodlog').find({date:date_req}).toArray()
      .then(results => {
            (async function loop() {
              if(results.length == 0){
                res.send({})
              }
              else{
              for (let i = 0; i < results.length; i++) {
                    await new Promise(resolve => {
                        db.collection('recipes').find({"_id":new mongodb.ObjectId(results[i].food_id)}).toArray()
                            .then(rec_result => {
                            if(rec_result[0]){
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
                            if (!new_result[results[i].type]){
                              new_result[results[i].type] = []
                            }
                            new_result[results[i].type].push(currentResult)
                            final_result.push(currentResult)
                          }else{
                            console.log('Menu item Deleted!')
                          }
                            if(i == results.length - 1){
                              let ordered_result = {}
                              if(new_result['Breakfast']){
                                ordered_result['Breakfast'] = new_result['Breakfast']
                              }
                              if(new_result['Lunch']){
                                ordered_result['Lunch'] = new_result['Lunch']
                              }
                              if(new_result['Dinner']){
                                ordered_result['Dinner'] = new_result['Dinner']
                              }
                            
                              res.send(ordered_result)
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
    app.post('/removeentryitem', (req,res) => {
        var query = {"_id":new mongodb.ObjectId(req.body.id)}
        db.collection('foodlog').deleteOne(query, () => {
            res.send()
        })
      })
    app.post('/removefood', (req,res) => {
      var query = {"_id":new mongodb.ObjectId(req.body.id)}
      db.collection('recipes').deleteOne(query, () => {
          res.send()
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
        if(!req.body.id){
        db.collection('recipes').insertOne(req.body)
          .then(result => {
            if(req.body.photoLocation){ //only if photo has been chosen
            var oldPath = req.body.photoLocation.substr(7)
            var newPath = './Images/' + result.insertedId + '.png'
            fs.rename(oldPath, newPath, (err) => {
              console.log('error', err)
            })
          } 
            res.send(result.ops[0])
          })
          .catch(error => console.error(error))
        } else{

          var query = {"_id":new mongodb.ObjectId(req.body.id)}
          db.collection('recipes').updateOne(query, {$set:req.body}, {upsert:true}).then(result => {
            if(req.body.photoLocation){ //only if photo has been chosen
              var oldPath = req.body.photoLocation.substr(7)
              var newPath = './Images/' + req.body.id + '.png'
              fs.unlink(newPath, err => {
                console.log('error', err)
              })
              console.log(oldPath, newPath)
              fs.rename(oldPath, newPath, (err) => {
                console.log('do nothing with error')
              })
            }
            res.send(req.body)

          })
        .catch(err => {
          console.log(err)
        })
        }
      })
    })


app.listen(3000, function() {
    console.log('listening on 3000')
  })
  

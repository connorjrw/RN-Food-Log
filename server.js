const config = require('./config.js')

const express = require('express');
const app = express();
const connectionString = config.connectionString

var cors = require('cors')
app.use(cors())

app.use(express.static(__dirname));
var fs = require('fs')

var bodyParser = require('body-parser')

app.use(bodyParser.json({limit: '50mb', extended: true}))


var mongodb = require('mongodb');
const MongoClient = require('mongodb').MongoClient
MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    const db = client.db('foodlog_db')
    console.log('Connected to Database')

    app.get('/menuitems', (req, res) => {
      db.collection('menuitems').find().toArray()
        .then(results => {
          var reversed_results = results.reverse()
          res.send(reversed_results)
        })
    })
    app.get('/menuitem/', (req, res) => {
      db.collection('menuitems').find({ "_id": new mongodb.ObjectId(req.query.id) }).toArray()
        .then(results => {
          res.send(results)
        })
    })
    app.get('/logentries', (req, res) => {
      date_req = req.query.date
      var new_result = {};
      db.collection('logentries').find({ date: date_req }).toArray()
        .then(results => {
          (async function loop() {
            if (results.length == 0) { // Don't try to do anything when no results
              res.send({})
            }
            else {
              // Convert from array to object with key as type ({Breakfast:[{}], Lunch:[{}], Dinner:[{}]])
              for (let i = 0; i < results.length; i++) {
                if (!new_result[results[i].type]) {
                  new_result[results[i].type] = []
                }
                new_result[results[i].type].push(results[i])
              }
              // Show breakfast items first, then lunch, then dinner
              let ordered_result = {}
              if (new_result['Breakfast']) {
                ordered_result['Breakfast'] = new_result['Breakfast']
              }
              if (new_result['Lunch']) {
                ordered_result['Lunch'] = new_result['Lunch']
              }
              if (new_result['Dinner']) {
                ordered_result['Dinner'] = new_result['Dinner']
              }
              res.send(ordered_result)
              }
            })()
        }).catch(err => {
          console.log(err)
        })
    })
    app.post('/removeentryitem', (req, res) => {
      var query = { "_id": new mongodb.ObjectId(req.body.id) }
      db.collection('foodlog').deleteOne(query, () => {
        res.send()
      })
    })
    app.post('/removemenuitem', (req, res) => {
      var query = { "_id": new mongodb.ObjectId(req.body.id) }
      db.collection('menuitems').deleteOne(query, () => {
        res.send()
      }).catch(err => {
        console.log(err)
      })
    })
    app.post('/addentry', (req, res) => {
      console.log('res', req.body)
      db.collection('logentries').insertOne(req.body)
        .then(result => {
            // Copy image from menu item to log. 
            // Double handling but we want to be able to see the record if the menu item is deleted
            // Could also have a unique image attached to the log - seperate to the menu item ??
            var oldPath = './Images/' + req.body.food_id + '.png'
            var newPath = './Images/' + result.insertedId + '.png'
            fs.copyFile(oldPath, newPath, (err) => {
            console.log('error', err)
            })
          res.send()
        })
    })
    app.post('/addmenuitem', (req, res) => {
      if (!req.body.id) {
        db.collection('menuitems').insertOne(req.body)
          .then(result => {
            if (req.body.photoLocation) { //only if photo has been chosen
              var base64Image = req.body.photoData
              var newPath = './Images/' + result.insertedId + '.png'
              fs.writeFile(newPath, base64Image, 'base64', (err) => {
                if(err) throw err
              })
              // fs.rename(oldPath, newPath, (err) => {
              //   console.log('error', err)
              // })
            }
            res.send(result.ops[0])
          })
          .catch(error => console.error(error))
      } else {

        var query = { "_id": new mongodb.ObjectId(req.body.id) }
        db.collection('menuitems').updateOne(query, { $set: req.body }, { upsert: true }).then(result => {
          if (req.body.photoLocation) { //only if photo has been chosen
            var base64Image = req.body.photoData
            // var oldPath = req.body.photoLocation.substr(7)
            var newPath = './Images/' + req.body.id + '.png'
            fs.writeFile(newPath, base64Image, 'base64', (err) => {
              if(err) throw err
            })
          }
          // res.send(result.ops[0])
          res.send(req.body)

        })
          .catch(err => {
            console.log(err)
          })
      }
    })
  })


app.listen(3000, function () {
  console.log('listening on 3000')
})


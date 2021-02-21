// api - node server.js
const api = "http://connor.local:3000/"

// Local image server -  http-server ./images
const imageLocation = 'http://connor.local:8080/' 

//Connection string for Mongo server
const connectionString = 'mongodb://localhost:27017/'   

exports.api = api
exports.imageLocation = imageLocation
exports.connectionString = connectionString
//DO NOT FORGET TO SET UP YOUR PROCFILE COREECTLY

// Use the environment variable or use a given port
const PORT = process.env.PORT || 5000;

// Create a server, uses `handleRequest` which is function that takes
// care of providing requested data
//const server = http.createServer(handleRequest);

var express = require('express')
var server = express()
var ejs = require('ejs');
var parser = require('body-parser')
const {client}= require('pg')


server.use(express.json)
server.use(parser.urlencoded({extended: true}))
server.set('views engine','ejs')

server.get('/', (req,res)=>{
  // res.send("hello its me")
  res.render('portfolio')
})

// Start the server
server.listen(PORT, () => {
  console.log('Server listening on: http://localhost:%s', PORT);
});

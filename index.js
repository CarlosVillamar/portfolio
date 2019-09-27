//DO NOT FORGET TO SET UP YOUR PROCFILE COREECTLY
// heroku pg:psql postgresql-deep-22332 --app cv-portfilo
// Use the environment variable or use a given port
const PORT = process.env.PORT || 8080;

// Create a server, uses `handleRequest` which is function that takes
// care of providing requested data
//const server = http.createServer(handleRequest);
// var connectionString = 'postgres://postgres' + ':' + process.env.POSTGRES_PASSWORD + '@localhost/blog';
// console.log(process.env.DATABASE_URL)
// var connectionString = process.env.DATABASE_URL
var connectionString = 'postgres://rqyuuegdamtgnm:c18a72bfca04876804550396dc037c0933e8d5abd53aa67af572497c34718e72@ec2-54-243-235-153.compute-1.amazonaws.com:5432/dbadqlplncc2qi'
var express = require('express')
var server = express()
var parser = require('body-parser')
var ejs = require('ejs')
const { Client } = require('pg')

// console.log(connectionString)
server.set('view engine', 'ejs')

// server.use(express.static('css'));
// server.use(express.static('images'));
server.use(express.static('public'))
server.use(express.json())
server.use(parser.urlencoded({ extended: true }))

server.get('/', (req, res) => {
  // res.send("hello its me")
  res.render('portfolio')
})


server.get('/blog', (req, res) => {

  const client = new Client({
    connectionString: connectionString,
    ssl: true
  })
  client.connect()
    .then(() => {
      return client.query(`SELECT * FROM blogs ORDER BY ID ASC`)
    })
    .then((result) => {
      // render index page

      return res.render('blog', {
        result
      })
    })
})


server.post('/add', (req, res) => {
  let data = req.body;
  const client = new Client({
    connectionString: connectionString,
    // ssl:true
  })
  client.connect()
    .then(() => {

      console.log('inserted a message.');
      return client.query(`INSERT INTO blogs (title, body) VALUES ($1, $2)`, [data.title, data.subject])

    })
  res.redirect('/blog')
})



server.get("/dog", (req, res) => {
  res.render('doggy')
})
server.get('/movies',(req,res)=>{
  res.render('movies')
})
server.get('/napster',(req,res)=>{
  res.render('napster')
})



// Start the server
server.listen(PORT, () => {
  console.log('Server listening on: http://localhost:%s', PORT);
});

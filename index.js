//DO NOT FORGET TO SET UP YOUR PROCFILE COREECTLY

// Use the environment variable or use a given port
const PORT = process.env.PORT || 8080;

// Create a server, uses `handleRequest` which is function that takes
// care of providing requested data
//const server = http.createServer(handleRequest);
var connectionString = 'postgres://postgres' + ':' + process.env.POSTGRES_PASSWORD + '@localhost/blog';


var express = require('express')
var server = express()
var parser = require('body-parser')
var ejs = require('ejs')
const { Client } = require('pg')


server.set('view engine', 'ejs')

server.use(express.static('css'));
server.use(express.json())
server.use(parser.urlencoded({ extended: true }))

server.get('/', (req, res) => {
  // res.send("hello its me")
  res.render('portfolio')
})


server.get('/blog', (req, res) => {

  const client = new Client({
    connectionString: connectionString
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
    connectionString: connectionString
  })
  client.connect()
    .then(() => {

      console.log('inserted a message.');
      return client.query(`INSERT INTO blogs (title, body) VALUES ($1, $2)`, [data.title, data.subject])

    })
  res.redirect('/blog')
})




// Start the server
server.listen(PORT, () => {
  console.log('Server listening on: http://localhost:%s', PORT);
});

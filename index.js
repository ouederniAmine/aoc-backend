const { Pool, Client } = require('pg')
// pools will use environment variables
// for connection information
require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
// clients will also use environment variables
// for connection information
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'Med1212809@',
    port: 5432,
  })
const res =  client.query('SELECT NOW()')


const cors = require('cors')

const app = express();
const port = process.env.PORT || 3002;

app.use(bodyParser.json());

app.use(
    cors({
      origin: ["http://localhost:3001"],
      methods: ["GET", "POST"],
      credentials: true,
    })
  );
  app.use(bodyParser.urlencoded({ extended: false }));
  const query = {
    text: 'SELECT NOW()',
    values: ['brianc', 'brian.m.carlson@gmail.com'],
  }
app.get('/test', (req, res) => {
   client.query(query, (err, res) => {
  if (err) {
    console.log(err.stack)
  } else {
    console.log(res.fields.map(field => field.name)) // ['first_name', 'last_name']
    console.log(res.rows[0]) // ['Brian', 'Carlson']
  }
})
});
app.get('/', (req, res) => res.send('hello world'))
app.get('/crud', (req, res) => main.getTableData(req, res, db))
app.post('/crud', (req, res) => main.postTableData(req, res, db))
app.put('/crud', (req, res) => main.putTableData(req, res, db))
app.delete('/crud', (req, res) => main.deleteTableData(req, res, db))

app.listen(port, () => {
    console.log(`Server listening on the port  ${port}`);
})
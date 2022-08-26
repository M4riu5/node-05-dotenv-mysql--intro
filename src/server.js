require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
// eslint-disable-next-line no-unused-vars
const colors = require('colors');
const mysql = require('mysql2/promise')

const app = express();
const port = process.env.PORT || 5000;
// Config
const dbConfig= {
  host: 'localhost',
  user: 'root',
  password: '',
  port: '3306',
  database: 'type12',
}
// Middleware
app.use(morgan('dev'));

// connect(process.env.LOGIN, process.env.PASS)
// Routes
app.get('/', (req, res) => {
  res.json({ msg: 'Hello World' });
});
app.get('/api/posts', async (req , res)=> {
 try {
     // 1. prisijungti prie db
  const connection = await mysql.createConnection(dbConfig)
  console.log('Connected to db'.bgGreen.bold)
 // 2. atlikti veiksma
  const sql = 'SELECT * FROM posts';
  const [rows, fields] = await connection.query(sql)
  console.log('rows ---->', rows);
  res.json(rows)
 // 3.uzdaryti prisijungima
 connection.end()
 } catch (error) {
     console.log('Error Connecting to db'.bgRed.bold, error)
     // 4. gaudyti klaidas
     res.status(500).json({ msg: 'something went wrong' })
 }
})

app.use((req,res) => {
  res.status(404).json({
    msg: 'Not found',
  });
});

console.log('process.env.MY_NAME ---->', process.env.LOGIN);

app.listen(port, () => console.log(`Server is running ${port}`));

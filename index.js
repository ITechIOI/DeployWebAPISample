const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');

const app = express();
const port = 3000;

const config = {
  user: 'ITechIOI',
  password: 'Loantuyetcute123',
  server: 'itechioitimemanagement.database.windows.net',
  database: 'ITechIOI',
  options: {
    encrypt: true,
    trustServerCertificate: false
  }
};

app.use(bodyParser.json());

app.all('/', (req, res) => {
  res.send('Hello World!');
});

// app.post('/test-sql', async (req, res) => {
//   try {
//     let pool = await sql.connect(config);
//     let query = req.body.query;
//     let result = await pool.request().query(query);
//     res.json(result);
//     sql.close();
//   } catch (err) {
//     console.error('Database connection error:', err);
//     res.status(500).send('Database connection error');
//   }
// });

app.post('/test-sql', async (req, res) => {
  try {
    console.log('Received query:', req.body.query);  // Logging câu truy vấn nhận được
    let pool = await sql.connect(config);
    let query = req.body.query;
    let result = await pool.request().query(query);
    console.log('Query result:', result.recordset);  // Logging kết quả truy vấn
    res.json(result.recordset);
    sql.close();
  } catch (err) {
    console.error('Database connection error:', err);
    res.status(500).send('Database connection error');
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

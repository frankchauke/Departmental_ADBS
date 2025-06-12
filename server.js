const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const path = require('path');
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Azure SQL Database configuration
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: true,
    trustServerCertificate: false
  }
};

// POST route to receive form data and insert into SQL
app.post('/submit', async (req, res) => {
  const { name, department, age } = req.body;

  try {
    await sql.connect(dbConfig);
    await sql.query`
      INSERT INTO DataTable (Name, Department, Age)
      VALUES (${name}, ${department}, ${age})
    `;
    res.status(200).send({ message: 'Data inserted successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Failed to insert data' });
  }
});

// Serve index.html on root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Environment variable checks (optional but helpful)
['DB_USER', 'DB_PASSWORD', 'DB_SERVER', 'DB_NAME'].forEach(varName => {
  if (!process.env[varName]) {
    console.warn(`⚠️ Warning: Environment variable ${varName} is not set`);
  }
});

// Azure SQL Database configuration
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: true, // for Azure
    trustServerCertificate: false
  }
};

// POST route to receive form data and insert into SQL
app.post('/submit', async (req, res) => {
  const { name, department, age } = req.body;

  try {
    const pool = await sql.connect(dbConfig);
    await pool.request()
      .input('Name', sql.NVarChar, name)
      .input('Department', sql.NVarChar, department)
      .input('Age', sql.Int, age)
      .query('INSERT INTO DataTable (Name, Department, Age) VALUES (@Name, @Department, @Age)');
    
    res.status(200).send({ message: 'Data inserted successfully!' });
  } catch (err) {
    console.error('❌ Database error:', err);
    res.status(500).send({ error: 'Failed to insert data' });
  }
});

// Serve index.html for root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});

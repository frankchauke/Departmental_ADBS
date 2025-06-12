const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ✅ Serve static files (like your form) from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Azure SQL Database config using environment variables
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

// ✅ POST route to receive form data and insert into SQL
app.post('/submit', async (req, res) => {
  const { name, department, age } = req.body;

  try {
    await sql.connect(dbConfig);
    const result = await sql.query`
      INSERT INTO DataTable (Name, Department, Age)
      VALUES (${name}, ${department}, ${age})
    `;
    res.status(200).send({ message: 'Data inserted successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Failed to insert data' });
  }
});

// ✅ Start server
//app.listen(port, () => {
//  console.log(`Server running on port ${port}`);
//});

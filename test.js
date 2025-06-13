const sql = require('mssql');

const dbConfig = {
  user: 'Admin2025',                // <-- replace with your DB username
  password: 'DepartPassword2025',        // <-- replace with your DB password
  server: 'ojdeptserver.database.windows.net',
  database: 'Departmental_ADBS',            // <-- replace with your DB name
  options: {
    encrypt: true,
    trustServerCertificate: false
  }
};

(async () => {
  try {
    let pool = await sql.connect(dbConfig);
    const result = await pool.request()
      .query("SELECT TOP 1 * FROM DataTable");
    console.log('Connection test successful', result.recordset);
  } catch (err) {
    console.error('Connection test failed:', err);
  } finally {
    sql.close();
  }
})();

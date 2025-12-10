require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
async function migrate() {
  const pool = new Pool({
    host: process.env.PGHOST || 'localhost',
    user: process.env.PGUSER || 'postgres',
    password: process.env.PGPASSWORD || '',
    database: process.env.PGDATABASE || 'postgres',
    port: process.env.PGPORT ? parseInt(process.env.PGPORT, 10) : 5432,
  });

  const sqlPath = path.join(__dirname, 'sql', 'init.sql');
  if (!fs.existsSync(sqlPath)) {
    console.warn('No migration file found at', sqlPath);
    await pool.end();
    return;
  }

  const sql = fs.readFileSync(sqlPath, 'utf8');
  try {
    // Run migration SQL - this may contain multiple statements
    await pool.query(sql);
    console.log('Migration applied successfully');
  } catch (err) {
    console.error('Migration failed:', err.message || err);
    await pool.end();
    process.exit(1);
  }
  await pool.end();
}

(async () => {
  await migrate();
})();

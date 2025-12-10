require('dotenv').config();
const express = require('express');
const path = require('path');
const { Pool } = require('pg');
const cors = require('cors');

const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT ? parseInt(process.env.PGPORT, 10) : undefined,
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/users', async (req, res) => {
  const { name, email, department } = req.body;
  if (!name || !email || !department) {
    return res.status(400).json({ error: 'name, email and department are required' });
  }
  try {
    const text = 'INSERT INTO users(name, email, department) VALUES($1,$2,$3) RETURNING *';
    const values = [name, email, department];
    const result = await pool.query(text, values);
    res.status(201).json({ user: result.rows[0] });
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ error: 'email already exists' });
    }
    console.error(err);
    res.status(500).json({ error: 'internal server error' });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users ORDER BY id DESC LIMIT 100');
    res.json({ users: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));

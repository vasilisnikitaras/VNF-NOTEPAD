require('dotenv').config();
console.log("DATABASE_URL LOADED:", process.env.DATABASE_URL);

const express = require('express');
const path = require('path');
const { Pool } = require('pg');

const app = express();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

(async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS notes (
      id BIGSERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      content TEXT NOT NULL
    );
  `);
})();

app.get('/api/notes', async (req, res) => {
  const result = await pool.query('SELECT id, title, content FROM notes ORDER BY id DESC');
  res.json(result.rows);
});

app.post('/api/notes', async (req, res) => {
  const { title, content } = req.body;
  const result = await pool.query(
    'INSERT INTO notes (title, content) VALUES ($1, $2) RETURNING id, title, content',
    [title, content]
  );
  res.json(result.rows[0]);
});

app.delete('/api/notes/:id', async (req, res) => {
  const id = Number(req.params.id);
  await pool.query('DELETE FROM notes WHERE id = $1', [id]);
  res.json({ ok: true });
});


// ⭐⭐⭐ FIX EDIT ⭐⭐⭐

// GET note by ID
app.get('/api/notes/:id', async (req, res) => {
  const id = Number(req.params.id);
  const result = await pool.query(
    'SELECT id, title, content FROM notes WHERE id = $1',
    [id]
  );
  res.json(result.rows[0]);
});

// UPDATE note
app.put('/api/notes/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { title, content } = req.body;

  const result = await pool.query(
    'UPDATE notes SET title = $1, content = $2 WHERE id = $3 RETURNING id, title, content',
    [title, content, id]
  );

  res.json(result.rows[0]);
});


const PORT = 5005;
app.listen(PORT, () => {
  console.log(`VNF NOTEPAD running on http://localhost:${PORT}`);
});

require('dotenv').config(); 
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// === База данных ===
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Ошибка подключения к БД:', err.message);
  } else {
    console.log('✅ Подключено к SQLite БД');
  }
});

db.exec(`
  CREATE TABLE IF NOT EXISTS azkars (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    arabic TEXT NOT NULL,
    transliteration TEXT,
    translation TEXT,
    category TEXT,
    count INTEGER DEFAULT 1
  );
`);

// === Админ-ключ ===
const ADMIN_API_KEY = process.env.ADMIN_API_KEY;

function authenticateAdmin(req, res, next) {
  const key = req.headers['x-admin-key'];
  if (!key) return res.status(401).json({ error: 'Требуется API-ключ администратора' });
  if (key !== ADMIN_API_KEY) return res.status(403).json({ error: 'Неверный API-ключ' });
  next();
}

// === Маршруты ===
app.get('/azkars', (req, res) => {
  const category = req.query.category;
  let sql = 'SELECT * FROM azkars';
  let params = [];

  if (category) {
    sql += ' WHERE category = ?';
    params.push(category);
  }

  db.all(sql, params, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.get('/azkars/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM azkars WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Азкар не найден' });
    res.json(row);
  });
});

app.post('/azkars', authenticateAdmin, (req, res) => {
  const { arabic, transliteration, translation, category, count = 1 } = req.body;

  if (!arabic || !translation) {
    return res.status(400).json({ error: 'Поля "arabic" и "translation" обязательны' });
  }

  const sql = `INSERT INTO azkars (arabic, transliteration, translation, category, count)
               VALUES (?, ?, ?, ?, ?)`;

  db.run(sql, [arabic, transliteration, translation, category, count], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({
      id: this.lastID,
      arabic,
      transliteration,
      translation,
      category,
      count,
    });
  });
});

app.delete('/azkars/:id', authenticateAdmin, (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM azkars WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Азкар не найден' });
    res.json({ message: 'Удалён', id });
  });
});

// === Запуск сервера ===
app.listen(PORT, () => {
  console.log(`✅ Сервер запущен на http://localhost:${PORT}`);
  console.log(`🔑 Админ-ключ: ${ADMIN_API_KEY}`);
});
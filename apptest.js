const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

app.use(cors());

const db = new sqlite3.Database('mydatabase.db');

db.serialize(function () {
    db.run("CREATE TABLE IF NOT EXISTS kakeibo (id INTEGER PRIMARY KEY AUTOINCREMENT, nen INT, tsuki INT, nichi INT, purasuokane TEXT, okane REAL, himoku TEXT)");
});

app.use(express.json());

app.get('/data', (req, res) => {
    const year = req.query.year;
    const month = req.query.month;

    if (year && month) {
        // 月次データの取得
        db.all("SELECT id, nen, tsuki, nichi, purasuokane, okane, himoku FROM kakeibo WHERE nen = ? AND tsuki = ?", [year, month], (err, rows) => {
            if (err) {
                res.status(500).send(err.message);
            } else {
                res.json(rows);
            }
        });
    } else {
        // 全データの取得
        db.all("SELECT id, nen, tsuki, nichi, purasuokane, okane, himoku FROM kakeibo", (err, rows) => {
            if (err) {
                res.status(500).send(err.message);
            } else {
                res.json(rows);
            }
        });
    }
});

app.post('/data', (req, res) => {
    const { nen, tsuki, nichi, purasuokane, okane, himoku } = req.body;
    db.run("INSERT INTO kakeibo (nen, tsuki, nichi, purasuokane, okane, himoku) VALUES (?, ?, ?, ?, ?, ?)",
        nen, tsuki, nichi, purasuokane, okane, himoku, function (err) {
            if (err) {
                res.status(500).send(err.message);
            } else {
                res.json({ message: 'データを追加しました。', id: this.lastID });
            }
        });
});

app.delete('/data/:id', (req, res) => {
    const id = req.params.id;
    db.run("DELETE FROM kakeibo WHERE id = ?", id, function (err) {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.json({ message: 'データを削除しました。' });
        }
    });
});

app.listen(port, () => {
    console.log(`サーバーがポート ${port} で起動しました。`);
});

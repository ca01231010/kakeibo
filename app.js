const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

// SQLite3 データベースをオープン
const db = new sqlite3.Database('mydatabase.db');

// データベースが正常にオープンされたら、テーブルを作成
db.serialize(function() {
    db.run("CREATE TABLE IF NOT EXISTS kakeibo (id INTEGER PRIMARY KEY, nen INT, tsuki INT, nichi INT, purasuokane TEXT, okane REAL, himoku TEXT)");
});

app.use(express.json());

app.get('/data', (req, res) => {
    // データベースからデータを読み込む例
    db.all("SELECT nen, tsuki, nichi, purasuokane, okane, himoku FROM kakeibo", (err, rows) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.json(rows);
        }
    });
});

app.post('/data', (req, res) => {
    // POSTリクエストからデータを取得してデータベースに挿入
    const { nen, tsuki, nichi, purasuokane, okane, himoku } = req.body;
    db.run("INSERT INTO kakeibo (nen, tsuki, nichi, purasuokane, okane, himoku) VALUES (?, ?, ?, ?, ?, ?)",
        nen, tsuki, nichi, purasuokane, okane, himoku, function(err) {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.json({ message: 'データを追加しました。', id: this.lastID });
        }
    });
});

app.listen(port, () => {
    console.log(`サーバーがポート ${port} で起動しました。`);
});

  
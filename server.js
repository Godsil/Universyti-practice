const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./db');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public')); // для статики (html, css, js)

app.get('/tasks', (req, res) => {
    connection.query('SELECT * FROM tasks', (err, results) => {
        if (err) return res.status(500).send('Ошибка базы данных');
        res.json(results);
    });
});

app.post('/tasks', (req, res) => {
    const description = req.body.description;
    if (!description) return res.status(400).send('Описание задачи обязательно');

    connection.query(
        'INSERT INTO tasks (description) VALUES (?)',
        [description],
        (err, results) => {
            if (err) return res.status(500).send('Ошибка базы данных');
            res.redirect('/');
        }
    );
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});

const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./db');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public')); // ��� ������� (html, css, js)

app.get('/tasks', (req, res) => {
    connection.query('SELECT * FROM tasks', (err, results) => {
        if (err) return res.status(500).send('������ ���� ������');
        res.json(results);
    });
});

app.post('/tasks', (req, res) => {
    const description = req.body.description;
    if (!description) return res.status(400).send('�������� ������ �����������');

    connection.query(
        'INSERT INTO tasks (description) VALUES (?)',
        [description],
        (err, results) => {
            if (err) return res.status(500).send('������ ���� ������');
            res.redirect('/');
        }
    );
});

app.listen(port, () => {
    console.log(`������ ������� �� http://localhost:${port}`);
});

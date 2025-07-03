const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '16godsi1l03', 
    database: 'tasks_db',
    charset: 'utf8mb4'
});

connection.connect(err => {
    if (err) {
        console.error('Ошибка подключения к базе данных:', err);
        process.exit(1);
    }
    console.log('Подключение к базе данных успешно установлено');
});

module.exports = connection;

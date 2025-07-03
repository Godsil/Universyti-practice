const db = require('../db');

function getAllTasks(callback) {
    db.query('SELECT * FROM tasks', callback);
}

function addTask(description, callback) {
    db.query('INSERT INTO tasks (description) VALUES (?)', [description], callback);
}

module.exports = { getAllTasks, addTask };

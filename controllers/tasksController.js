const Task = require('../models/taskModel');

function getTasks(req, res) {
    Task.getAllTasks((err, results) => {
        if (err) {
            console.error('Ошибка при получении задач:', err);
            return res.status(500).send('Ошибка базы данных');
        }
        res.json(results);
    });
}

function createTask(req, res) {
    const { description } = req.body;

    if (!description || description.trim() === '') {
        return res.status(400).send('Описание задачи обязательно');
    }

    Task.addTask(description.trim(), (err, results) => {
        if (err) {
            console.error('Ошибка при добавлении задачи:', err);
            return res.status(500).send('Ошибка базы данных');
        }
        res.status(201).json({ id: results.insertId, description: description.trim() });
    });
}

module.exports = { getTasks, createTask };

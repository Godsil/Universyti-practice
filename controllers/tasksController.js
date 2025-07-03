const Task = require('../models/taskModel');

function getTasks(req, res) {
    Task.getAllTasks((err, results) => {
        if (err) {
            console.error('������ ��� ��������� �����:', err);
            return res.status(500).send('������ ���� ������');
        }
        res.json(results);
    });
}

function createTask(req, res) {
    const { description } = req.body;

    if (!description || description.trim() === '') {
        return res.status(400).send('�������� ������ �����������');
    }

    Task.addTask(description.trim(), (err, results) => {
        if (err) {
            console.error('������ ��� ���������� ������:', err);
            return res.status(500).send('������ ���� ������');
        }
        res.status(201).json({ id: results.insertId, description: description.trim() });
    });
}

module.exports = { getTasks, createTask };

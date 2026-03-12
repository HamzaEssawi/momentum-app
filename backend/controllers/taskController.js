// backend/controllers/taskController.js
const { validationResult } = require('express-validator');
const Task = require('../models/Task');

// Get all tasks for user
exports.getTasks = async (req, res) => {
    try {
        const { status, priority } = req.query;
        const tasks = await Task.findByUser(req.userId, { status, priority });
        res.json(tasks);
    } catch (error) {
        console.error('Get tasks error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Create new task
exports.createTask = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const taskData = {
            user_id: req.userId,
            ...req.body
        };

        const task = await Task.create(taskData);
        res.status(201).json(task);
    } catch (error) {
        console.error('Create task error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Get single task
exports.getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id, req.userId);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        console.error('Get task error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Update task
exports.updateTask = async (req, res) => {
    try {
        const task = await Task.update(req.params.id, req.userId, req.body);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        console.error('Update task error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Delete task
exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.delete(req.params.id, req.userId);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Delete task error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Get task statistics
exports.getTaskStats = async (req, res) => {
    try {
        const stats = await Task.getStats(req.userId);
        res.json(stats);
    } catch (error) {
        console.error('Get task stats error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};
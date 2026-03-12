// backend/models/Task.js
const mockDb = require('../services/mockDataService');

class Task {
    static async create(taskData) {
        return await mockDb.createTask(taskData);
    }

    static async findByUser(userId, filters = {}) {
        return await mockDb.findTasksByUser(userId, filters);
    }

    static async findById(id, userId) {
        return await mockDb.findTaskById(id, userId);
    }

    static async update(id, userId, updates) {
        return await mockDb.updateTask(id, userId, updates);
    }

    static async delete(id, userId) {
        return await mockDb.deleteTask(id, userId);
    }

    static async getStats(userId) {
        return await mockDb.getTaskStats(userId);
    }
}

module.exports = Task;
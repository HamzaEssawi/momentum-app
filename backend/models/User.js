// backend/models/User.js
const mockDb = require('../services/mockDataService');

class User {
    static async create(userData) {
        return await mockDb.createUser(userData);
    }

    static async findByEmail(email) {
        return await mockDb.findUserByEmail(email);
    }

    static async findById(id) {
        return await mockDb.findUserById(id);
    }

    static async updateLastLogin(id) {
        return await mockDb.updateLastLogin(id);
    }

    static async createDefaultSettings(userId) {
        return await mockDb.createDefaultSettings(userId);
    }
}

module.exports = User;
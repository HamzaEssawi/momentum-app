// backend/services/mockDataService.js
// This simulates a database with in-memory data

class MockDataService {
    constructor() {
        // In-memory storage
        this.users = [];
        this.tasks = [];
        
        // Add a test user with hashed password 'password123'
        // You'll need to generate this hash properly
        this.users.push({
            id: '1',
            email: 'test@example.com',
            password_hash: '$2a$10$YourHashedPasswordHere', // We'll fix this
            name: 'Test User',
            created_at: new Date(),
            updated_at: new Date(),
            last_login: null,
            is_active: true
        });
    }

    // User methods
    async createUser(userData) {
        const newUser = {
            id: String(this.users.length + 1),
            ...userData,
            created_at: new Date(),
            updated_at: new Date(),
            is_active: true
        };
        this.users.push(newUser);
        return newUser;
    }

    async findUserByEmail(email) {
        return this.users.find(user => user.email === email);
    }

    async findUserById(id) {
        return this.users.find(user => user.id === id);
    }

    async updateLastLogin(id) {
        const user = this.users.find(u => u.id === id);
        if (user) {
            user.last_login = new Date();
        }
        return true;
    }

    async createDefaultSettings(userId) {
        return true;
    }

    // Task methods
    async createTask(taskData) {
        const newTask = {
            id: String(this.tasks.length + 1),
            ...taskData,
            status: taskData.status || 'pending',
            created_at: new Date(),
            updated_at: new Date()
        };
        this.tasks.push(newTask);
        return newTask;
    }

    async findTasksByUser(userId, filters = {}) {
        let tasks = this.tasks.filter(task => task.user_id === userId);
        
        if (filters.status) {
            tasks = tasks.filter(task => task.status === filters.status);
        }
        
        return tasks;
    }

    async findTaskById(id, userId) {
        return this.tasks.find(task => task.id === id && task.user_id === userId);
    }

    async updateTask(id, userId, updates) {
        const taskIndex = this.tasks.findIndex(t => t.id === id && t.user_id === userId);
        if (taskIndex === -1) return null;
        
        this.tasks[taskIndex] = {
            ...this.tasks[taskIndex],
            ...updates,
            updated_at: new Date()
        };
        
        return this.tasks[taskIndex];
    }

    async deleteTask(id, userId) {
        const taskIndex = this.tasks.findIndex(t => t.id === id && t.user_id === userId);
        if (taskIndex === -1) return null;
        
        const deleted = this.tasks[taskIndex];
        this.tasks.splice(taskIndex, 1);
        return deleted;
    }

    async getTaskStats(userId) {
        const tasks = this.tasks.filter(t => t.user_id === userId);
        return {
            total_tasks: tasks.length,
            completed_tasks: tasks.filter(t => t.status === 'completed').length,
            pending_tasks: tasks.filter(t => t.status === 'pending').length,
            overdue_tasks: 0
        };
    }
}

module.exports = new MockDataService();
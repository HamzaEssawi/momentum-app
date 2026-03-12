// backend/config/database.js
// TEMPORARILY DISABLED - Using mock data instead
console.log('🔷 Using MOCK DATA service (no database required)');

// Mock database connection
module.exports = {
    query: async (text, params) => {
        console.log('Mock query:', text, params);
        return { rows: [] };
    },
    pool: null
};
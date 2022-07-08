const { Sequelize } = require('sequelize');
const db = new Sequelize('chatApi', 'aide', 'yuutashi123', {
    host: '192.168.2.115',
    dialect: 'mysql',
    // logging:false
}); // Example for sqlite

module.exports = db;
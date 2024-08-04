const { Sequelize } = require('sequelize');

const db = new Sequelize({
    dialect: 'postgres',
    host: Bun.env.DB_HOST,
    username: Bun.env.DB_USER,
    password: Bun.env.DB_PASS,
    database: Bun.env.DB_NAME,
});

module.exports = db;
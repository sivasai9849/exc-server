const { Sequelize } = require('sequelize');

const dotenv = require('dotenv');

dotenv.config();

const db = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

module.exports = db;
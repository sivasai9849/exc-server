const { DataTypes } = require('sequelize');
const db = require('../config/database');
const User = require('./User');

const Customer = db.define('customer', {
    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    phone: {
        type: DataTypes.STRING
    },
    village: {
        type: DataTypes.STRING
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
}, {
    timestamps: false
});

Customer.belongsTo(User, {
    foreignKey: 'user_id',
    references: {
        model: User,
        key: 'id'
    }
});

module.exports = Customer;
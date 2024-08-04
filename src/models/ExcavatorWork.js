const { DataTypes } = require('sequelize');
const db = require('../config/database');
const Customer = require('./Customer');
const User = require('./User');


const ExcavatorWork = db.define('excavator_work', {
    type: {
        type: DataTypes.ENUM("EARTH_WORK","LOADING","OTHER"),
        allowNull: false
    },
    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE
    },
    quantity: {
        type: DataTypes.INTEGER
    },
    rate: {
        type: DataTypes.INTEGER
    },
    start: {
        type: DataTypes.TIME
    },
    end: {
        type: DataTypes.TIME
    },
    amount: {
        type: DataTypes.INTEGER
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: false
});
ExcavatorWork.belongsTo(Customer, {
  foreignKey: 'customer_id',
  references: {
    model: Customer,
    key: 'id'
  }
});
ExcavatorWork.belongsTo(User, {
  foreignKey: 'user_id',
  references: {
    model: User,
    key: 'id'
  }
});

module.exports = ExcavatorWork;

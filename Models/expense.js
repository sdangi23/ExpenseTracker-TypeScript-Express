const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const Expense = sequelize.define('expenses', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull : false,
        primaryKey: true
    },
    expenseAmount: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    description: Sequelize.STRING,
    category: Sequelize.STRING
})

module.exports = Expense;
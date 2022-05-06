import Sequelize from 'sequelize';

const sequelize = new Sequelize('ExpenseTrackerDB', 'root', 'shubhamdangi', {
    dialect: 'mysql',
    host: 'localhost'
});

// module.exports = sequelize;
export default sequelize;
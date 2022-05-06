import express from 'express';
//const cors = require('cors');
import cors from 'cors';

import sequelize from './utils/database.js';

import User from './Models/users';

import Expense from './Models/expense';

import Order from './Models/order';

// const Forgotpassword = require('./Models/forgotpassword');


// const userRoutes = require('./Routes/user');
import userRoutes from './Routes/user';
// const Sequelize = require('sequelize');
import Sequelize from 'sequelize/types/sequelize';

import purchaseRoutes from './Routes/purchase';
import generalRoutes from './Routes/general';
// const resetPasswordRoutes = require('./routes/resetpassword');

const app = express();

// const dotenv = require('dotenv');

import dotenv from 'dotenv';
dotenv.config();

app.use(cors());

app.use(express.json());

app.use('/user' , userRoutes);
app.use('/purchase',purchaseRoutes);
// app.use('/password', resetPasswordRoutes);
app.use('/' , generalRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

// User.hasMany(Forgotpassword);
// Forgotpassword.belongsTo(User);

sequelize
//.sync({ alter: true })
.sync()
    .then(() => {
        app.listen(3000);
    })
    .catch((err: any) => {
        console.log(err);
    })
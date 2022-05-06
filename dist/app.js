"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//const cors = require('cors');
const cors_1 = __importDefault(require("cors"));
const database_js_1 = __importDefault(require("./utils/database.js"));
const users_1 = __importDefault(require("./Models/users"));
const expense_1 = __importDefault(require("./Models/expense"));
const order_1 = __importDefault(require("./Models/order"));
// const Forgotpassword = require('./Models/forgotpassword');
// const userRoutes = require('./Routes/user');
const user_1 = __importDefault(require("./Routes/user"));
const purchase_1 = __importDefault(require("./Routes/purchase"));
const general_1 = __importDefault(require("./Routes/general"));
// const resetPasswordRoutes = require('./routes/resetpassword');
const app = (0, express_1.default)();
// const dotenv = require('dotenv');
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/user', user_1.default);
app.use('/purchase', purchase_1.default);
// app.use('/password', resetPasswordRoutes);
app.use('/', general_1.default);
users_1.default.hasMany(expense_1.default);
expense_1.default.belongsTo(users_1.default);
users_1.default.hasMany(order_1.default);
order_1.default.belongsTo(users_1.default);
// User.hasMany(Forgotpassword);
// Forgotpassword.belongsTo(User);
database_js_1.default
    //.sync({ alter: true })
    .sync()
    .then(() => {
    app.listen(3000);
})
    .catch((err) => {
    console.log(err);
});

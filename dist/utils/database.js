"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const sequelize = new sequelize_1.default('ExpenseTrackerDB', 'root', 'shubhamdangi', {
    dialect: 'mysql',
    host: 'localhost'
});
// module.exports = sequelize;
exports.default = sequelize;

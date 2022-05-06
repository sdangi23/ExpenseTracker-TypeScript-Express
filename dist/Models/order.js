"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = __importDefault(require("../utils/database"));
const Order = database_1.default.define('order', {
    id: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    paymentid: sequelize_1.default.STRING,
    orderid: sequelize_1.default.STRING,
    status: sequelize_1.default.STRING
});
// module.exports = Order;
exports.default = Order;

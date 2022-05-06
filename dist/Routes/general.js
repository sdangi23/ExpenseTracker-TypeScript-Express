"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import user from '../Models/users';
const user_1 = __importDefault(require("../Controller/user"));
const router = (0, express_1.Router)();
router.get('/getUserExpenses', user_1.default.getUserExpenses);
exports.default = router;

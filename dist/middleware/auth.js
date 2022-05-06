"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_1 = __importDefault(require("../Models/users"));
const authenticate = (req, res, next) => {
    try {
        const token = req.header('authorization');
        const userid = Number(jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET));
        users_1.default.findByPk(userid).then(user => {
            req.user = user;
            console.log('-------------------- Authentication Done ----------------------');
            next();
        })
            .catch((err) => { throw new Error(err); });
    }
    catch (err) {
        return res.status(401).json({ success: false });
    }
};
const authenticatemiddleware = {
    authenticate
};
exports.default = authenticatemiddleware;

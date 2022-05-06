"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = __importDefault(require("../Models/users"));
// import Expense from '../Models/expense';
const order_1 = __importDefault(require("../Models/order"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function generateAccessToken(id) {
    return jsonwebtoken_1.default.sign(id, "secretkey");
}
const signUp = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const contact = req.body.contact;
    const password = req.body.password;
    const saltRounds = 10;
    bcrypt_1.default.genSalt(saltRounds, function (err, salt) {
        bcrypt_1.default.hash(password, salt, function (err, hash) {
            // Store hash in your password DB.
            if (err) {
                res.json({ message: 'Unable to create new user' });
            }
            users_1.default.create({ name, email, contact, password: hash }).then(() => {
                res.status(201).json({ message: 'Successfuly created new user' });
            }).catch((err) => {
                res.status(403).json(err.errors[0].message);
            });
        });
    });
};
const login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    users_1.default.findAll({ where: { email: email } }).then((user) => {
        if (user[0] != undefined) {
            bcrypt_1.default.compare(password, user[0].password, (err, response) => {
                if (err) {
                    return res.json({ success: false, message: 'Something went wrong' });
                }
                if (response) {
                    const jwtToken = generateAccessToken(user[0].id);
                    res.json({ token: jwtToken, success: true, message: 'Successfully logged In', user: user });
                }
                else {
                    return res.status(401).json({ success: false, message: 'Password does not match' });
                }
            });
        }
        else {
            return res.status(404).json({ success: false, message: 'User Not Found' });
        }
    })
        .catch((err) => {
        console.log(err);
    });
};
const checkPremium = async (req, res, next) => {
    const id = req.user.id;
    order_1.default.findAll({ where: { userId: id } })
        .then((user) => {
        if (user[0] != undefined) {
            return res.status(200).json({ message: "premium user" });
        }
        else {
            return res.status(404).json({ message: 'This User is Not a Premium Member yet' });
        }
    }).catch((err) => {
        console.log(err);
    });
};
const getUserExpenses = async (req, res, next) => {
    try {
        const dbusers = await users_1.default.findAll();
        var finalarr = [];
        let i = 0;
        await Promise.all(dbusers.map(async (user) => {
            let eachUserArr = [];
            try {
                console.log("----------------inside 2nd try block...");
                const dbexpenses = await user.getExpenses();
                dbexpenses.forEach((expense) => {
                    eachUserArr.push(expense);
                });
            }
            catch (err) {
                console.log(err);
            }
            finalarr.push(eachUserArr);
        }));
        res.status(200).json({ finalarr });
    }
    catch (err) {
        console.log('err >> ', err);
    }
};
exports.getPassword = (req, res, next) => {
    return res.status(200).json({ success: true, message: 'Nahi Bataunga Password' });
};
const userController = {
    signUp,
    login,
    checkPremium,
    getUserExpenses
};
exports.default = userController;

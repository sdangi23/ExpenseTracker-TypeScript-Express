"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const razorpay_1 = __importDefault(require("razorpay"));
const order_1 = __importDefault(require("../Models/order"));
const purchasePreminum = async (req, res) => {
    try {
        var rzp = new razorpay_1.default({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        });
        var details = {
            amount: 25 * 100,
            currency: 'INR'
        };
        rzp.orders.create(details, (err, order) => {
            if (err) {
                throw new Error(err);
            }
            req.user.createOrder({ orderid: order.id, status: 'PENDING' }).then(() => {
                return res.status(201).json({ order, Key_id: rzp.Key_id });
            }).catch(err => {
                throw new Error(err);
            });
        });
    }
    catch (err) {
        console.log(err);
        res.status(403).json({ message: "Something Went Wrong", error: err });
    }
};
const updateTransactionStatus = (req, res) => {
    try {
        const { payment_id, order_id } = req.body;
        order_1.default.findOne({ where: { orderid: order_id } }).then(order => {
            order.update({ paymentid: payment_id, status: 'SUCCESSFUL' }).then(() => {
                req.user.update({ ispremiumuser: true });
                console.log('---------------------- premium status of user updated --------------------', req.user);
                return res.status(202).json({ success: true, message: "Transaction Successful" });
            }).catch(err => {
                throw new Error(err);
            }).catch(err => {
                throw new Error(err);
            });
        });
    }
    catch (err) {
        console.log(err);
        res.status(403).json({ error: err, message: "Something went wrong" });
    }
};
const purchaseController = {
    purchasePreminum,
    updateTransactionStatus,
};
exports.default = purchaseController;

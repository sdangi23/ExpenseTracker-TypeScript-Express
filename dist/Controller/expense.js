"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const expense_1 = __importDefault(require("../Models/expense"));
const UserServices_1 = __importDefault(require("../Services/UserServices"));
const S3Services_1 = __importDefault(require("../Services/S3Services"));
const addExpense = (req, res) => {
    const expenseAmount = req.body.expenseAmount;
    const description = req.body.description;
    const category = req.body.category;
    req.user.createExpense({
        expenseAmount: expenseAmount,
        description: description,
        category: category
    }).then(expense => {
        return res.status(201).json({ expense, success: true, message: 'Expense Added successfully to DB' });
    }).catch(err => {
        return res.status(403).json({ err, success: false, message: 'Error Occured while adding to DB' });
    });
};
const getexpenses = async (req, res, next) => {
    const items_perpage = Number(req.query.row);
    const page = req.query.page || 1;
    let totalitems = 0;
    const userId = req.user.id;
    const expcount = await expense_1.default.count({ where: { UserId: userId } });
    const hasnextpage = items_perpage * page < expcount;
    const haspreviouspage = page > 1;
    const nextpage = Number(page) + 1;
    const previouspage = Number(page) - 1;
    const lastpage = Math.ceil(expcount / items_perpage);
    let obj = {
        currentpage: Number(req.query.page),
        hasnextpage: hasnextpage,
        haspreviouspage: haspreviouspage,
        nextpage: nextpage,
        previouspage: previouspage,
        lastpage: lastpage
    };
    req.user.getExpenses({ offset: (page - 1) * items_perpage, limit: items_perpage }).then((expenses) => {
        res.json({ expenses, success: true, obj });
    }).catch(err => console.log(err));
};
const deleteexpense = (req, res) => {
    const expenseid = req.params.expenseid;
    expense_1.default.destroy({ where: { id: expenseid } }).then(() => {
        return res.status(204).json({ success: true, message: "Deleted Successfully" });
    }).catch(err => {
        console.log(err);
        return res.status(403).json({ success: true, message: 'Failed' });
    });
};
const download = async (req, res) => {
    const expenses = await UserServices_1.default.getExpenses(req);
    const SringifyExpense = JSON.stringify(expenses);
    const filename = `Expense${req.user.dataValues.id}/${new Date()}.txt`;
    const fileURL = await S3Services_1.default.uploadtoS3(SringifyExpense, filename);
    res.status(200).json({ fileURL: fileURL, success: true, message: 'Download is Ready' });
};
const expenseController = {
    addExpense,
    getexpenses,
    deleteexpense,
    download
};
exports.default = expenseController;

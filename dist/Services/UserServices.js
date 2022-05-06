"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getExpenses = (req, where) => {
    return req.user.getExpenses(where);
};
exports.default = getExpenses;

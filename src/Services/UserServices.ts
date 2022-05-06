import { RequestHandler } from 'express';

const getExpenses: RequestHandler = (req, where) => {
    return req.user.getExpenses(where)
}

export default getExpenses;
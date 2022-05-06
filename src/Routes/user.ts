// const express = require('express');
import { Router} from 'express';
const router = Router();

import userController from '../Controller/user';
import authenticateMiddleware from '../middleware/auth';
import expenseController from '../Controller/expense';
import user from '../Models/users';
// const router = express.Router();


router.post('/signup',userController.signUp);
router.post('/login', userController.login);

router.post('/addexpense', authenticateMiddleware.authenticate, expenseController.addExpense);
router.get('/getexpenses', authenticateMiddleware.authenticate, expenseController.getexpenses);
router.delete('/deleteexpense/:expenseid', authenticateMiddleware.authenticate, expenseController.deleteexpense);

router.get('/checkPremium', authenticateMiddleware.authenticate , userController.checkPremium);
router.get('/download', authenticateMiddleware.authenticate, expenseController.download);

// module.exports = router;
export default router;
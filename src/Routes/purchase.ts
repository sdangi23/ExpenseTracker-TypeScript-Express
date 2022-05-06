
import express from 'express';

import purchaseController from '../Controller/purchase';
import authenticatemiddleware from '../middleware/auth';

const router = express.Router();

router.get('/premiummembership', authenticatemiddleware.authenticate, purchaseController.purchasePreminum);

router.post('/updatetransactionstatus', authenticatemiddleware.authenticate, purchaseController.updateTransactionStatus);

export default router;
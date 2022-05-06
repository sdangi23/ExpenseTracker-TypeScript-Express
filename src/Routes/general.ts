import { Router} from 'express';
// import user from '../Models/users';
import userController from '../Controller/user';

const router = Router();

router.get('/getUserExpenses', userController.getUserExpenses);

export default router;
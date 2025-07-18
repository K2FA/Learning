import { Router } from 'express';
import * as userController from '../controllers/user.controller';

const router = Router();

router.get('/', userController.getAllUserController);
router.post('/', userController.createUsersController);
router.delete('/:id', userController.deleteUsersController);
router.put('/:id', userController.updateUsersController);

export default router;

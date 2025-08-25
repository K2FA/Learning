import { Router } from 'express';
import {
  createRoleController,
  deleteRoleController,
  getAllRoleController,
  updateRoleController,
} from '../controllers/role.controller';

const router = Router();

router.get('/', getAllRoleController);
router.post('/', createRoleController);
router.put('/:id', updateRoleController);
router.delete('/:id', deleteRoleController);

export default router;

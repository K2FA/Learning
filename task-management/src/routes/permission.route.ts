import { Router } from 'express';
import {
  createPermissionController,
  deletePermissionController,
  getAllPermissionController,
  updatePermissionController,
} from '../controllers/permission.controller';

const router = Router();

router.get('/', getAllPermissionController);
router.post('/', createPermissionController);
router.put('/:id', updatePermissionController);
router.delete('/:id', deletePermissionController);

export default router;

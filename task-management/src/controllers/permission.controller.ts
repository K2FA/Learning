import { Request, RequestHandler, Response } from 'express';
import {
  createPermissionService,
  deletePermissionService,
  getAllPermissionService,
  updatePermissionService,
} from '../services/permission.service';

export const getAllPermissionController = async (req: Request, res: Response) => {
  try {
    const permission = await getAllPermissionService();

    res.status(200).json(permission);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const createPermissionController = async (req: Request, res: Response) => {
  try {
    const permission = await createPermissionService(req.body);

    res.status(201).json({ message: 'Permission created successfully', permission });
  } catch (err: any) {
    res.status(400).json({ message: 'Failed to create permission', error: err.message });
  }
};

export const updatePermissionController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ message: 'Invalid Permission id' });
      return;
    }

    const permission = await updatePermissionService(id, req.body);

    if (!permission) {
      res.status(404).json({ message: 'Permission not found' });
      return;
    }

    res.json({ message: 'Permission updated successfully' });
  } catch (err: any) {
    res.status(500).json({ message: 'Failed to update permission', error: err.message });
  }
};

export const deletePermissionController: RequestHandler<{ id: string }> = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ message: 'Invalid Permission id' });
      return;
    }

    const permission = await deletePermissionService(id);

    if (!permission) {
      res.status(404).json({ message: 'Permission not found' });
      return;
    }

    res.json({ message: 'Permission deleted successfully' });
  } catch (err: any) {}
};

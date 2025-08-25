import { Request, RequestHandler, Response } from 'express';
import { createRoleService, deleteRoleService, getAllRoleService, updateRoleService } from '../services/role.service';

export const getAllRoleController = async (req: Request, res: Response) => {
  try {
    const roles = await getAllRoleService();

    res.status(200).json(roles);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const createRoleController = async (req: Request, res: Response) => {
  try {
    const role = await createRoleService(req.body);

    res.status(201).json({ message: 'Role created successfully', role });
  } catch (err: any) {
    res.status(400).json({ message: 'Failed to create role', error: err.message });
  }
};

export const updateRoleController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ message: 'Invalid User Id' });
      return;
    }

    const role = await updateRoleService(id, req.body);

    if (!role) {
      res.status(404).json({ message: 'Role not found' });
    }

    res.json({ message: 'Role updated successfully' });
  } catch (err: any) {
    res.status(500).json({ message: 'Failed to Update Role', error: err.message });
  }
};

export const deleteRoleController: RequestHandler<{ id: string }> = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ message: 'Invalid User Id' });
      return;
    }

    const role = await deleteRoleService(id);

    if (!role) {
      res.status(404).json({ message: 'Role not found' });
      return;
    }

    res.json({ message: 'Role deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ message: 'Failed to delete Role Data' });
  }
};

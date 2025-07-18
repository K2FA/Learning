import { Request, RequestHandler, Response } from 'express';
import * as userService from '../services/user.service';

export const getAllUserController = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUser();

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Internal Serve Error' });
  }
};

export const createUsersController = async (req: Request, res: Response) => {
  try {
    const users = await userService.createUsers(req.body);

    res.status(201).json({ message: 'User created successfully', users });
  } catch (err: any) {
    res.status(400).json({ message: 'Failed to Create User Data', error: err.message });
  }
};

export const deleteUsersController: RequestHandler<{ id: string }> = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ message: 'Invalid User Id' });
      return;
    }
    const success = await userService.deleteUsers(id);

    if (!success) {
      res.status(404).json({ message: 'User Not Found' });
      return;
    }

    res.json({ message: 'User Deleted Successfully' });
  } catch (err: any) {
    res.status(500).json({ message: 'Failed to delete User Data' });
  }
};

export const updateUsersController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ message: 'Invalid User Id' });
      return;
    }

    const newDataUser = await userService.updateUsers(id, req.body);

    if (!newDataUser) {
      res.status(404).json({ message: 'User Not Found' });
      return;
    }

    res.json({ message: 'User Updated Successfully' });
  } catch (err: any) {
    res.status(500).json({ message: 'Failed to Update User Data', error: err.message });
  }
};

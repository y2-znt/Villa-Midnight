import express, { Request, Response, NextFunction } from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/userController';
import { validateId } from '../middlewares/validateId';
import { validateBody } from '../middlewares/validateBody';

const router = express.Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await getAllUsers(req, res);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', validateId('id'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    await getUserById(req, res);
  } catch (error) {
    next(error);
  }
});

router.post(
  '/',
  validateBody(['username', 'email', 'password']),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await createUser(req, res);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/:id',
  [validateId('id'), validateBody(['username', 'email'])],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await updateUser(req, res);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id', validateId('id'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    await deleteUser(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;

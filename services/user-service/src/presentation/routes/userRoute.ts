import express from 'express';
import { validateRequest } from '../middlewares/validateRequest';
import {
  createUserSchema,
  loginUserSchema,
} from '../../application/use-cases/user/UserDTO';
import { userController } from '../../container/user';

const router = express.Router();

router.post(
  '/register',
  validateRequest(createUserSchema),
  userController.create.bind(userController),
);

router.post(
  '/login',
  validateRequest(loginUserSchema),
  userController.login.bind(userController),
);

export default router;

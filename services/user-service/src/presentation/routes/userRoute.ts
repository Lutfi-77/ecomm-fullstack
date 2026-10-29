import express from 'express';
import { validateRequest } from '../middlewares/validateRequest';
import {
  changePasswordSchema,
  createUserSchema,
  loginUserSchema,
  updateUserSchema,
} from '../../application/use-cases/user/UserDTO';
import { userController } from '../../container/user';
import { authMiddleware } from '../middlewares/auth';

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

router.get('/me', authMiddleware, userController.getMe.bind(userController));

router.patch(
  '/me',
  authMiddleware,
  validateRequest(updateUserSchema),
  userController.updateMe.bind(userController),
);

router.patch(
  '/change-password',
  authMiddleware,
  validateRequest(changePasswordSchema),
  userController.changePassword.bind(userController),
);

export default router;

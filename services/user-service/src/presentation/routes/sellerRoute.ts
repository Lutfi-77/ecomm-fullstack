import { Router } from 'express';
import { sellerController } from '../../container/seller';
import {
  createSellerSchema,
  loginSellerSchema,
  updateSellerSchema,
} from '../../application/use-cases/seller/SellerDTO';
import { validateRequest } from '../middlewares/validateRequest';
import { authMiddleware } from '../middlewares/auth';

const router = Router();

router.post(
  '/register',
  validateRequest(createSellerSchema),
  sellerController.create.bind(sellerController),
);

router.post(
  '/login',
  validateRequest(loginSellerSchema),
  sellerController.login.bind(sellerController),
);

router.patch(
  '/',
  authMiddleware,
  validateRequest(updateSellerSchema),
  sellerController.update.bind(sellerController),
);

export default router;

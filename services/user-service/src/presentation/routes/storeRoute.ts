import express from 'express';
import { storeController } from '../../container/store';
import { validateRequest } from '../middlewares/validateRequest';
import {
  createStoreSchema,
  updateStoreSchema,
} from '../../application/use-cases/store/StoreDTO';
import { authMiddleware, requireRole } from '../middlewares/auth';

const router = express.Router();

router.get(
  '/',
  authMiddleware,
  requireRole(['SELLER']),
  storeController.get.bind(storeController),
);
router.get('/:slug', storeController.getBySlug.bind(storeController));

router.post(
  '/create',
  authMiddleware,
  requireRole(['SELLER']),
  validateRequest(createStoreSchema),
  storeController.create.bind(storeController),
);

router.patch(
  '/update',
  authMiddleware,
  requireRole(['SELLER']),
  validateRequest(updateStoreSchema),
  storeController.update.bind(storeController),
);

export default router;

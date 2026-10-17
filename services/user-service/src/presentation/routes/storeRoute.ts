import express from 'express';
import { storeController } from '../../container/store';
import { validateRequest } from '../middlewares/validateRequest';
import {
  createStoreSchema,
  updateStoreSchema,
} from '../../application/use-cases/store/StoreDTO';
import { authMiddleware } from '../middlewares/auth';

const router = express.Router();

router.get('/', authMiddleware, storeController.get.bind(storeController));
router.get('/:slug', storeController.getBySlug.bind(storeController));

router.post(
  '/create',
  authMiddleware,
  validateRequest(createStoreSchema),
  storeController.create.bind(storeController),
);

router.patch(
  '/update',
  authMiddleware,
  validateRequest(updateStoreSchema),
  storeController.update.bind(storeController),
);

export default router;

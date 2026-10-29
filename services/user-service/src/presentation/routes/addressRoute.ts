import express from 'express';
import { addressController } from '../../container/address';
import { validateRequest } from '../middlewares/validateRequest';
import { createAddressSchema } from '../../application/use-cases/address/AddressDTO';
import { authMiddleware } from '../middlewares/auth';

const router = express.Router();

// Semua rute alamat butuh login (baik BUYER maupun SELLER boleh punya alamat)
router.use(authMiddleware);

router.post(
  '/',
  validateRequest(createAddressSchema),
  addressController.create.bind(addressController),
);

router.get('/', addressController.getAll.bind(addressController));

router.patch('/:id/default', addressController.setDefault.bind(addressController));

router.delete('/:id', addressController.delete.bind(addressController));

export default router;


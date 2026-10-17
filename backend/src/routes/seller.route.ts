import { Router } from 'express';
import * as sellerController from '../controllers/seller.controller';
import rateLimit from 'express-rate-limit';

const router: Router = Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    message: 'To many request, try again in 15 Minutes',
  },
});

// router.get('/', sellerController.get);
router.post('/', authLimiter, sellerController.register);

export default router;

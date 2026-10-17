import { Router } from 'express';
import sellerRoute from './seller.route';
// import

const router: Router = Router();

router.use('/seller', sellerRoute);

export default router;

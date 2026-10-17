import { Request, Response } from 'express';
import { sellerRegister } from '../service/seller/auth.service';
import { ISellerRegisterRequest } from '../interfaces/seller.interface';
import { sellerRegisterSchema } from '../validations/sellerRegister';

// const get = async (req: Request, res: Response) => {
//   const test = await findAll();
//   if (test) {
//     console.log([test].length);
//   } else {
//     console.log('GAK ADA');
//   }
//   res.success(200, 'Data Berhasil diambil', test);
// };

const register = async (req: Request, res: Response) => {
  const data: ISellerRegisterRequest = sellerRegisterSchema.parse(req.body);
  const register = await sellerRegister(data);

  res.success(200, 'Data Berhasil di Insert', register);
};

export { register };

import {
  ISellerRegisterRequest,
  ISellerRegisterResponse,
  toSellerResponse,
} from '../../interfaces/seller.interface';
import bcrypt from 'bcrypt';
import * as sellerModel from '../../models/seller.model';
import { AppError } from '../../utils/AppError';
// Gunakan Interface atau type jika ada

export const sellerRegister = async (
  data: ISellerRegisterRequest,
): Promise<ISellerRegisterResponse> => {
  const checkIfEmailRegistered = await sellerModel.checkIfEmailAlreadyExist(
    data.email,
  );

  if (checkIfEmailRegistered) {
    throw new AppError(409, 'Email Already Exist');
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);
  const payload: ISellerRegisterRequest = {
    ...data,
    password: hashedPassword,
    role: 'SELLER',
  };

  const newSeller = await sellerModel.registerSeller(payload);

  return toSellerResponse(newSeller);
};

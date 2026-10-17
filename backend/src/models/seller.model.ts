import { User } from '../../prisma/generated/prisma/client';
import { prisma } from '../config/postgre';
import {
  ISellerLoginRequest,
  ISellerRegisterRequest,
} from '../interfaces/seller.interface';

export const findAll = async () => {
  return await prisma.user.findMany();
};

export const checkIfEmailAlreadyExist = async (
  email: string,
): Promise<User | null> => {
  return await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
};

export const registerSeller = async (
  data: ISellerRegisterRequest,
): Promise<User> => {
  return await prisma.user.create({
    data,
  });
};

export const login = async (data: ISellerLoginRequest) => {
  return await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });
};

// export { findAll, registerSeller };

import { User } from '../../prisma/generated/prisma/client';
import { UserRole } from '../../prisma/generated/prisma/enums';

export interface ISellerRegisterRequest {
  fullName: string;
  email: string;
  password: string;
  phone?: string;
  avatarUrl?: string;
  role?: 'SELLER' | 'BUYER';
}

export interface ISellerRegisterResponse {
  id: string;
  fullName: string;
  email: string;
  password?: string;
  phone?: string | null;
  avatarUrl?: string | null;
  role?: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ISellerLoginRequest {
  email: string;
  password: string;
}

export interface ISellerLoginResponse {
  email: string;
  fullName: string;
  token?: string;
}

export const toSellerResponse = (seller: User): ISellerRegisterResponse => {
  return {
    id: seller.id,
    email: seller.email,
    fullName: seller.fullName,
    phone: seller.phone,
    role: seller.role,
    createdAt: seller.createdAt,
    updatedAt: seller.updatedAt,
  };
};

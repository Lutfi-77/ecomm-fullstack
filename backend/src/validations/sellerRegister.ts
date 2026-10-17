import { z } from 'zod';
import { ISellerRegisterRequest } from '../interfaces/seller.interface';

// 1. Definisikan aturan validasi
export const sellerRegisterSchema: z.ZodType<ISellerRegisterRequest> = z.object(
  {
    fullName: z
      .string({ message: 'Nama lengkap wajib diisi' })
      .min(3, 'Nama lengkap minimal 3 karakter'),

    email: z
      .string({ message: 'Email wajib diisi' })
      .email('Format email tidak valid'),

    password: z
      .string({ message: 'Password wajib diisi' })
      .min(3, 'Password minimal 6 karakter'),

    phone: z.string().optional(),
  },
);

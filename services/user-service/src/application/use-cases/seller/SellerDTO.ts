import z from 'zod';

export const createSellerSchema = z.object({
  fullName: z.string().min(3, 'Name must be 3 characters min'),
  email: z.string().email('Email not valid'),
  password: z.string().min(4, 'Password must be 4 characters min'),
});

export const loginSellerSchema = z.object({
  email: z.string().email('Email not valid'),
  password: z.string().min(4, 'Password must be 4 characters min'),
});

export const updateSellerSchema = z.object({
  fullName: z.string().min(3, 'Name must be 3 characters min').optional(),
  email: z.string().email('Email not valid').optional(),
  phone: z.string().min(10, 'Phone must be 10 characters min').optional(),
  avatarUrl: z.string().optional(),
  // password: z.string().min(4, 'Password must be 4 characters min'),
});

export type CreateSellerDTO = z.infer<typeof createSellerSchema>;
export type LoginSellerDTO = z.infer<typeof loginSellerSchema>;
export type UpdateSellerDTO = z.infer<typeof updateSellerSchema>;

// export interface CreateSellerDTO {
//   fullName: string;
//   email: string;
//   password: string;
// }

export interface ResponseSellerDTO {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
}

export interface LoginResponseSellerDTO {
  token: string;
}

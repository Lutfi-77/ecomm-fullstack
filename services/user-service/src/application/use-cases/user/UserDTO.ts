import z from 'zod';

export const createUserSchema = z.object({
  fullName: z.string().min(3, 'Name must be 3 characters min'),
  email: z.string().email('Email not valid'),
  password: z.string().min(4, 'Password must be 4 characters min'),
});

export const loginUserSchema = z.object({
  email: z.string().email('Email not valid'),
  password: z.string().min(4, 'Password must be 4 characters min'),
});

export const updateUserSchema = z.object({
  fullName: z.string().min(3, 'Name must be 3 characters min').optional(),
  email: z.string().email('Email not valid').optional(),
  phone: z.string().min(10, 'Phone must be 10 characters min').optional(),
  avatarUrl: z.string().url('Avatar must be a valid URL').optional(),
});

export const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(4, 'Password must be 4 characters min'),
    newPassword: z.string().min(4, 'Password must be 4 characters min'),
    confirmPassword: z.string().min(4, 'Password must be 4 characters min'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'New password and confirm password do not match',
    path: ['confirmPassword'],
  });

export type CreateUserDTO = z.infer<typeof createUserSchema>;
export type LoginUserDTO = z.infer<typeof loginUserSchema>;
export type UpdateUserDTO = z.infer<typeof updateUserSchema>;
export type ChangePasswordDTO = z.infer<typeof changePasswordSchema>;

export interface ResponseUserDTO {
  id: string;
  fullName: string;
  email: string;
  role: string;
  phone?: string;
  avatarUrl?: string;
  createdAt?: Date;
}

export interface LoginResponseUserDTO {
  token: string;
}

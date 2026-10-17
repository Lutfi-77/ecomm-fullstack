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

export type CreateUserDTO = z.infer<typeof createUserSchema>;
export type LoginUserDTO = z.infer<typeof loginUserSchema>;

export interface ResponseUserDTO {
  id: string;
  fullName: string;
  email: string;
}

export interface LoginResponseUserDTO {
  token: string;
}

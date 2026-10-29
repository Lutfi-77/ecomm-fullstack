import z from 'zod';

export const createAddressSchema = z.object({
  recipientName: z.string().min(2, 'Recipient name must be 2 characters min'),
  phone: z.string().min(10, 'Phone must be 10 characters min'),
  streetAddress: z.string().min(5, 'Street address must be 5 characters min'),
  city: z.string().min(2, 'City must be 2 characters min'),
  postalCode: z.string().min(3, 'Postal code must be 3 characters min'),
  province: z.string().optional(),
  isDefault: z.boolean().optional(),
});

export const updateAddressSchema = z.object({
  recipientName: z.string().min(2).optional(),
  phone: z.string().min(10).optional(),
  streetAddress: z.string().min(5).optional(),
  city: z.string().min(2).optional(),
  postalCode: z.string().min(3).optional(),
  province: z.string().optional(),
  isDefault: z.boolean().optional(),
});

export type CreateAddressDTO = z.infer<typeof createAddressSchema>;
export type UpdateAddressDTO = z.infer<typeof updateAddressSchema>;

export interface ResponseAddressDTO {
  id: string;
  userId: string;
  recipientName: string;
  phone: string;
  streetAddress: string;
  city: string;
  postalCode: string;
  province?: string;
  isDefault: boolean;
  createdAt: Date;
}


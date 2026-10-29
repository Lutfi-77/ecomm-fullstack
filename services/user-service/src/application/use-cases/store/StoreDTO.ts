import z from 'zod';

export const createStoreSchema = z.object({
  user: z.string().optional(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  logoUrl: z.string().optional(),
  bankName: z.string().optional(),
  bankAccountNumber: z.string().optional(),
  bankAccountHolder: z.string().optional(),
});

export const updateStoreSchema = z.object({
  user: z.string().optional(),
  name: z.string().optional(),
  slug: z.string().optional(),
  description: z.string().optional(),
  logoUrl: z.string().optional(),
  bankName: z.string().optional(),
  bankAccountNumber: z.string().optional(),
  bankAccountHolder: z.string().optional(),
});

export type CreateStorerDTO = z.infer<typeof createStoreSchema>;
export type UpdateStoreDTO = z.infer<typeof updateStoreSchema>;

export interface ResponseStoreDTO {
  name: string;
  slug: string;
  description?: string | null;
  logoUrl?: string | null;
  bankName?: string | null;
  bankAccountNumber?: string | null;
  bankAccountHolder?: string | null;
  ratingCache?: number | string;
  createdAt?: Date;
}

// export function toJson(store: ResponseStoreDTO) {
//   return {
//     id: store.id,
//     name: store.name,
//     slug: store.slug,
//     description: store.description,
//     logoUrl: store.logoUrl,
//     bankName: store.bankName,
//     bankAccountNumber: store.bankAccountNumber,
//     bankAccountHolder: store.bankAccountHolder,
//     ratingCache: store.ratingCache,
//     createdAt: store.createdAt,
//   };
// }

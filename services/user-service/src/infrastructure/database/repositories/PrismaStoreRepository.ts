import { Store } from '../../../domain/entities/Store';
import { StoreRepository } from '../../../domain/repositories/StoreRepository';
import { PrismaClient } from '../../../generated/prisma/client';

export class PrismaStoreRepository implements StoreRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(store: Store): Promise<Store> {
    const storeData = await this.prisma.store.create({
      data: {
        userId: store.idSeller,
        name: store.name,
        slug: store.slug,
        description: store.description,
        logoUrl: store.logoUrl,
        bankName: store.bankName,
        bankAccountNumber: store.bankAccountNumber,
        bankAccountHolder: store.bankAccountHolder,
        ratingCache: store.ratingCache,
        createdAt: store.createdAt,
      },
    });

    return new Store(
      {
        idSeller: storeData.userId,
        name: storeData.name,
        slug: storeData.slug,
        description: storeData.description ?? undefined,
        logoUrl: storeData.logoUrl ?? undefined,
        bankName: storeData.bankName ?? undefined,
        bankAccountNumber: storeData.bankAccountNumber ?? undefined,
        bankAccountHolder: storeData.bankAccountHolder ?? undefined,
        ratingCache: Number(storeData.ratingCache),
        createdAt: storeData.createdAt,
      },
      storeData.id,
    );
  }

  async findBySellerId(sellerId: string): Promise<Store | null> {
    const store = await this.prisma.store.findUnique({
      where: {
        userId: sellerId,
      },
    });

    if (!store) return null;

    return new Store(
      {
        idSeller: store.userId,
        name: store.name,
        slug: store.slug,
        description: store.description ?? undefined,
        logoUrl: store.logoUrl ?? undefined,
        bankName: store.bankName ?? undefined,
        bankAccountNumber: store.bankAccountNumber ?? undefined,
        bankAccountHolder: store.bankAccountHolder ?? undefined,
        ratingCache: Number(store.ratingCache),
        createdAt: store.createdAt,
      },
      store.id,
    );
  }

  async findBySlug(slug: string): Promise<Store | null> {
    const store = await this.prisma.store.findUnique({
      where: { slug },
    });

    if (!store) return null;

    return new Store(
      {
        idSeller: store.userId,
        name: store.name,
        slug: store.slug,
        description: store.description ?? undefined,
        logoUrl: store.logoUrl ?? undefined,
        bankName: store.bankName ?? undefined,
        bankAccountNumber: store.bankAccountNumber ?? undefined,
        bankAccountHolder: store.bankAccountHolder ?? undefined,
        ratingCache: Number(store.ratingCache),
        createdAt: store.createdAt,
      },
      store.id,
    );
  }
  async update(store: Store, id: string): Promise<Store> {
    const updatedStore = await this.prisma.store.update({
      where: { id: id },
      data: {
        name: store.name,
        slug: store.slug,
        description: store.description,
        logoUrl: store.logoUrl,
        bankName: store.bankName,
        bankAccountNumber: store.bankAccountNumber,
        bankAccountHolder: store.bankAccountHolder,
      },
    });

    return new Store(
      {
        idSeller: updatedStore.userId,
        name: updatedStore.name,
        slug: updatedStore.slug,
        description: updatedStore.description ?? undefined,
        logoUrl: updatedStore.logoUrl ?? undefined,
        bankName: updatedStore.bankName ?? undefined,
        bankAccountNumber: updatedStore.bankAccountNumber ?? undefined,
        bankAccountHolder: updatedStore.bankAccountHolder ?? undefined,
        ratingCache: Number(updatedStore.ratingCache),
        createdAt: updatedStore.createdAt,
      },
      updatedStore.id,
    );
  }
  //   async delete();
  //   async list();
}

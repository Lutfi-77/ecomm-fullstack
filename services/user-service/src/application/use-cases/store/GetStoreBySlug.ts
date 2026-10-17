import { StoreRepository } from '../../../domain/repositories/StoreRepository';
import { NotFoundError } from '../../errors/DomainErrors';

export class GetStoreBySlug {
  constructor(private readonly storeRepository: StoreRepository) {}

  async execute(slug: string) {
    const store = await this.storeRepository.findBySlug(slug);
    if (!store) {
      throw new NotFoundError('Store not found');
    }

    return {
      name: store.name,
      slug: store.slug,
      description: store.description,
      logoUrl: store.logoUrl,
      bankName: store.bankName,
      bankAccountNumber: store.bankAccountNumber,
      bankAccountHolder: store.bankAccountHolder,
      ratingCache: store.ratingCache,
      createdAt: store.createdAt,
    };
  }
}

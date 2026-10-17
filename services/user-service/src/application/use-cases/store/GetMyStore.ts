import { StoreRepository } from '../../../domain/repositories/StoreRepository';
import { NotFoundError } from '../../errors/DomainErrors';
import { ResponseStoreDTO } from './StoreDTO';

export class GetMyStore {
  constructor(private readonly storeRepository: StoreRepository) {}

  async execute(sellerId: string): Promise<ResponseStoreDTO> {
    const store = await this.storeRepository.findBySellerId(sellerId);
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

import { StoreRepository } from '../../../domain/repositories/StoreRepository';
import {
  ConflictError,
  NotFoundError,
  UnauthorizedError,
} from '../../errors/DomainErrors';
import { ResponseStoreDTO, UpdateStorerDTO } from './StoreDTO';

export class UpdateStore {
  constructor(private readonly storeRepository: StoreRepository) {}

  async execute(
    request: UpdateStorerDTO,
    sellerId: string,
  ): Promise<ResponseStoreDTO> {
    console.log(sellerId);
    if (!sellerId) {
      throw new UnauthorizedError('Unauthorized');
    }
    const currentStore = await this.storeRepository.findBySellerId(sellerId);

    // Check if store exist
    if (!currentStore) {
      throw new NotFoundError('Store Not Found');
    }

    if (request.slug && request.slug !== currentStore.slug) {
      const slugExists = await this.storeRepository.findBySlug(request.slug);
      if (slugExists) {
        throw new ConflictError('Slug already in use by another store');
      }
    }

    currentStore.updateDetails({
      name: request.name,
      slug: request.slug,
      description: request.description,
      logoUrl: request.logoUrl,
      bankName: request.bankName,
      bankAccountNumber: request.bankAccountNumber,
      bankAccountHolder: request.bankAccountHolder,
    });

    const updatedStore = await this.storeRepository.update(
      currentStore,
      currentStore.idStore!,
    );

    return {
      name: updatedStore.name,
      slug: updatedStore.slug,
      description: updatedStore.description,
      logoUrl: updatedStore.logoUrl,
      bankName: updatedStore.bankName,
      bankAccountNumber: updatedStore.bankAccountNumber,
      bankAccountHolder: updatedStore.bankAccountHolder,
      ratingCache: updatedStore.ratingCache,
      createdAt: updatedStore.createdAt,
    };
  }
}

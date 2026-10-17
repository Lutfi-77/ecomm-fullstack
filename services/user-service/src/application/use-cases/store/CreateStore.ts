import { Store } from '../../../domain/entities/Store';
import { SellerRepository } from '../../../domain/repositories/SellerRepository';
import { StoreRepository } from '../../../domain/repositories/StoreRepository';
import { ConflictError, NotFoundError } from '../../errors/DomainErrors';
import { CreateStorerDTO, ResponseStoreDTO } from './StoreDTO';

export class CreateStore {
  constructor(
    private readonly storeRepository: StoreRepository,
    private readonly sellerRepository: SellerRepository,
  ) {}

  async execute(
    request: CreateStorerDTO,
    sellerId: string,
  ): Promise<ResponseStoreDTO> {
    const seller = await this.sellerRepository.findById(sellerId);
    if (!seller) {
      throw new NotFoundError('Seller not found');
    }

    const alreadyHaveStore =
      await this.storeRepository.findBySellerId(sellerId);

    if (alreadyHaveStore) {
      throw new ConflictError('Already have store');
    }

    const storeEntity = new Store({
      idSeller: sellerId,
      name: request.name,
      slug: request.slug,
      description: request.description,
      logoUrl: request.logoUrl,
      bankName: request.bankName,
      bankAccountNumber: request.bankAccountNumber,
      bankAccountHolder: request.bankAccountHolder,
    });

    const savedStore = await this.storeRepository.create(storeEntity);

    return {
      name: savedStore.name,
      slug: savedStore.slug,
      description: savedStore.description,
      logoUrl: savedStore.logoUrl,
      bankName: savedStore.bankName,
      bankAccountNumber: savedStore.bankAccountNumber,
      bankAccountHolder: savedStore.bankAccountHolder,
      ratingCache: savedStore.ratingCache,
      createdAt: savedStore.createdAt,
    };
  }
}

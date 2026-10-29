import {
  RedisRepository,
  StoreRepository,
} from '../../../domain/repositories/StoreRepository';
import {
  ConflictError,
  NotFoundError,
  UnauthorizedError,
} from '../../errors/DomainErrors';
import { ResponseStoreDTO, UpdateStoreDTO } from './StoreDTO';

export class UpdateStore {
  constructor(
    private readonly storeRepository: StoreRepository,
    private readonly redisService: RedisRepository,
  ) {}

  async execute(
    request: UpdateStoreDTO,
    sellerId: string,
  ): Promise<ResponseStoreDTO> {
    if (!sellerId) {
      throw new UnauthorizedError('Unauthorized');
    }
    const currentStore = await this.storeRepository.findBySellerId(sellerId);

    // Check if store exist
    if (!currentStore) {
      throw new NotFoundError('Store Not Found');
    }

    // keep the old slug
    const oldSlug = currentStore.slug;

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

    await this.redisService.del(`store:${oldSlug}`);

    // Check if seller change the slug and redis will remove it
    if (request.slug && request.slug !== oldSlug) {
      await this.redisService.del(`store:${request.slug}`);
    }

    return updatedStore.toResponse();
  }
}

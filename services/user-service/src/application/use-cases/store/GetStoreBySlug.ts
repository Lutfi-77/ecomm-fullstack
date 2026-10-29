import {
  RedisRepository,
  StoreRepository,
} from '../../../domain/repositories/StoreRepository';
import { NotFoundError } from '../../errors/DomainErrors';

export class GetStoreBySlug {
  constructor(
    private readonly storeRepository: StoreRepository,
    private readonly redisService: RedisRepository,
  ) {}

  async execute(slug: string) {
    const cacheKey = `store:${slug}`;

    const cacheStore = await this.redisService.get(cacheKey);

    // check if data already in redis
    if (cacheStore) {
      console.log('⚡ CACHE HIT: Mengambil data toko dari Redis');
      return cacheStore;
    }

    // If not in redis get from database
    const store = await this.storeRepository.findBySlug(slug);
    if (!store) {
      throw new NotFoundError('Store not found');
    }

    const response = store.toResponse();

    // Save data from database to redis
    await this.redisService.set(cacheKey, response);

    return response;
  }
}

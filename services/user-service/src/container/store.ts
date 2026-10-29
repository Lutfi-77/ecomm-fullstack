import { CreateStore } from '../application/use-cases/store/CreateStore';
import { GetMyStore } from '../application/use-cases/store/GetMyStore';
import { GetStoreBySlug } from '../application/use-cases/store/GetStoreBySlug';
import { UpdateStore } from '../application/use-cases/store/UpdateStore';
import { RedisService } from '../infrastructure/cache/RedisService';
import { prismaClient } from '../infrastructure/database/prisma/PrismaClient';
import { PrismaSellerRepository } from '../infrastructure/database/repositories/PrismaSellerRepository';
import { PrismaStoreRepository } from '../infrastructure/database/repositories/PrismaStoreRepository';
import { StoreController } from '../presentation/controllers/StoreController';

const prisma = prismaClient;

const prismaStoreRepository = new PrismaStoreRepository(prisma);
const sellerRepository = new PrismaSellerRepository(prisma);
const redisService = new RedisService();

//Use-Case
const createStore = new CreateStore(prismaStoreRepository, sellerRepository);
const updateStore = new UpdateStore(prismaStoreRepository, redisService);
const getMyStore = new GetMyStore(prismaStoreRepository);
const getBySlug = new GetStoreBySlug(prismaStoreRepository, redisService);

export const storeController = new StoreController(
  createStore,
  updateStore,
  getMyStore,
  getBySlug,
);

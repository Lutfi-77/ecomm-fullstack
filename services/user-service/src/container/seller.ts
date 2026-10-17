import { CreateSeller } from '../application/use-cases/seller/CreateSeller';
import { LoginSeller } from '../application/use-cases/seller/LoginSeller';
import { UpdateSeller } from '../application/use-cases/seller/UpdateSeller';
import { prismaClient } from '../infrastructure/database/prisma/PrismaClient';
import { PrismaSellerRepository } from '../infrastructure/database/repositories/PrismaSellerRepository';
import { BcryptPasswordHasher } from '../infrastructure/security/BcryptPasswordHasher';
import { Jwt } from '../infrastructure/security/Jwt';
import { SellerController } from '../presentation/controllers/SellerController';

const prisma = prismaClient;

const sellerRepository = new PrismaSellerRepository(prisma);

const bcrypt = new BcryptPasswordHasher();
const jwt = new Jwt();

const createSeller = new CreateSeller(sellerRepository, bcrypt);
const loginSeller = new LoginSeller(sellerRepository, bcrypt, jwt);
const updateSeller = new UpdateSeller(sellerRepository);

const sellerController = new SellerController(
  createSeller,
  loginSeller,
  updateSeller,
);

export { sellerController };

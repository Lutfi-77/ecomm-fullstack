import { CreateUser } from '../application/use-cases/user/CreateUser';
import { LoginUser } from '../application/use-cases/user/LoginUser';
import { prismaClient } from '../infrastructure/database/prisma/PrismaClient';
import { PrismaUserRepository } from '../infrastructure/database/repositories/PrismaUserRepository';
import { BcryptPasswordHasher } from '../infrastructure/security/BcryptPasswordHasher';
import { Jwt } from '../infrastructure/security/Jwt';
import { UserController } from '../presentation/controllers/UserController';

const prisma = prismaClient;

const userRepository = new PrismaUserRepository(prisma);
const bcrypt = new BcryptPasswordHasher();
const jwt = new Jwt();

const createUser = new CreateUser(userRepository, bcrypt);
const loginUser = new LoginUser(userRepository, bcrypt, jwt);

export const userController = new UserController(createUser, loginUser);

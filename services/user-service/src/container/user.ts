import { CreateUser } from '../application/use-cases/user/CreateUser';
import { LoginUser } from '../application/use-cases/user/LoginUser';
import { GetMyProfile } from '../application/use-cases/user/GetMyProfile';
import { UpdateUser } from '../application/use-cases/user/UpdateUser';
import { prismaClient } from '../infrastructure/database/prisma/PrismaClient';
import { PrismaUserRepository } from '../infrastructure/database/repositories/PrismaUserRepository';
import { BcryptPasswordHasher } from '../infrastructure/security/BcryptPasswordHasher';
import { Jwt } from '../infrastructure/security/Jwt';
import { UserController } from '../presentation/controllers/UserController';
import { ChangePassword } from '../application/use-cases/user/ChangePassword';

const prisma = prismaClient;

const userRepository = new PrismaUserRepository(prisma);
const bcrypt = new BcryptPasswordHasher();
const jwt = new Jwt();

const createUser = new CreateUser(userRepository, bcrypt);
const loginUser = new LoginUser(userRepository, bcrypt, jwt);
const getMyProfile = new GetMyProfile(userRepository);
const updateUser = new UpdateUser(userRepository);
const updatePassword = new ChangePassword(userRepository, bcrypt);

export const userController = new UserController(
  createUser,
  loginUser,
  getMyProfile,
  updateUser,
  updatePassword,
);

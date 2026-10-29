import { prismaClient } from '../infrastructure/database/prisma/PrismaClient';
import { PrismaAddressRepository } from '../infrastructure/database/repositories/PrismaAddressRepository';
import { CreateAddress } from '../application/use-cases/address/CreateAddress';
import { GetUserAddresses } from '../application/use-cases/address/GetUserAddresses';
import { SetDefaultAddress } from '../application/use-cases/address/SetDefaultAddress';
import { DeleteAddress } from '../application/use-cases/address/DeleteAddress';
import { AddressController } from '../presentation/controllers/AddressController';

const prisma = prismaClient;

// Repository
const addressRepository = new PrismaAddressRepository(prisma);

// Use Cases
const createAddress = new CreateAddress(addressRepository);
const getUserAddresses = new GetUserAddresses(addressRepository);
const setDefaultAddress = new SetDefaultAddress(addressRepository);
const deleteAddress = new DeleteAddress(addressRepository);

// Controller
export const addressController = new AddressController(
  createAddress,
  getUserAddresses,
  setDefaultAddress,
  deleteAddress,
);


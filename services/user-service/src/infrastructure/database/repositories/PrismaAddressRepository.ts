import { AddressRepository } from '../../../domain/repositories/AddressRepository';
import { UserAddress } from '../../../domain/entities/UserAddress';
import { PrismaClient } from '../../../generated/prisma/client';

export class PrismaAddressRepository implements AddressRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(address: UserAddress): Promise<UserAddress> {
    const result = await this.prisma.userAddress.create({
      data: {
        userId: address.userId,
        recipientName: address.recipientName,
        phone: address.phone,
        streetAddress: address.streetAddress,
        city: address.city,
        postalCode: address.postalCode,
        province: address.province,
        isDefault: address.isDefault,
      },
    });

    return new UserAddress(
      {
        userId: result.userId,
        recipientName: result.recipientName,
        phone: result.phone,
        streetAddress: result.streetAddress,
        city: result.city,
        postalCode: result.postalCode,
        province: result.province ?? undefined,
        isDefault: result.isDefault,
        createdAt: result.createdAt,
      },
      result.id,
    );
  }

  async findById(id: string): Promise<UserAddress | null> {
    const result = await this.prisma.userAddress.findUnique({
      where: { id },
    });

    if (!result) return null;

    return new UserAddress(
      {
        userId: result.userId,
        recipientName: result.recipientName,
        phone: result.phone,
        streetAddress: result.streetAddress,
        city: result.city,
        postalCode: result.postalCode,
        province: result.province ?? undefined,
        isDefault: result.isDefault,
        createdAt: result.createdAt,
      },
      result.id,
    );
  }

  async findByUserId(userId: string): Promise<UserAddress[]> {
    const results = await this.prisma.userAddress.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    return results.map(
      (item) =>
        new UserAddress(
          {
            userId: item.userId,
            recipientName: item.recipientName,
            phone: item.phone,
            streetAddress: item.streetAddress,
            city: item.city,
            postalCode: item.postalCode,
            province: item.province ?? undefined,
            isDefault: item.isDefault,
            createdAt: item.createdAt,
          },
          item.id,
        ),
    );
  }

  async update(address: UserAddress, id: string): Promise<UserAddress> {
    const result = await this.prisma.userAddress.update({
      where: { id },
      data: {
        recipientName: address.recipientName,
        phone: address.phone,
        streetAddress: address.streetAddress,
        city: address.city,
        postalCode: address.postalCode,
        province: address.province,
        isDefault: address.isDefault,
      },
    });

    return new UserAddress(
      {
        userId: result.userId,
        recipientName: result.recipientName,
        phone: result.phone,
        streetAddress: result.streetAddress,
        city: result.city,
        postalCode: result.postalCode,
        province: result.province ?? undefined,
        isDefault: result.isDefault,
        createdAt: result.createdAt,
      },
      result.id,
    );
  }

  async delete(id: string): Promise<void> {
    await this.prisma.userAddress.delete({
      where: { id },
    });
  }

  async resetDefaultByUserId(userId: string): Promise<void> {
    await this.prisma.userAddress.updateMany({
      where: { userId, isDefault: true },
      data: { isDefault: false },
    });
  }
}


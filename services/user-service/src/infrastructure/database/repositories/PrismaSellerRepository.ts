import { SellerRepository } from '../../../domain/repositories/SellerRepository';
import { Seller } from '../../../domain/entities/Seller';
import { PrismaClient } from '../../../generated/prisma/client';
import { UpdateSellerDTO } from '../../../application/use-cases/seller/SellerDTO';

export class PrismaSellerRepository implements SellerRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(seller: Seller): Promise<Seller> {
    const result = await this.prisma.user.create({
      data: {
        fullName: seller.fullName,
        email: seller.email,
        password: seller.password,
        role: 'SELLER',
      },
    });

    return new Seller(
      result.fullName,
      result.email,
      result.password,
      result.role,
      result.phone ?? '',
      result.avatarUrl ?? '',
      result.id,
    );
  }

  async update(seller: Seller, id: string): Promise<Seller> {
    const result = await this.prisma.user.update({
      where: { id: id },
      data: {
        // fullName: seller.fullName,
        // email: seller.email,
        fullName: seller.fullName,
        email: seller.email,
        phone: seller.phone,
        avatarUrl: seller.avatarUrl,
      },
    });

    return new Seller(
      result.fullName,
      result.email,
      result.password,
      result.role,
      result.phone ?? '',
      result.avatarUrl ?? '',
      result.id,
    );
  }

  async findByEmail(email: string): Promise<Seller | null> {
    const result = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!result) return null;

    return new Seller(
      result.fullName,
      result.email,
      result.password,
      result.role,
      result.phone ?? '',
      result.avatarUrl ?? '',
      result.id,
    );
  }

  async findById(id: string): Promise<Seller | null> {
    const result = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!result) return null;

    return new Seller(
      result.fullName,
      result.email,
      result.password,
      result.role,
      result.phone ?? '',
      result.avatarUrl ?? '',
      result.id,
    );
  }
}

import { User } from '../../../domain/entities/User';
import { UserRepository } from '../../../domain/repositories/UserRepository';
import { PrismaClient } from '../../../generated/prisma/client';

export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(user: User): Promise<User> {
    const result = await this.prisma.user.create({
      data: {
        fullName: user.fullName,
        email: user.email,
        password: user.password,
        role: 'BUYER',
      },
    });

    return new User(
      result.fullName,
      result.email,
      result.password,
      result.role,
      result.id,
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!result) return null;

    return new User(
      result.fullName,
      result.email,
      result.password,
      result.role,
      result.id,
    );
  }

  async findById(id: string): Promise<User | null> {
    const result = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!result) return null;

    return new User(
      result.fullName,
      result.email,
      result.password,
      result.role,
      result.id,
    );
  }
}

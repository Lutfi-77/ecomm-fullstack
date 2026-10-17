import { Seller } from '../../../domain/entities/Seller';
import { SellerRepository } from '../../../domain/repositories/SellerRepository';
import { ConflictError } from '../../errors/DomainErrors';
import { PasswordHasher } from '../../ports/PasswordHasher';
import { CreateSellerDTO, ResponseSellerDTO } from './SellerDTO';

export class CreateSeller {
  constructor(
    private readonly sellerRepositoy: SellerRepository,
    private readonly passwordHasher: PasswordHasher,
  ) {}

  async execute(request: CreateSellerDTO): Promise<ResponseSellerDTO> {
    const existingUser = await this.sellerRepositoy.findByEmail(request.email);

    if (existingUser) {
      throw new ConflictError('Email Already Exists');
    }

    const hashedPassword = await this.passwordHasher.hash(request.password);

    const sellerEntity = new Seller(
      request.fullName,
      request.email,
      hashedPassword,
      'SELLER',
    );

    const savedSaller = await this.sellerRepositoy.create(sellerEntity);
    return {
      id: savedSaller.id!,
      fullName: savedSaller.fullName,
      email: savedSaller.email,
    };
  }
}

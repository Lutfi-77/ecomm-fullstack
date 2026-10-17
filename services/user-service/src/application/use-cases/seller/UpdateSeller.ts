import { SellerRepository } from '../../../domain/repositories/SellerRepository';
import { ConflictError, NotFoundError } from '../../errors/DomainErrors';
import { ResponseSellerDTO, UpdateSellerDTO } from './SellerDTO';

export class UpdateSeller {
  constructor(private readonly sellerRepository: SellerRepository) {}

  async execute(
    request: UpdateSellerDTO,
    id: string,
  ): Promise<ResponseSellerDTO> {
    const currentSeller = await this.sellerRepository.findById(id);

    // Check if seller exist
    if (!currentSeller) {
      throw new NotFoundError('Seller Not Found');
    }

    // Check if new email already registered
    if (request.email && request.email !== currentSeller.email) {
      const emailExists = await this.sellerRepository.findByEmail(
        request.email,
      );
      if (emailExists) {
        throw new ConflictError('Email already in use');
      }
      currentSeller.email = request.email;
    }

    if (request.fullName !== undefined)
      currentSeller.fullName = request.fullName;
    if (request.phone !== undefined) currentSeller.phone = request.phone;
    if (request.avatarUrl !== undefined)
      currentSeller.avatarUrl = request.avatarUrl;

    const updatedSeller = await this.sellerRepository.update(currentSeller, id);
    return {
      id: updatedSeller.id!,
      fullName: updatedSeller.fullName,
      email: updatedSeller.email,
      phone: updatedSeller.phone,
      avatarUrl: updatedSeller.avatarUrl,
    };
  }
}

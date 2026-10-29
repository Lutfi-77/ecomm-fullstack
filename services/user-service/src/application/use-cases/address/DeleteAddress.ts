import { AddressRepository } from '../../../domain/repositories/AddressRepository';
import { NotFoundError, ForbiddenError } from '../../errors/DomainErrors';

export class DeleteAddress {
  constructor(private readonly addressRepository: AddressRepository) {}

  async execute(addressId: string, userId: string): Promise<void> {
    const address = await this.addressRepository.findById(addressId);
    if (!address) {
      throw new NotFoundError('Address not found');
    }

    if (address.userId !== userId) {
      throw new ForbiddenError('You are not allowed to delete this address');
    }

    await this.addressRepository.delete(addressId);
  }
}


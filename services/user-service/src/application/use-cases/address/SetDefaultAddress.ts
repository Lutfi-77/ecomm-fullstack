import { AddressRepository } from '../../../domain/repositories/AddressRepository';
import { NotFoundError, ForbiddenError } from '../../errors/DomainErrors';
import { ResponseAddressDTO } from './AddressDTO';

export class SetDefaultAddress {
  constructor(private readonly addressRepository: AddressRepository) {}

  async execute(addressId: string, userId: string): Promise<ResponseAddressDTO> {
    const address = await this.addressRepository.findById(addressId);
    if (!address) {
      throw new NotFoundError('Address not found');
    }

    if (address.userId !== userId) {
      throw new ForbiddenError('You are not allowed to modify this address');
    }

    // Reset default lama dan set yang baru
    await this.addressRepository.resetDefaultByUserId(userId);

    address.setDefault(true);
    const updated = await this.addressRepository.update(address, addressId);

    return {
      id: updated.id!,
      userId: updated.userId,
      recipientName: updated.recipientName,
      phone: updated.phone,
      streetAddress: updated.streetAddress,
      city: updated.city,
      postalCode: updated.postalCode,
      province: updated.province,
      isDefault: updated.isDefault,
      createdAt: updated.createdAt,
    };
  }
}


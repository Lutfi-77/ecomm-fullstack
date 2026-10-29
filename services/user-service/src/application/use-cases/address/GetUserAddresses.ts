import { AddressRepository } from '../../../domain/repositories/AddressRepository';
import { ResponseAddressDTO } from './AddressDTO';

export class GetUserAddresses {
  constructor(private readonly addressRepository: AddressRepository) {}

  async execute(userId: string): Promise<ResponseAddressDTO[]> {
    const addresses = await this.addressRepository.findByUserId(userId);

    return addresses.map((addr) => ({
      id: addr.id!,
      userId: addr.userId,
      recipientName: addr.recipientName,
      phone: addr.phone,
      streetAddress: addr.streetAddress,
      city: addr.city,
      postalCode: addr.postalCode,
      province: addr.province,
      isDefault: addr.isDefault,
      createdAt: addr.createdAt,
    }));
  }
}


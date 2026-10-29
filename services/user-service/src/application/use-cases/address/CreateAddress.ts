import { UserAddress } from '../../../domain/entities/UserAddress';
import { AddressRepository } from '../../../domain/repositories/AddressRepository';
import { CreateAddressDTO, ResponseAddressDTO } from './AddressDTO';

export class CreateAddress {
  constructor(private readonly addressRepository: AddressRepository) {}

  async execute(
    request: CreateAddressDTO,
    userId: string,
  ): Promise<ResponseAddressDTO> {
    const existingAddresses = await this.addressRepository.findByUserId(userId);

    // Jika ini adalah alamat pertama kali yang dibuat, otomatis jadikan default
    const isFirstAddress = existingAddresses.length === 0;
    const shouldBeDefault = request.isDefault ?? isFirstAddress;

    // Jika alamat baru di-set sebagai default, reset alamat default lama
    if (shouldBeDefault) {
      await this.addressRepository.resetDefaultByUserId(userId);
    }

    const addressEntity = new UserAddress({
      userId,
      recipientName: request.recipientName,
      phone: request.phone,
      streetAddress: request.streetAddress,
      city: request.city,
      postalCode: request.postalCode,
      province: request.province,
      isDefault: shouldBeDefault,
    });

    const savedAddress = await this.addressRepository.create(addressEntity);

    return {
      id: savedAddress.id!,
      userId: savedAddress.userId,
      recipientName: savedAddress.recipientName,
      phone: savedAddress.phone,
      streetAddress: savedAddress.streetAddress,
      city: savedAddress.city,
      postalCode: savedAddress.postalCode,
      province: savedAddress.province,
      isDefault: savedAddress.isDefault,
      createdAt: savedAddress.createdAt,
    };
  }
}


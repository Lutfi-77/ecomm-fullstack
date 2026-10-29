import { UserAddress } from '../entities/UserAddress';

export interface AddressRepository {
  create(address: UserAddress): Promise<UserAddress>;
  findById(id: string): Promise<UserAddress | null>;
  findByUserId(userId: string): Promise<UserAddress[]>;
  update(address: UserAddress, id: string): Promise<UserAddress>;
  delete(id: string): Promise<void>;
  resetDefaultByUserId(userId: string): Promise<void>;
}


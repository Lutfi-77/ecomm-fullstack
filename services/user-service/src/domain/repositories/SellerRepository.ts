import { UpdateSellerDTO } from '../../application/use-cases/seller/SellerDTO';
import { Seller } from '../entities/Seller';

export interface SellerRepository {
  create(seller: Seller): Promise<Seller>;
  update(seller: Seller, id: string): Promise<Seller>;
  findByEmail(email: string): Promise<Seller | null>;
  findById(id: string): Promise<Seller | null>;
}

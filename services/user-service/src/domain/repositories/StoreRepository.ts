import { Store } from '../entities/Store';

export interface StoreRepository {
  create(store: Store): Promise<Store>;
  findBySellerId(id: string): Promise<Store | null>;
  update(store: Store, id: string): Promise<Store>;
  findBySlug(slug: string): Promise<Store | null>;
  // delete(store: Store): Promise<Store>;
  // list(userId: string): Promise<Store>;
}

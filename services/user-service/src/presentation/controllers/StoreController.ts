import { Request, Response } from 'express';
import { CreateStore } from '../../application/use-cases/store/CreateStore';
import { UpdateStore } from '../../application/use-cases/store/UpdateStore';
import { GetMyStore } from '../../application/use-cases/store/GetMyStore';
import { GetStoreBySlug } from '../../application/use-cases/store/GetStoreBySlug';

export class StoreController {
  constructor(
    private readonly createStore: CreateStore,
    private readonly updateStore: UpdateStore,
    private readonly getStore: GetMyStore,
    private readonly getStoreBySlug: GetStoreBySlug,
  ) {}

  async get(req: Request, res: Response) {
    const store = await this.getStore.execute(req.user!);

    return res.status(200).json({
      success: true,
      message: 'Store Retrieve successful',
      data: store,
    });
  }

  async getBySlug(req: Request<{ slug: string }>, res: Response) {
    const { slug } = req.params;
    const store = await this.getStoreBySlug.execute(slug);

    return res.status(200).json({
      success: true,
      message: 'Store Retrieve successful',
      data: store,
    });
  }

  async create(req: Request, res: Response) {
    const store = await this.createStore.execute(req.body, req.user!);

    return res.status(201).json({
      success: true,
      message: 'Store Created Successful',
      data: store,
    });
  }

  async update(req: Request, res: Response) {
    console.log(req.user);
    const store = await this.updateStore.execute(req.body, req.user!);
    return res.status(200).json({
      success: true,
      message: 'Store Updated Successful',
      data: store,
    });
  }
}

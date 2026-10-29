import { Request, Response } from 'express';
import { CreateAddress } from '../../application/use-cases/address/CreateAddress';
import { GetUserAddresses } from '../../application/use-cases/address/GetUserAddresses';
import { SetDefaultAddress } from '../../application/use-cases/address/SetDefaultAddress';
import { DeleteAddress } from '../../application/use-cases/address/DeleteAddress';

export class AddressController {
  constructor(
    private readonly createAddress: CreateAddress,
    private readonly getUserAddresses: GetUserAddresses,
    private readonly setDefaultAddress: SetDefaultAddress,
    private readonly deleteAddress: DeleteAddress,
  ) {}

  async create(req: Request, res: Response) {
    const address = await this.createAddress.execute(req.body, req.user!);
    return res.status(201).json({
      success: true,
      message: 'Address created successfully',
      data: address,
    });
  }

  async getAll(req: Request, res: Response) {
    const addresses = await this.getUserAddresses.execute(req.user!);
    return res.status(200).json({
      success: true,
      message: 'Addresses retrieved successfully',
      data: addresses,
    });
  }

  async setDefault(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;
    const address = await this.setDefaultAddress.execute(id, req.user!);
    return res.status(200).json({
      success: true,
      message: 'Address set as default successfully',
      data: address,
    });
  }

  async delete(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;
    await this.deleteAddress.execute(id, req.user!);
    return res.status(200).json({
      success: true,
      message: 'Address deleted successfully',
    });
  }
}


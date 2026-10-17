import { Request, Response } from 'express';
import { CreateSeller } from '../../application/use-cases/seller/CreateSeller';
import { LoginSeller } from '../../application/use-cases/seller/LoginSeller';
import { UpdateSeller } from '../../application/use-cases/seller/UpdateSeller';

export class SellerController {
  constructor(
    private readonly createSeller: CreateSeller,
    private readonly loginSeller: LoginSeller,
    private readonly updateSeller: UpdateSeller,
  ) {}

  async create(req: Request, res: Response) {
    const seller = await this.createSeller.execute({
      fullName: req.body.fullName,
      email: req.body.email,
      password: req.body.password,
    });

    return res.status(201).json({
      success: true,
      message: 'Registered Successful',
      data: seller,
    });
  }

  async login(req: Request, res: Response) {
    const seller = await this.loginSeller.execute({
      email: req.body.email,
      password: req.body.password,
    });

    return res.status(200).send({
      success: true,
      message: 'Login Successful',
      data: seller,
    });
  }

  async update(req: Request, res: Response) {
    const seller = await this.updateSeller.execute(req.body, req.user!);

    return res.status(202).send({
      success: true,
      message: 'Update Success',
      data: seller,
    });
  }
}

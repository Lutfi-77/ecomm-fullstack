import { Request, Response } from 'express';
import { CreateUser } from '../../application/use-cases/user/CreateUser';
import { LoginUser } from '../../application/use-cases/user/LoginUser';

export class UserController {
  constructor(
    private readonly createUser: CreateUser,
    private readonly loginUser: LoginUser,
  ) {}

  async create(req: Request, res: Response) {
    const user = await this.createUser.execute({
      fullName: req.body.fullName,
      email: req.body.email,
      password: req.body.password,
    });

    return res.status(201).json({
      success: true,
      message: 'Registered Successful',
      data: user,
    });
  }

  async login(req: Request, res: Response) {
    const user = await this.loginUser.execute({
      email: req.body.email,
      password: req.body.password,
    });

    return res.status(200).send({
      success: true,
      message: 'Login Successful',
      data: user,
    });
  }
}

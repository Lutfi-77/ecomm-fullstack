import { Request, Response } from 'express';
import { CreateUser } from '../../application/use-cases/user/CreateUser';
import { LoginUser } from '../../application/use-cases/user/LoginUser';
import { GetMyProfile } from '../../application/use-cases/user/GetMyProfile';
import { UpdateUser } from '../../application/use-cases/user/UpdateUser';
import { ChangePassword } from '../../application/use-cases/user/ChangePassword';

export class UserController {
  constructor(
    private readonly createUser: CreateUser,
    private readonly loginUser: LoginUser,
    private readonly getMyProfile: GetMyProfile,
    private readonly updateUser: UpdateUser,
    private readonly updatePassword: ChangePassword,
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

  async getMe(req: Request, res: Response) {
    const user = await this.getMyProfile.execute(req.user!);

    return res.status(200).json({
      success: true,
      message: 'Profile retrieved successfully',
      data: user,
    });
  }

  async updateMe(req: Request, res: Response) {
    console.log('Dari Controller USERRRRRRRRRRR');
    const user = await this.updateUser.execute(req.body, req.user!);

    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: user,
    });
  }

  async changePassword(req: Request, res: Response) {
    const user = await this.updatePassword.execute(req.body, req.user!);

    return res.status(200).json({
      success: true,
      message: 'Password updated successfully',
      data: user,
    });
  }
}

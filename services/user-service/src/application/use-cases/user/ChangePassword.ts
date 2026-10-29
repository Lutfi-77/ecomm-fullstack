import { UserRepository } from '../../../domain/repositories/UserRepository';
import {
  BadRequestError,
  ConflictError,
  UnauthorizedError,
} from '../../errors/DomainErrors';
import { PasswordHasher } from '../../ports/PasswordHasher';
import { ChangePasswordDTO, ResponseUserDTO } from './UserDTO';

export class ChangePassword {
  constructor(
    private readonly userRepositoy: UserRepository,
    private readonly passwordHasher: PasswordHasher,
  ) {}

  async execute(
    request: ChangePasswordDTO,
    userId: string,
  ): Promise<ResponseUserDTO> {
    const user = await this.userRepositoy.findById(userId);

    //   Check if user exist
    if (!user) {
      throw new UnauthorizedError('Unauthorized');
    }

    //Check if old password match with request
    const isOldPasswordMatch = await this.passwordHasher.compare(
      request.oldPassword,
      user?.password,
    );

    if (!isOldPasswordMatch) {
      throw new BadRequestError('Old password is incorrect');
    }

    //Check if new password match with confirm password
    if (request.newPassword !== request.confirmPassword) {
      throw new ConflictError('New password and confirm password not match');
    }

    const hashedPassword = await this.passwordHasher.hash(request.newPassword);
    // Do update password
    user.password = hashedPassword;
    const updatePassword = await this.userRepositoy.update(user, userId);

    return {
      id: updatePassword.id!,
      fullName: updatePassword.fullName,
      email: updatePassword.email,
      role: updatePassword.role,
    };
  }
}

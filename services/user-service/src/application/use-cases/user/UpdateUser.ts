import { UserRepository } from '../../../domain/repositories/UserRepository';
import { ConflictError, NotFoundError } from '../../errors/DomainErrors';
import { ResponseUserDTO, UpdateUserDTO } from './UserDTO';

export class UpdateUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(
    request: UpdateUserDTO,
    userId: string,
  ): Promise<ResponseUserDTO> {
    const currentUser = await this.userRepository.findById(userId);

    if (!currentUser) {
      throw new NotFoundError('User Not Found');
    }

    if (request.email && request.email !== currentUser.email) {
      const emailExists = await this.userRepository.findByEmail(request.email);
      if (emailExists) {
        throw new ConflictError('Email already in use');
      }
      currentUser.email = request.email;
    }

    if (request.fullName !== undefined) currentUser.fullName = request.fullName;
    if (request.phone !== undefined) currentUser.phone = request.phone;
    if (request.avatarUrl !== undefined)
      currentUser.avatarUrl = request.avatarUrl;

    const updatedUser = await this.userRepository.update(currentUser, userId);

    return {
      id: updatedUser.id!,
      fullName: updatedUser.fullName,
      email: updatedUser.email,
      role: updatedUser.role,
      phone: updatedUser.phone,
      avatarUrl: updatedUser.avatarUrl,
    };
  }
}

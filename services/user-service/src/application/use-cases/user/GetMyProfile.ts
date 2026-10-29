import { UserRepository } from '../../../domain/repositories/UserRepository';
import { NotFoundError } from '../../errors/DomainErrors';
import { ResponseUserDTO } from './UserDTO';

export class GetMyProfile {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userId: string): Promise<ResponseUserDTO> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new NotFoundError('User Not Found');
    }

    return {
      id: user.id!,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      phone: user.phone,
      avatarUrl: user.avatarUrl,
    };
  }
}

import { User } from '../../../domain/entities/User';
import { UserRepository } from '../../../domain/repositories/UserRepository';
import { ConflictError } from '../../errors/DomainErrors';
import { PasswordHasher } from '../../ports/PasswordHasher';
import { CreateUserDTO, ResponseUserDTO } from './UserDTO';

export class CreateUser {
  constructor(
    private readonly userRepositoy: UserRepository,
    private readonly passwordHasher: PasswordHasher,
  ) {}

  async execute(request: CreateUserDTO): Promise<ResponseUserDTO> {
    const existingUser = await this.userRepositoy.findByEmail(request.email);

    if (existingUser) {
      throw new ConflictError('Email Already Exists');
    }

    const hashedPassword = await this.passwordHasher.hash(request.password);

    const UserEntity = new User(
      request.fullName,
      request.email,
      hashedPassword,
      'BUYER',
    );

    const savedUser = await this.userRepositoy.create(UserEntity);
    return {
      id: savedUser.id!,
      fullName: savedUser.fullName,
      email: savedUser.email,
      role: savedUser.role,
    };
  }
}

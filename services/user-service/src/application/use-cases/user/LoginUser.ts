import { UserRepository } from '../../../domain/repositories/UserRepository';
import { UnauthorizedError } from '../../errors/DomainErrors';
import { JsonWebToken } from '../../ports/JsonWebToken';
import { PasswordHasher } from '../../ports/PasswordHasher';
import { LoginResponseUserDTO, LoginUserDTO } from './UserDTO';

export class LoginUser {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: PasswordHasher,
    private readonly jwt: JsonWebToken,
  ) {}

  async execute(request: LoginUserDTO): Promise<LoginResponseUserDTO> {
    // cek if user exist
    const existingUser = await this.userRepository.findByEmail(request.email);

    if (!existingUser) {
      throw new UnauthorizedError('Email or Password Invalid');
    }

    //Cek if password valid
    const isPasswordValid = await this.passwordHasher.compare(
      request.password,
      existingUser.password,
    );
    // console.log(isPasswordValid);
    if (!isPasswordValid) {
      throw new UnauthorizedError('Email or Password Invalid');
    }

    //Check if role is Seller
    if (existingUser.role !== 'BUYER') {
      throw new UnauthorizedError('Email or Password Invalid');
    }

    const getToken = this.jwt.sign({
      id: existingUser.id,
      role: existingUser.role,
    });

    return { token: getToken };
  }
}

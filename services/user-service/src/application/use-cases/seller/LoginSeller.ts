import { Seller } from '../../../domain/entities/Seller';
import { SellerRepository } from '../../../domain/repositories/SellerRepository';
import { UnauthorizedError } from '../../errors/DomainErrors';
import { JsonWebToken } from '../../ports/JsonWebToken';
import { PasswordHasher } from '../../ports/PasswordHasher';
import { LoginResponseSellerDTO, LoginSellerDTO } from './SellerDTO';

export class LoginSeller {
  constructor(
    private readonly sellerRepository: SellerRepository,
    private readonly passwordHasher: PasswordHasher,
    private readonly jwt: JsonWebToken,
  ) {}

  async execute(request: LoginSellerDTO): Promise<LoginResponseSellerDTO> {
    // cek if user exist
    const existingUser = await this.sellerRepository.findByEmail(request.email);

    if (!existingUser) {
      throw new UnauthorizedError('Email or Password Invalid');
    }

    //Check if password valid
    const isPasswordValid = await this.passwordHasher.compare(
      request.password,
      existingUser.password,
    );
    // console.log(isPasswordValid);
    if (!isPasswordValid) {
      throw new UnauthorizedError('Email or Password Invalid');
    }

    //Check if role is Seller
    console.log(existingUser);
    if (existingUser.role !== 'SELLER') {
      throw new UnauthorizedError('Email or Password Invalid');
    }

    const getToken = this.jwt.sign({
      id: existingUser.id,
      role: existingUser.role,
    });

    return { token: getToken };
  }
}

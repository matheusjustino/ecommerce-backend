import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';

// REPOSITORY
import { UserRepository } from '@src/database/repositories/user.repository';

// SCHEMAS
import { UserDocument } from '@src/database/schemas/user.schema';

// MODELS
import { IAuthService } from '@shared/src/auth/authService.interface';
import { RegisterModel } from '@shared/src/auth/registerModel';
import { LoginModel } from '@shared/src/auth/loginModel';

@Injectable()
export class AuthService implements IAuthService {
	constructor(
		private readonly jwtService: JwtService,
		private readonly userRepository: UserRepository,
	) {}

	public async validateToken(token: string): Promise<UserDocument> {
		const payload = await this.jwtService.verifyAsync(token);
		delete payload['iat'];

		const user = await this.userRepository.userModel.findOne({ email: payload['email'] });

		return user;
	}

	public async register(userDto: RegisterModel): Promise<UserDocument> {
		const newUser = await this.userRepository.userModel.create(userDto);
		return newUser;
	}

	public async login(loginDto: LoginModel): Promise<string> {
		if (loginDto.password !== loginDto.confirmPassword) {
			throw new BadRequestException('Password e Confirme Password são diferentes');
		}

		const user = await this.userRepository.userModel.findOne({ email: loginDto.email });

		if (!user) {
			throw new BadRequestException('Email inválido');
		}

		if (!(await bcrypt.compare(loginDto.password, user.password))) {
			throw new UnauthorizedException('Password inválido');
		}

		const token = this.jwtService.sign({ email: user.email, userId: user._id });
		return token;
	}
}

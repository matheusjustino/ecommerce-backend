import {
	Body,
	Controller,
	Post,
	Res,
	HttpStatus,
	Inject,
} from '@nestjs/common';

// @SHARED
import {
	AUTH_SERVICE,
	IAuthService,
} from '@shared/src/auth/authService.interface';

// MODELS
import { RegisterModel } from '@shared/src/auth/registerModel';
import { LoginModel } from '@shared/src/auth/loginModel';

@Controller('auth')
export class AuthController {
	constructor(
		@Inject(AUTH_SERVICE)
		private readonly authService: IAuthService,
	) {}

	@Post('register')
	public async register(@Body() registerDto: RegisterModel, @Res() res) {
		const user = await this.authService.register(registerDto);
		return res.status(HttpStatus.OK).json(user);
	}

	@Post('login')
	public async login(@Body() loginDto: LoginModel, @Res() res) {
		const token = await this.authService.login(loginDto);
		return res.status(HttpStatus.OK).json({ token });
	}
}

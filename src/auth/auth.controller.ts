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
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '@src/common/decorators/user.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(
		@Inject(AUTH_SERVICE)
		private readonly authService: IAuthService,
	) {}
	
	@Post('register')
	@ApiBody({ type: RegisterModel })
	@ApiOkResponse({ type: User })
	@ApiOperation({ description: 'Registro de usuário.' })
	public async register(@Body() registerDto: RegisterModel, @Res() res) {
		const user = await this.authService.register(registerDto);
		return res.status(HttpStatus.OK).json(user);
	}

	@Post('login')
	@ApiBody({ type: LoginModel })
	@ApiOkResponse({ type: Object })
	@ApiOperation({ description: 'Login de um usuário.' })
	public async login(@Body() loginDto: LoginModel, @Res() res) {
		const token = await this.authService.login(loginDto);
		return res.status(HttpStatus.OK).json({ token });
	}
}

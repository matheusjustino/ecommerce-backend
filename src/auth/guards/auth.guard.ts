import {
	Injectable,
	CanActivate,
	ExecutionContext,
	UnauthorizedException,
	Inject,
} from '@nestjs/common';
import {
	AUTH_SERVICE,
	IAuthService,
} from '@shared/src/auth/authService.interface';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		@Inject(AUTH_SERVICE)
		private readonly authService: IAuthService,
	) {}

	public async canActivate(context: ExecutionContext): Promise<boolean> {
		const req = context.switchToHttp().getRequest();

		if (!req.headers['authorization']) {
			throw new UnauthorizedException('Sem token de autorização');
		}

		const [, token] = req.headers['authorization'].split(' ');

		const user = await this.authService.validateToken(token);

		if (!user) {
			throw new UnauthorizedException('Falha na autenticação');
		}

		const userRequest = {
			id: user._id,
			email: user.email,
			legalDocument: user.legalDocument,
			stripeCustomerId: user.stripeCustomerId,
		};

		req.user = userRequest;

		return true;
	}
}

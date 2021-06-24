import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

// GUARDS
import { AuthGuard } from '@src/auth/guards/auth.guard';
import { RolesGuard } from './guards/roles.guard';

// @SRC
import { DatabaseModule } from '@src/database/database.module';
import { UserModule } from '@src/user/user.module';
import { AuthService } from './auth.service';
import { JobsModule } from '@src/jobs/jobs.module';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategy/jwt.strategy';
import { RedisCacheModule } from '@src/redis-cache/redis-cache.module';
import { AppConfigModule } from '@src/app-config/app-config.module';
import { StripeModule } from '@src/stripe/stripe.module';
import { AppConfigService } from '@src/app-config/app-config.service';

// @SHARED
import { AUTH_SERVICE } from '@shared/src/auth/authService.interface';

@Module({
	imports: [
		DatabaseModule,
		AppConfigModule,
		PassportModule,
		JobsModule,
		RedisCacheModule,
		JwtModule.registerAsync({
			imports: [AppConfigModule],
			useFactory: (appConfigService: AppConfigService) => ({
				secret: appConfigService.secret,
				signOptions: { expiresIn: '1d' },
			}),
			inject: [AppConfigService],
		}),
		forwardRef(() => UserModule),
		forwardRef(() => StripeModule),
	],
	providers: [
		{
			useClass: AuthService,
			provide: AUTH_SERVICE,
		},
		AuthService,
		JwtStrategy,
		RolesGuard,
		AuthGuard,
	],
	controllers: [AuthController],
	exports: [
		{
			useClass: AuthService,
			provide: AUTH_SERVICE,
		},
		AuthService,
		JwtStrategy,
		RolesGuard,
		AuthGuard,
	],
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

// @SRC
import { DatabaseModule } from '@src/database/database.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategy/jwt.strategy';

// @SHARED
import { AUTH_SERVICE } from '@shared/src/auth/authService.interface';
import { AppConfigModule } from '@src/app-config/app-config.module';
import { AppConfigService } from '@src/app-config/app-config.service';

@Module({
	imports: [
        DatabaseModule,
		PassportModule,
		JwtModule.registerAsync({
			imports: [AppConfigModule],
			useFactory: (appConfigService: AppConfigService) => ({
				secret: appConfigService.secret
			}),
			inject: [AppConfigService]
		})
    ],
	providers: [
		{
			useClass: AuthService,
			provide: AUTH_SERVICE
		},
		JwtStrategy
	],
	controllers: [AuthController],
	exports: [
		{
			useClass: AuthService,
			provide: AUTH_SERVICE
		}
	]
})
export class AuthModule {}

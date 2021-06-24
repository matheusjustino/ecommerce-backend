import { AuthModule } from '@src/auth/auth.module';
import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from '@src/database/database.module';
import { UserController } from '@src/user/user.controller';
import { UserService } from '@src/user/user.service';
import { USER_SERVICE } from '@shared/src/user/userService.interface';
import { RedisCacheModule } from '@src/redis-cache/redis-cache.module';

@Module({
	imports: [DatabaseModule, forwardRef(() => AuthModule), RedisCacheModule],
	controllers: [UserController],
	providers: [
		UserService,
		{
			useClass: UserService,
			provide: USER_SERVICE,
		},
	],
	exports: [
		UserService,
		{
			useClass: UserService,
			provide: USER_SERVICE,
		},
	],
})
export class UserModule {}

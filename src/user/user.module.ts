import { AuthModule } from '@src/auth/auth.module';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '@src/database/database.module';
import { UserController } from '@src/user/user.controller';
import { UserService } from '@src/user/user.service';
import { USER_SERVICE } from '@shared/src/user/userService.interface';

@Module({
	imports: [
		DatabaseModule,
		AuthModule
	],
	controllers: [UserController],
	providers: [
		{
			useClass: UserService,
			provide: USER_SERVICE
		}
	]
})
export class UserModule {}

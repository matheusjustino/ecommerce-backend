import { Module } from '@nestjs/common';

// MODULES
import { UserModule } from '@src/user/user.module';
import { AuthModule } from '@src/auth/auth.module';
import { DatabaseModule } from '@src/database/database.module';

import { AddressService } from './address.service';
import { AddressController } from './address.controller';

@Module({
	imports: [DatabaseModule, UserModule, AuthModule],
	providers: [AddressService],
	controllers: [AddressController],
	exports: [AddressService],
})
export class AddressModule {}

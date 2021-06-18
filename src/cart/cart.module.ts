import { Module } from '@nestjs/common';

// @SHARED
import { CART_SERVICE } from '@shared/src/cart/cartService.interface';

// MODULES
import { UserModule } from '@src/user/user.module';
import { AuthModule } from '@src/auth/auth.module';
import { DatabaseModule } from '@src/database/database.module';

import { CartService } from './cart.service';
import { CartController } from './cart.controller';

@Module({
	imports: [
		DatabaseModule,
		UserModule,
		AuthModule
	],
	providers: [
		{
			useClass: CartService,
			provide: CART_SERVICE
		}
	],
	controllers: [CartController],
	exports: [
		{
			useClass: CartService,
			provide: CART_SERVICE
		}
	]
})
export class CartModule {}

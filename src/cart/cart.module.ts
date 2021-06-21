import { Module } from '@nestjs/common';

// @SHARED
import { CART_SERVICE } from '@shared/src/cart/cartService.interface';

// MODULES
import { DatabaseModule } from '@src/database/database.module';
import { AuthModule } from '@src/auth/auth.module';
import { UserModule } from '@src/user/user.module';

import { CartService } from './cart.service';
import { CartController } from './cart.controller';

@Module({
	imports: [DatabaseModule, AuthModule, UserModule],
	providers: [
		{
			useClass: CartService,
			provide: CART_SERVICE,
		},
	],
	controllers: [CartController],
	exports: [
		{
			useClass: CartService,
			provide: CART_SERVICE,
		},
	],
})
export class CartModule {}

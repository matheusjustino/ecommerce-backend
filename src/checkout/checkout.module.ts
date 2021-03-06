import { Module } from '@nestjs/common';

// MODULES
import { UserModule } from '@src/user/user.module';
import { AuthModule } from '@src/auth/auth.module';
import { DatabaseModule } from '@src/database/database.module';
import { CartModule } from '@src/cart/cart.module';
import { CorreiosModule } from '@src/correios/correios.module';

// SERVICES INTERFACE
import { CHECKOUT_SERVICE } from '@shared/src/checkout/checkoutService.interface';

import { CheckoutService } from './checkout.service';
import { CheckoutController } from './checkout.controller';

@Module({
	imports: [
		DatabaseModule,
		AuthModule,
		UserModule,
		CartModule,
		CorreiosModule,
	],
	providers: [
		{
			useClass: CheckoutService,
			provide: CHECKOUT_SERVICE,
		},
	],
	controllers: [CheckoutController],
	exports: [
		{
			useClass: CheckoutService,
			provide: CHECKOUT_SERVICE,
		},
	],
})
export class CheckoutModule {}

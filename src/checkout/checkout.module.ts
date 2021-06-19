import { Module } from '@nestjs/common';

import { DatabaseModule } from '@src/database/database.module';
import { CartModule } from '@src/cart/cart.module';
import { CHECKOUT_SERVICE } from '@shared/src/checkout/checkoutService.interface';
import { CheckoutService } from './checkout.service';
import { CheckoutController } from './checkout.controller';
import { CorreiosModule } from '@src/correios/correios.module';

@Module({
	imports: [
		DatabaseModule,
		CartModule,
		CorreiosModule
	],
	providers: [
		{
			useClass: CheckoutService,
			provide: CHECKOUT_SERVICE
		},
	],
	controllers: [CheckoutController],
	exports: [
		{
			useClass: CheckoutService,
			provide: CHECKOUT_SERVICE
		}
	]
})
export class CheckoutModule {}

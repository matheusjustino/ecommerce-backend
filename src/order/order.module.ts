import { Module } from '@nestjs/common';

// MODULES
import { DatabaseModule } from '@src/database/database.module';
import { AuthModule } from '@src/auth/auth.module';
import { UserModule } from '@src/user/user.module';
import { StripeModule } from '@src/stripe/stripe.module';
import { CartModule } from '@src/cart/cart.module';

// SERVICES
import { OrderService } from './order.service';
import { OrderController } from './order.controller';

// SERVICES INTERFACE
import { ORDER_SERVICE } from '@shared/src/order/order.service';

@Module({
	imports: [
		DatabaseModule,
		AuthModule,
		UserModule,
		CartModule,
		StripeModule
	],
	providers: [
		{
			useClass: OrderService,
			provide: ORDER_SERVICE
		}
	],
	controllers: [OrderController],
	exports: [
		{
			useClass: OrderService,
			provide: ORDER_SERVICE
		}
	]
})
export class OrderModule {}

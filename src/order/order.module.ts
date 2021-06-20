import { Module } from '@nestjs/common';

// MODULES
import { DatabaseModule } from '@src/database/database.module';
import { CartModel } from '@shared/src/cart/cartModel';
import { AuthModule } from '@src/auth/auth.module';

import { OrderService } from './order.service';
import { OrderController } from './order.controller';

@Module({
	imports: [
		DatabaseModule,
		AuthModule,
		CartModel
	],
	providers: [OrderService],
	controllers: [OrderController]
})
export class OrderModule {}

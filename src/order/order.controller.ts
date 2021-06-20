import { Body, Controller, Post, Res, HttpStatus, UseGuards, Inject, Get } from '@nestjs/common';
import { Response } from 'express';

// SERVICES INTERFACE
import { ORDER_SERVICE } from '@shared/src/order/order.service';
import { IOrderService } from '@shared/src/order/order.service';

// GUARDS
import { AuthGuard } from '@src/auth/guards/auth.guard';

// MODELS
import { CreateOrderBodyModel } from '@shared/src/order/order-model';

// DECORATORS
import { User } from '@src/common/decorators/user.decorator';

@Controller('orders')
@UseGuards(AuthGuard)
export class OrderController {
	constructor(
		@Inject(ORDER_SERVICE)
		private readonly orderService: IOrderService
	) {}

	@Post()
	public async createOrder(@Body() body: CreateOrderBodyModel, @Res() res: Response) {
		const order = await this.orderService.createOrder(body);
		return res.status(HttpStatus.OK).json(order);
	}

	@Get()
	public async getUserOrders(@User() user, @Res() res: Response) {
		const orders = await this.orderService.getUserOrders(user.id);
		return res.status(HttpStatus.OK).json(orders);
	}
}

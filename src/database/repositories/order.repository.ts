import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

// SCHEMAS
import { Order, OrderDocument } from '../schemas/order.schema';

@Injectable()
export class OrderRepository {
	constructor(
		@InjectModel(Order.name)
		private readonly OrderModel: Model<OrderDocument>,
	) {}

	public get orderModel(): Model<OrderDocument> {
		return this.OrderModel;
	}
}

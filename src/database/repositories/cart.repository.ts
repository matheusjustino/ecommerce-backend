import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

// SCHEMAS
import { Cart, CartDocument } from '../schemas/cart.schema';

// @SHARED
import { ICartRepository } from '@shared/src/database/repositories/cartRepository.interface';

@Injectable()
export class CartRepository implements ICartRepository {
	constructor(
		@InjectModel(Cart.name)
		private readonly CartModel: Model<CartDocument>,
	) {}

	public get cartModel(): Model<CartDocument> {
		return this.CartModel;
	}
}

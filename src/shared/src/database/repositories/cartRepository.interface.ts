import { Model } from 'mongoose';

import { CartDocument } from "@src/database/schemas/cart.schema";

export interface ICartRepository {
	get cartModel(): Model<CartDocument>;
}

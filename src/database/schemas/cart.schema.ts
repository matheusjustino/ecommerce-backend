import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// @SHARED
import { CartModel } from '@shared/src/cart/cartModel';
import { UserModel } from '@shared/src/database/schemas/userModel';
import { UserDocument } from '@src/database/schemas/user.schema';
import { CartItemDocument, CartItemSchema } from './cartItemModel.schema';

@Schema({ timestamps: true })
export class Cart implements CartModel {
	@Prop({ type: UserModel, required: true })
	public user: UserDocument;

	@Prop({ type: [CartItemSchema], default: [] })
	public items: CartItemDocument[];

	@Prop({ type: Number, default: 0 })
	public total: number;

	@Prop({ type: Number, default: 0 })
	public quantity: number;
}

export type CartDocument = Cart & Document;
export const CartSchema = SchemaFactory.createForClass(Cart);

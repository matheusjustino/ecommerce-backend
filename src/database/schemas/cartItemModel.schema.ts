import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CartItemModel } from '@shared/src/cart/cartModel';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class CartItem implements CartItemModel {
	@Prop({ type: String, required: true })
	public productId: string;

	@Prop({ type: String, required: true })
	public productName: string;

	@Prop({ type: Number, required: true, default: 0 })
	public quantity: number;

	@Prop({ type: Number, required: true, default: 0 })
	public price: number;

	@Prop({ type: [], required: true, default: [] })
	public attributes: []
}

export type CartItemDocument = CartItem & Document;
export const CartItemSchema = SchemaFactory.createForClass(CartItem);

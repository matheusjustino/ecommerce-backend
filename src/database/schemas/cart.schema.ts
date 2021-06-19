import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// @SHARED
import { CartModel, ShippingMethod } from '@shared/src/cart/cartModel';
import { UserModel } from '@shared/src/database/schemas/userModel';
import { UserDocument } from '@src/database/schemas/user.schema';
import { BillingAddressModel, ShippingAddressModel } from '@shared/src/checkout/checkoutModel';

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

	@Prop({ type: ShippingMethod, default: new ShippingMethod() })
	public shippingMethod: ShippingMethod;

	@Prop({ type: BillingAddressModel, default: new BillingAddressModel() })
	public billingAddress: BillingAddressModel;

	@Prop({ type: ShippingAddressModel, default: new ShippingAddressModel() })
	public shippingAddress: ShippingAddressModel;
}

export type CartDocument = Cart & Document;
export const CartSchema = SchemaFactory.createForClass(Cart);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { UserDocument, UserSchema } from '@src/database/schemas/user.schema';
import { BillingAddressModel, ShippingAddressModel } from '@shared/src/checkout/checkoutModel';
import { ShippingMethod } from '@shared/src/cart/cartModel';

@Schema({ timestamps: true })
export class Order {
	@Prop({ type: UserSchema, required: true })
	public user: UserDocument;

	@Prop({ type: Number, required: true, default: 0 })
	public total: number;

	@Prop({ type: Number, required: true, default: 0 })
	public quantity: number;

	@Prop({ type: String, required: true, default: 'Pending' })
	public status: string;

	@Prop({ type: ShippingMethod, default: new ShippingMethod() })
	public shippingMethod: ShippingMethod;

	@Prop({ type: BillingAddressModel, default: new BillingAddressModel() })
	public billingAddress: BillingAddressModel;

	@Prop({ type: ShippingAddressModel, default: new ShippingAddressModel() })
	public shippingAddress: ShippingAddressModel;

	@Prop({ type: Object, default: {} })
	public payment: {};

	@Prop({ type: Array, default: [] })
	public items: [];
}

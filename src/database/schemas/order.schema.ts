import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

// SCHEMAS
import { User, UserDocument } from '@src/database/schemas/user.schema';
import { PaymentDocument, PaymentSchema } from './payment.schema';
import { OrderItem, OrderItemSchema } from './order-item.schema';

// MODELS
import {
	BillingAddressModel,
	ShippingAddressModel,
} from '@shared/src/checkout/checkoutModel';
import { ShippingMethod } from '@shared/src/cart/cartModel';

@Schema({ timestamps: true })
export class Order {
	@Prop({ type: Types.ObjectId, ref: User.name, required: true })
	public user: UserDocument;

	@Prop({ type: Number, required: true, default: 0 })
	public total: number;

	@Prop({ type: Number, required: true, default: 0 })
	public quantity: number;

	@Prop({ type: String, required: true, default: 'Pending' })
	public status: string;

	@Prop({
		type: ShippingMethod,
		required: true,
		default: new ShippingMethod(),
	})
	public shippingMethod: ShippingMethod;

	@Prop({
		type: BillingAddressModel,
		required: true,
		default: new BillingAddressModel(),
	})
	public billingAddress: BillingAddressModel;

	@Prop({
		type: ShippingAddressModel,
		required: true,
		default: new ShippingAddressModel(),
	})
	public shippingAddress: ShippingAddressModel;

	@Prop({ type: PaymentSchema, required: true, default: {} })
	public payment: PaymentDocument;

	@Prop({ type: [OrderItemSchema], required: true, default: [] })
	public items: OrderItem[];
}

export type OrderDocument = Order & Document;
export const OrderSchema = SchemaFactory.createForClass(Order);

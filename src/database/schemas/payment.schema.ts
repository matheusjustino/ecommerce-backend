import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PaymentChargesModel, PaymentModel } from '@shared/src/order/order-model';

@Schema({ timestamps: true })
export class Payment implements PaymentModel {
	@Prop({ type: String })
	public status: string;

	@Prop({ type: String })
	public stripChargeId: string;

	@Prop({ type: Number, default: 0 })
	public amount: number;

	@Prop({ type: Number, default: 0 })
	public amount_capturable: number;

	@Prop({ type: Number, default: 0 })
	public amount_received: number;

	@Prop({ type: String })
	public canceled_at: string;

	@Prop({ type: String })
	public cancellation_reason: string;

	@Prop({ type: String })
	public capture_method: string;

	@Prop({ type: PaymentChargesModel, default: new PaymentChargesModel() })
	public charges: PaymentChargesModel;
}

export type PaymentDocument = Payment & Document;
export const PaymentSchema = SchemaFactory.createForClass(Payment);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

// @SHARED
import { User, UserDocument } from '@src/database/schemas/user.schema';

@Schema({ timestamps: true })
export class Address {
	@Prop({ type: Types.ObjectId, ref: User.name, required: true })
	public user: UserDocument;

	@Prop({ type: String, required: true })
	public state: string;

	@Prop({ type: String, required: true })
	public city: string;

	@Prop({ type: String, required: true })
	public street: string;

	@Prop({ type: String, required: true })
	public number: string;

	@Prop({ type: String, required: true })
	public zip: string;

	@Prop({ type: String, required: true })
	public reference: string;
}

export type AddressDocument = Address & Document;
export const AddressSchema = SchemaFactory.createForClass(Address);

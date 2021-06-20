import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// COMMON
import { Sex } from '@src/common/enums/sex.enum';

// @SHARED
import { UserModel } from '@shared/src/database/schemas/userModel';

@Schema({ timestamps: true })
export class User implements UserModel {
	@Prop({ type: String, required: true })
	public firstName: string;

	@Prop({ type: String, required: true })
	public lastName: string;

	@Prop({ type: String, required: true })
	public legalDocument: string;

	@Prop({ type: String, required: true })
	public phone: string;

	@Prop({ type: Sex, enum: [Sex.male, Sex.female, Sex.other], required: true })
	public gender: Sex;

	@Prop({ type: String, required: true, unique: true })
	public email: string;

	@Prop({ type: String, required: true })
	public password: string;

	@Prop({ type: String })
	public stripeCustomerId: string;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);

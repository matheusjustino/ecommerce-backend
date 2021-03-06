import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// COMMON
import { Sex } from '@src/common/enums/sex.enum';

// @SHARED
import { UserModel } from '@shared/src/database/schemas/userModel';
import { UserRole } from '@src/common/enums/user-role.enum';

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

	@Prop({
		type: Sex,
		enum: [Sex.male, Sex.female, Sex.other],
		required: true,
	})
	public gender: Sex;

	@Prop({ type: String, required: true, unique: true })
	public email: string;

	@Prop({ type: String, required: true })
	public password: string;

	@Prop({ type: String })
	public stripeCustomerId: string;

	@Prop({
		type: UserRole,
		enum: [UserRole.ADMIN, UserRole.CUSTOMER],
		default: UserRole.CUSTOMER,
	})
	public role: UserRole;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);

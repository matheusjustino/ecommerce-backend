import {
	IsEmail,
	IsEnum,
	IsMongoId,
	IsNotEmpty,
	IsOptional,
	IsString,
} from 'class-validator';

import { Sex } from '@src/common/enums/sex.enum';

export class UserModel {
	@IsMongoId()
	@IsOptional()
	public id?: string;

	@IsString()
	@IsNotEmpty()
	public firstName: string;

	@IsString()
	@IsNotEmpty()
	public lastName: string;

	@IsString()
	@IsNotEmpty()
	public legalDocument: string;

	@IsString()
	@IsNotEmpty()
	public phone: string;

	@IsEnum(Sex, {
		message: `O gênero deve ser Male, Female ou Other.`,
	})
	@IsNotEmpty()
	public gender: Sex;

	@IsString()
	@IsEmail()
	@IsNotEmpty()
	public email: string;

	@IsString()
	@IsNotEmpty()
	public password: string;

	@IsString()
	@IsOptional()
	public stripeCustomerId?: string;
}

// export class UserUpdateModel {
// 	public firstName?: string;
// 	public lastName?: string;
// 	public legalDocument?: string;
// 	public phone?: string;
// 	public gender?: Sex;
// 	public email?: string;
// 	public password?: string;
// }

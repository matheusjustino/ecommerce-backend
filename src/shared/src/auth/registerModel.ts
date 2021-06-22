import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Sex } from '@src/common/enums/sex.enum';

export class RegisterModel {
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

	public stripeCustomerId: string;
}

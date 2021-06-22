import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';

import { Sex } from '@src/common/enums/sex.enum';

export class UserUpdateModel {
	@IsString()
	@IsOptional()
	public firstName?: string;

	@IsString()
	@IsOptional()
	public lastName?: string;

	@IsString()
	@IsOptional()
	public legalDocument?: string;

	@IsString()
	@IsOptional()
	public phone?: string;

	@IsEnum(Sex, {
		message: `O gênero deve ser Male, Female ou Other.`,
	})
	@IsOptional()
	public gender?: Sex;

	@IsString()
	@IsEmail()
	@IsOptional()
	public email?: string;

	@IsString()
	@IsOptional()
	public password?: string;
}

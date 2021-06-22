import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginModel {
	@IsString()
	@IsEmail()
	@IsNotEmpty()
	public email: string;

	@IsString()
	@IsNotEmpty()
	public password: string;

	@IsString()
	@IsNotEmpty()
	public confirmPassword: string;
}

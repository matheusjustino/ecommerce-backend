import { UserDocument } from "@src/database/schemas/user.schema";
import { RegisterModel } from './registerModel';
import { LoginModel } from './loginModel';

export const AUTH_SERVICE = 'AUTH SERVICE';

export interface IAuthService {
	validateToken(token: string): Promise<UserDocument>;
	register(userDto: RegisterModel): Promise<UserDocument>;
	login(loginDto: LoginModel): Promise<string>
}

import { UserModel } from '../database/schemas/userModel';
import { UserUpdateModel } from './userUpdateModel';

export const USER_SERVICE = 'USER SERVICE';
export interface IUserService {
	findAllUsers(): Promise<UserModel[]>;
	findUserById(id: string): Promise<UserModel>;
	updateUser(id: string, data: UserUpdateModel): Promise<UserModel>;
	deleteUser(id: string): Promise<void>;
}

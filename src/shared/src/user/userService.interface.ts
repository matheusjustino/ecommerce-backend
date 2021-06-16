import { UserModel, UserUpdateModel } from "../database/schemas/userModel";

export const USER_SERVICE = 'USER SERVICE';
export interface IUserService {
	findAllUsers(): Promise<UserModel[]>;
	findUserById(id: string): Promise<UserModel>;
	updateUser(id: string, data: UserUpdateModel): Promise<UserModel>;
	deleteUser(id: string): Promise<void>;
}

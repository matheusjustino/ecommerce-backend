import { BadRequestException, Injectable } from '@nestjs/common';

// @SHARED
import { IUserService } from '@shared/src/user/userService.interface';
import { UserModel } from '@shared/src/database/schemas/userModel';

import { UserRepository } from '@src/database/repositories/user.repository';
import { UserUpdateModel } from '@shared/src/user/userUpdateModel';

@Injectable()
export class UserService implements IUserService {
	constructor(
		private readonly userRepository: UserRepository
	) { }

	public async findAllUsers(): Promise<UserModel[]> {
		const users = await this.userRepository.userModel.find();
		return users;
	}

	public async findUserById(id: string): Promise<UserModel> {
		const user = this.userRepository.userModel.findById(id);

		if (!user) {
			throw new BadRequestException('User not found.');
		}
		return user;
	}

	public async updateUser(id: string, data: UserUpdateModel): Promise<UserModel> {
		const user = await this.userRepository.userModel.findById(id);
		if (!user) {
			throw new BadRequestException('User not found.');
		}
		const updatedUser = Object.assign(user, data);
		return await updatedUser.save();
	}

	public async deleteUser(id: string): Promise<void> {
		await this.userRepository.userModel.findByIdAndDelete(id);
	}
}

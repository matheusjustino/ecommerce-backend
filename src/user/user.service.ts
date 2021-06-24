import { BadRequestException, Inject, Injectable } from '@nestjs/common';

// SCHEMAS
import { UserDocument } from '@src/database/schemas/user.schema';

// REPOSITORIES
import { UserRepository } from '@src/database/repositories/user.repository';

// SERVICE INTERFACE
import { IUserService } from '@shared/src/user/userService.interface';
import { IRedisCacheInterface } from '@shared/src/redis-cache/redis-cache.service';
import { REDIS_CACHE_SERVICE } from '@shared/src/redis-cache/redis-cache.service';

// MODELS
import { UserModel } from '@shared/src/database/schemas/userModel';
import { UserUpdateModel } from '@shared/src/user/userUpdateModel';

@Injectable()
export class UserService implements IUserService {
	constructor(
		private readonly userRepository: UserRepository,
		@Inject(REDIS_CACHE_SERVICE)
		private readonly redisCacheService: IRedisCacheInterface,
	) {}

	public async findAllUsers(): Promise<UserModel[]> {
		// buscando do cache caso exista
		let users = await this.redisCacheService.recover<UserModel[]>(
			'USER_LIST',
		);

		if (!users) {
			users = await this.userRepository.userModel.find();

			// salvando no cache
			await this.redisCacheService.save('USER_LIST', users);
		}

		return users;
	}

	public async findUserById(id: string): Promise<UserDocument> {
		const user = this.userRepository.userModel.findById(id);

		if (!user) {
			throw new BadRequestException('User not found.');
		}
		return user;
	}

	public async updateUser(
		id: string,
		data: UserUpdateModel,
	): Promise<UserModel> {
		const user = await this.userRepository.userModel.findById(id);

		if (!user) {
			throw new BadRequestException('User not found.');
		}

		const updatedUser = Object.assign(user, data);

		// invalidando lista de users no cache
		await this.redisCacheService.invalidate('USER_LIST');

		return await updatedUser.save();
	}

	public async deleteUser(id: string): Promise<void> {
		await this.userRepository.userModel.findByIdAndDelete(id);

		// invalidando lista de users no cache
		await this.redisCacheService.invalidate('USER_LIST');
	}
}

import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

// SCHEMAS
import { User, UserDocument } from '../schemas/user.schema';

// @SHARED
import { IUserRepository } from '@shared/src/database/repositories/userRepository.interface';

@Injectable()
export class UserRepository implements IUserRepository {
	constructor(
		@InjectModel(User.name)
		private readonly UserModel: Model<UserDocument>,
	) {}

	public get userModel(): Model<UserDocument> {
		return this.UserModel;
	}
}

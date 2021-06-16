import { Model } from 'mongoose';

import { UserDocument } from "@src/database/schemas/user.schema";

export interface IUserRepository {
	get userModel(): Model<UserDocument>;
}

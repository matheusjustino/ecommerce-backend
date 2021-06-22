import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

// SCHEMAS
import { Address, AddressDocument } from '../schemas/address.schema';

@Injectable()
export class AddressRepository {
	constructor(
		@InjectModel(Address.name)
		private readonly AddressModel: Model<AddressDocument>,
	) {}

	public get addressModel(): Model<AddressDocument> {
		return this.AddressModel;
	}
}

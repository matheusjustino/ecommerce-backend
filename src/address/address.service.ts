import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import {
	IUserService,
	USER_SERVICE,
} from '@shared/src/user/userService.interface';

// ADDRESS
import { AddressRepository } from '@src/database/repositories/address.repository';
import { Address, AddressDocument } from '@src/database/schemas/address.schema';

@Injectable()
export class AddressService {
	constructor(
		@Inject(USER_SERVICE)
		private userService: IUserService,
		private addressRepository: AddressRepository,
	) {}

	public async createAddress(
		userId: string,
		addressModel: Address,
	): Promise<AddressDocument> {
		await this.userService.findUserById(userId);

		const address = await this.addressRepository.addressModel.create(
			addressModel,
		);
		return address;
	}

	public async getAddresses(): Promise<AddressDocument[]> {
		const addresses = await this.addressRepository.addressModel.find();
		return addresses;
	}

	public async getUserAddress(userId): Promise<AddressDocument[]> {
		const userAddresses = await this.addressRepository.addressModel
			.find({
				user: userId,
			})
			.populate('user');

		return userAddresses;
	}

	public async getAddressById(addressId: string): Promise<AddressDocument> {
		const address = await this.addressRepository.addressModel
			.findById(addressId)
			.populate('user');

		if (!address) {
			throw new BadRequestException('Endereço não encontrado.');
		}

		return address;
	}

	public async deleteAddress(addressId: string): Promise<void> {
		await this.addressRepository.addressModel.findByIdAndDelete(addressId);
	}
}

import {
	Body,
	Controller,
	Delete,
	Get,
	HttpStatus,
	Param,
	Post,
	Res,
	UseGuards,
} from '@nestjs/common';
import { Response } from 'express';

import { hasRoles } from '@src/auth/decorators/roles.decorator';
import { UserRole } from '@src/common/enums/user-role.enum';
import { AddressService } from './address.service';
import { User } from '@src/common/decorators/user.decorator';
import { AuthGuard } from '@src/auth/guards/auth.guard';
import { RolesGuard } from '@src/auth/guards/roles.guard';
import { Address } from '@src/database/schemas/address.schema';
import { Types } from 'mongoose';

@Controller('addresses')
@UseGuards(AuthGuard, RolesGuard)
export class AddressController {
	constructor(private addressService: AddressService) {}

	@Post()
	@hasRoles(UserRole.ADMIN, UserRole.CUSTOMER)
	public async createAddress(
		@Body() body: Address,
		@User() user,
		@Res() res: Response,
	) {
		const { id } = user;
		body = Object.assign(body, { user: Types.ObjectId(id) });

		const address = await this.addressService.createAddress(id, body);
		return res.status(HttpStatus.OK).json(address);
	}

	@Get()
	@hasRoles(UserRole.ADMIN)
	public async getAddresses(@Res() res: Response) {
		const address = await this.addressService.getAddresses();
		return res.status(HttpStatus.OK).json(address);
	}

	@Get('user')
	@hasRoles(UserRole.ADMIN, UserRole.CUSTOMER)
	public async getUserAddresses(@User() user, @Res() res: Response) {
		const address = await this.addressService.getUserAddress(user.id);
		return res.status(HttpStatus.OK).json(address);
	}

	@Get(':addressId')
	@hasRoles(UserRole.ADMIN, UserRole.CUSTOMER)
	public async getAddressById(
		@Param('addressId') addressId: string,
		@Res() res: Response,
	) {
		const address = await this.addressService.getAddressById(addressId);
		return res.status(HttpStatus.OK).json(address);
	}

	@Delete('delete/:addressId')
	@hasRoles(UserRole.ADMIN)
	public async deleteAddress(
		@Param('addressId') addressId: string,
		@Res() res: Response,
	) {
		await this.addressService.deleteAddress(addressId);
		return res.status(HttpStatus.OK).json({ message: 'Address deleted' });
	}
}

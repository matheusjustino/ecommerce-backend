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
import {
	ApiBody,
	ApiOkResponse,
	ApiOperation,
	ApiParam,
	ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { Types } from 'mongoose';

import { hasRoles } from '@src/auth/decorators/roles.decorator';
import { UserRole } from '@src/common/enums/user-role.enum';
import { AddressService } from './address.service';
import { User } from '@src/common/decorators/user.decorator';
import { AuthGuard } from '@src/auth/guards/auth.guard';
import { RolesGuard } from '@src/auth/guards/roles.guard';
import { Address } from '@src/database/schemas/address.schema';

@ApiTags('Address')
@Controller('addresses')
@UseGuards(AuthGuard, RolesGuard)
export class AddressController {
	constructor(private addressService: AddressService) {}

	@Post()
	@hasRoles(UserRole.ADMIN, UserRole.CUSTOMER)
	@ApiBody({ type: Address })
	@ApiOkResponse({ type: Address })
	@ApiOperation({ description: 'Cria um endereço.' })
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
	@ApiOkResponse({ type: [Address] })
	@ApiOperation({ description: 'Lista os endereços.' })
	public async getAddresses(@Res() res: Response) {
		const address = await this.addressService.getAddresses();
		return res.status(HttpStatus.OK).json(address);
	}

	@Get('user')
	@hasRoles(UserRole.ADMIN, UserRole.CUSTOMER)
	@ApiOkResponse({ type: [Address] })
	@ApiOperation({ description: 'Lista os endereços de um usuário.' })
	public async getUserAddresses(@User() user, @Res() res: Response) {
		const address = await this.addressService.getUserAddress(user.id);
		return res.status(HttpStatus.OK).json(address);
	}

	@Get(':addressId')
	@hasRoles(UserRole.ADMIN, UserRole.CUSTOMER)
	@ApiParam({
		name: 'addressId',
		description: 'Deve ser passado o Id do address',
	})
	@ApiOkResponse({ type: Address })
	@ApiOperation({ description: 'Busca um endereço por meio do seu Id.' })
	public async getAddressById(
		@Param('addressId') addressId: string,
		@Res() res: Response,
	) {
		const address = await this.addressService.getAddressById(addressId);
		return res.status(HttpStatus.OK).json(address);
	}

	@Delete('delete/:addressId')
	@hasRoles(UserRole.ADMIN)
	@ApiParam({
		name: 'addressId',
		description: 'Deve ser passado o Id do address',
	})
	@ApiOkResponse({ type: Object })
	@ApiOperation({ description: 'Deleta um endereço.' })
	public async deleteAddress(
		@Param('addressId') addressId: string,
		@Res() res: Response,
	) {
		await this.addressService.deleteAddress(addressId);
		return res.status(HttpStatus.OK).json({ message: 'Address deleted' });
	}
}

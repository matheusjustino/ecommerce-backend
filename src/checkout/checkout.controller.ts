import {
	Controller,
	Post,
	Res,
	Body,
	HttpStatus,
	Put,
	Param,
	Inject,
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

// CART
import {
	CartModel,
	SetBillingShippingAddressesModel,
	SetShippingMethod,
	SetShippingMethodBody,
} from '@shared/src/cart/cartModel';

// CHECKOUT
import {
	ICheckoutService,
	CHECKOUT_SERVICE,
} from '@shared/src/checkout/checkoutService.interface';
// GUARDS
import { RolesGuard } from '@src/auth/guards/roles.guard';
import { AuthGuard } from '@src/auth/guards/auth.guard';

import { UserRole } from '@src/common/enums/user-role.enum';
import { hasRoles } from '@src/auth/decorators/roles.decorator';

@ApiTags('Checkouts')
@Controller('checkouts')
@UseGuards(AuthGuard, RolesGuard)
export class CheckoutController {
	constructor(
		@Inject(CHECKOUT_SERVICE)
		private readonly checkoutService: ICheckoutService,
	) {}

	@Put('set-addresses/:cartId')
	@hasRoles(UserRole.ADMIN, UserRole.CUSTOMER)
	@ApiParam({ name: 'cartId', description: 'Deve ser passado o Id do Cart' })
	@ApiBody({ type: SetBillingShippingAddressesModel })
	@ApiOkResponse({ type: CartModel })
	@ApiOperation({ description: 'Atualiza o endereço de cobrança.' })
	public async setBillingShippingAddress(
		@Param('cartId') cartId: string,
		@Body() body: SetBillingShippingAddressesModel,
		@Res() res: Response,
	) {
		const cart = await this.checkoutService.setBillingShippingAddress(
			cartId,
			body.billing,
			body.shipping,
		);
		return res.status(HttpStatus.OK).json(cart);
	}

	@Put('set-shipping-method/:cartId')
	@hasRoles(UserRole.ADMIN, UserRole.CUSTOMER)
	@ApiParam({ name: 'cartId', description: 'Deve ser passado o Id do Cart' })
	@ApiBody({ type: SetShippingMethodBody })
	@ApiOkResponse({ type: CartModel })
	@ApiOperation({ description: 'Atualiza o envio de cobrança.' })
	public async setShippingMethod(
		@Param('cartId') cartId: string,
		@Body() body: SetShippingMethodBody,
		@Res() res: Response,
	) {
		const data: SetShippingMethod = {
			cartId,
			...body,
		};
		const cart = await this.checkoutService.setShippingMethod(data);
		return res.status(HttpStatus.OK).json(cart);
	}

	@Post('calculate-shipping')
	@hasRoles(UserRole.ADMIN, UserRole.CUSTOMER)
	@ApiBody({ type: SetShippingMethodBody })
	@ApiOkResponse({ type: CartModel })
	@ApiOperation({ description: 'Calcula o shipping.' })
	public async calculateShipping(
		@Body() body: SetShippingMethodBody,
		@Res() res: Response,
	) {
		const cart = await this.checkoutService.calculateShipping(body);
		return res.status(HttpStatus.OK).json(cart);
	}

	@Post('calculate-shipping-deadline')
	@hasRoles(UserRole.ADMIN, UserRole.CUSTOMER)
	@ApiBody({ type: SetShippingMethodBody })
	@ApiOkResponse({ type: CartModel })
	@ApiOperation({ description: 'Calcula o shipping e a dead line.' })
	public async calculateShippingAndDeadline(
		@Body() body: SetShippingMethodBody,
		@Res() res: Response,
	) {
		const cart = await this.checkoutService.calculateShippingAndDeadline(
			body,
		);
		return res.status(HttpStatus.OK).json(cart);
	}
}

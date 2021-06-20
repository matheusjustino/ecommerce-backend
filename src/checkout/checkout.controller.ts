import { Controller, Post, Res, Body, HttpStatus, Put, Param, Inject, UseGuards } from '@nestjs/common';
import { Response } from 'express';

// CART
import { SetShippingMethod, SetShippingMethodBody } from '@shared/src/cart/cartModel';

// CHECKOUT
import { ICheckoutService, CHECKOUT_SERVICE } from '@shared/src/checkout/checkoutService.interface';
import { BillingAddressModel, ShippingAddressModel } from '@shared/src/checkout/checkoutModel';
import { AuthGuard } from '@src/auth/guards/auth.guard';

@Controller('checkouts')
@UseGuards(AuthGuard)
export class CheckoutController {
	constructor(
		@Inject(CHECKOUT_SERVICE)
		private readonly checkoutService: ICheckoutService
	) {}

	@Put('set-addresses/:cartId')
	public async setBillingShippingAddress(
		@Param('cartId') cartId: string,
		@Body() body: { billing: BillingAddressModel, shipping: ShippingAddressModel },
		@Res() res: Response
	) {
		const cart = await this.checkoutService.setBillingShippingAddress(cartId, body.billing, body.shipping);
		return res.status(HttpStatus.OK).json(cart);
	}

	@Put('set-shipping-method/:cartId')
	public async setShippingMethod(@Param('cartId') cartId: string, @Body() body: SetShippingMethodBody, @Res() res: Response) {
		const data: SetShippingMethod = {
			cartId,
			...body
		};
		const cart = await this.checkoutService.setShippingMethod(data);
		return res.status(HttpStatus.OK).json(cart);
	}

	@Post('calculate-shipping')
	public async calculateShipping(@Body() body: SetShippingMethodBody, @Res() res: Response) {
		const cart = await this.checkoutService.calculateShipping(body);
		return res.status(HttpStatus.OK).json(cart);
	}

	@Post('calculate-shipping-deadline')
	public async calculateShippingAndDeadline(@Body() body: SetShippingMethodBody, @Res() res: Response) {
		const cart = await this.checkoutService.calculateShippingAndDeadline(body);
		return res.status(HttpStatus.OK).json(cart);
	}
}

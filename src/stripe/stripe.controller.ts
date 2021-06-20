import { Body, Controller, Post, Res, UseGuards, HttpStatus, Inject, Get } from '@nestjs/common';

import { AuthGuard } from '@src/auth/guards/auth.guard';

import { IStripeService, STRIPE_SERVICE } from '@shared/src/stripe/stripe.service';
import { ChargeCustomerModel, CreateCardTokenModel } from '@shared/src/stripe/stripeModel';

import { User } from '@src/common/decorators/user.decorator';

@Controller('stripe')
@UseGuards(AuthGuard)
export class StripeController {
	constructor(
		@Inject(STRIPE_SERVICE)
		private readonly stripeService: IStripeService
	) {}

	@Post('charge/card')
	public async createChargeWithCreditCard(@Body() body: ChargeCustomerModel, @Res() res) {
		const charge = await this.stripeService.chargeWithCreditCard(body, 'cus_JhbzhTpMYKsjXE');
		return res.status(HttpStatus.OK).json(charge);
	}

	@Get('charges/mine')
	public async getCustomerCharges(@User() user, @Res() res) {
		const customerCharges = await this.stripeService.getCustomerCharges(user.stripeCustomerId);
		return res.status(HttpStatus.OK).json(customerCharges);
	}

	@Post('card-to-customer')
	public async createAndAddCardToCustomer(@Body() body: CreateCardTokenModel, @Res() res) {
		const customerCardToken = await this.stripeService.createAndAddCardToCustomer(body, 'cus_JhbzhTpMYKsjXE');
		return res.status(HttpStatus.OK).json(customerCardToken);
	}

	@Get('cards/mine')
	public async getCustomerCards(@User() user, @Res() res) {
		const customerCards = await this.stripeService.getCustomerCards(user.stripeCustomerId);
		return res.status(HttpStatus.OK).json(customerCards);
	}
}

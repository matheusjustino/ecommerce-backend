import { Body, Controller, Post, Res, UseGuards, HttpStatus, Inject, Get } from '@nestjs/common';

// GUARDS
import { AuthGuard } from '@src/auth/guards/auth.guard';
import { RolesGuard } from '@src/auth/guards/roles.guard';

// SERVICES INTERFACE
import { IStripeService, STRIPE_SERVICE } from '@shared/src/stripe/stripe.service';

// MODELS
import { ChargeCustomerModel, CreateCardTokenModel } from '@shared/src/stripe/stripeModel';

import { User } from '@src/common/decorators/user.decorator';
import { UserRole } from '@src/common/enums/user-role.enum';
import { hasRoles } from '@src/auth/decorators/roles.decorator';

@Controller('stripe')
@UseGuards(AuthGuard, RolesGuard)
export class StripeController {
	constructor(
		@Inject(STRIPE_SERVICE)
		private readonly stripeService: IStripeService
	) {}

	@Post('charge/card')
	@hasRoles(UserRole.ADMIN)
	public async createChargeWithCreditCard(@Body() body: ChargeCustomerModel, @User() user, @Res() res) {
		const charge = await this.stripeService.chargeWithCreditCard(body, user.stripeCustomerId);
		return res.status(HttpStatus.OK).json(charge);
	}

	@Get('charges/mine')
	@hasRoles(UserRole.ADMIN)
	public async getCustomerCharges(@User() user, @Res() res) {
		const customerCharges = await this.stripeService.getCustomerCharges(user.stripeCustomerId);
		return res.status(HttpStatus.OK).json(customerCharges);
	}

	@Post('card-to-customer')
	@hasRoles(UserRole.ADMIN)
	public async createAndAddCardToCustomer(@Body() body: CreateCardTokenModel, @User() user, @Res() res) {
		const customerCardToken = await this.stripeService.createAndAddCardToCustomer(body, user.stripeCustomerId);
		return res.status(HttpStatus.OK).json(customerCardToken);
	}

	@Get('cards/mine')
	@hasRoles(UserRole.ADMIN)
	public async getCustomerCards(@User() user, @Res() res) {
		const customerCards = await this.stripeService.getCustomerCards(user.stripeCustomerId);
		return res.status(HttpStatus.OK).json(customerCards);
	}
}

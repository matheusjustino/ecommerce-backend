import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

// SERVICES INTERFACES
import { IStripeService } from '@shared/src/stripe/stripe.service';

// SERVICES
import { ChargeCustomerModel, CreateCardTokenModel } from '@shared/src/stripe/stripeModel';

// MODELS
import { AppConfigService } from '@src/app-config/app-config.service';

@Injectable()
export class StripeService implements IStripeService {
	private stripe: Stripe;

	constructor(
		private readonly appConfigService: AppConfigService
	) {
		this.stripe = new Stripe(this.appConfigService.stripeSecretKey, {
			apiVersion: '2020-08-27',
			typescript: true
		});
	}

	public async createCustomer(name: string, email: string): Promise<Stripe.Response<Stripe.Customer>> {
		return await this.stripe.customers.create({
			name,
			email
		});
	}

	public async createAndAddCardToCustomer(createCard: CreateCardTokenModel, stripeCustomerId: string): Promise<Stripe.Response<Stripe.CustomerSource>> {
		const cardToken = await this.createCardToken(createCard);
		const addCardTokenToCustomer = await this.addCardTokenToCustomer(stripeCustomerId, cardToken.id);
		return addCardTokenToCustomer;
	}

	public async chargeWithCreditCard(body: ChargeCustomerModel, stripeCustomerId: string): Promise<Stripe.Response<Stripe.PaymentIntent>> {
		if (body.hasOwnProperty('source')) {
			const paramsToCharge = {
				amount: body.amount,
				description: 'Teste pagamento',
				customer: stripeCustomerId,
				source: body.source,
				currency: this.appConfigService.stripeCurrency,
				confirm: true,
			};

			return await this.stripe.paymentIntents.create(paramsToCharge);
		} else {
			const paramsToCharge = {
				type: body.payment_method.type,
				card: body.payment_method.card,
				billing_details: body.payment_method.billing_details
			}
			const stripePaymentMethod = await this.stripe.paymentMethods.create(paramsToCharge);

			return await this.stripe.paymentIntents.create({
				amount: body.amount,
				description: 'Billing no pagamento',
				customer: stripeCustomerId,
				payment_method: stripePaymentMethod.id,
				currency: this.appConfigService.stripeCurrency,
				confirm: true,
			});
		}
	}

	public async getCustomerCharges(stripeCustomerId: string): Promise<Stripe.Response<Stripe.ApiList<Stripe.Charge>>> {
		const params = {
			customer: stripeCustomerId
		};
		return await this.stripe.charges.list(params);
	}

	public async getCustomerCards(stripeCustomerId: string): Promise<Stripe.Response<Stripe.ApiList<Stripe.CustomerSource>>> {
		const params = {};
		return await this.stripe.customers.listSources(stripeCustomerId, params);
	}

	private async createCardToken({ card, billing }: CreateCardTokenModel) {
		const params = {
			card,
			billing
		};

		const cardToken = await this.stripe.tokens.create(params);
		return cardToken;
	}

	private async addCardTokenToCustomer(stripeCustomerId: string, tokenId: string) {
		const params = {
			source: tokenId
		};

		const cardTokenToCustomer = await this.stripe.customers.createSource(stripeCustomerId, params);
		return cardTokenToCustomer;
	}
}

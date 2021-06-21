import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

// SERVICES INTERFACES
import { IStripeService } from '@shared/src/stripe/stripe.service';

// SERVICES
import {
	ChargeCustomerModel,
	CreateCardTokenModel,
	RefundCustomerChargeModel,
} from '@shared/src/stripe/stripeModel';

// MODELS
import { AppConfigService } from '@src/app-config/app-config.service';

@Injectable()
export class StripeService implements IStripeService {
	private Stripe: Stripe;

	constructor(private readonly appConfigService: AppConfigService) {
		this.Stripe = new Stripe(this.appConfigService.stripeSecretKey, {
			apiVersion: '2020-08-27',
			typescript: true,
		});
	}

	public async createCustomer(
		name: string,
		email: string,
	): Promise<Stripe.Response<Stripe.Customer>> {
		return await this.Stripe.customers.create({
			name,
			email,
		});
	}

	public async createAndAddCardToCustomer(
		createCard: CreateCardTokenModel,
		stripeCustomerId: string,
	): Promise<Stripe.Response<Stripe.CustomerSource>> {
		const cardToken = await this.createCardToken(createCard);
		const addCardTokenToCustomer = await this.addCardTokenToCustomer(
			stripeCustomerId,
			cardToken.id,
		);
		return addCardTokenToCustomer;
	}

	public async chargeWithCreditCard(
		body: ChargeCustomerModel,
		stripeCustomerId: string,
	): Promise<Stripe.Response<Stripe.PaymentIntent>> {
		if (body.hasOwnProperty('source')) {
			const paramsToCharge = {
				amount: body.amount,
				description: 'Teste pagamento',
				customer: stripeCustomerId,
				source: body.source,
				currency: this.appConfigService.stripeCurrency,
				confirm: true,
			};

			return await this.Stripe.paymentIntents.create(paramsToCharge);
		} else {
			const paramsToCharge = {
				type: body.payment_method.type,
				card: body.payment_method.card,
				billing_details: body.payment_method.billing_details,
			};
			const stripePaymentMethod = await this.Stripe.paymentMethods.create(
				paramsToCharge,
			);

			return await this.Stripe.paymentIntents.create({
				amount: body.amount,
				description: 'Billing no pagamento',
				customer: stripeCustomerId,
				payment_method: stripePaymentMethod.id,
				currency: this.appConfigService.stripeCurrency,
				confirm: true,
			});
		}
	}

	public async chargeWithCreditCardAndInstallments(
		data,
		stripeCustomerId: string,
	) {
		const paramsToCharge = {
			type: data.payment_method.type,
			card: data.payment_method.card,
			billing_details: data.payment_method.billing_details,
		};
		const stripePaymentMethod = await this.Stripe.paymentMethods.create(
			paramsToCharge,
		);

		// const date = new Date();
		// const stripeSubscription = await this.Stripe.subscriptions.create({
		// 	customer: stripeCustomerId,
		// 	cancel_at: Math.floor(date.setMonth(date.getMonth() + 3) / 1000),
		// 	items: [
		// 		{
		// 			quantity: 1,
		// 			plan:
		// 		}
		// 	]
		// });

		const stripePaymentIntent = await this.Stripe.paymentIntents.create({
			amount: data.amount,
			customer: stripeCustomerId,
			currency: 'BRL',
			payment_method: stripePaymentMethod.id,
			off_session: true,
			confirm: true,
			payment_method_options: {
				card: {
					installments: {
						enabled: true,
						plan: {
							count: 1,
							interval: 'month',
							type: 'fixed_count',
						},
					},
					request_three_d_secure: 'automatic',
				},
			},
		});

		return stripePaymentIntent;
	}

	public async refundCustomerCharge({
		payment_intent,
		reason,
	}: RefundCustomerChargeModel): Promise<Stripe.Response<Stripe.Refund>> {
		const params = {
			payment_intent: payment_intent,
			reason,
		};

		return await this.Stripe.refunds.create(params);
	}

	public async getCustomerCharge({ stripeCustomerId, payment_intent }) {
		const params = {
			customer: stripeCustomerId,
			payment_intent: payment_intent,
		};

		return await this.Stripe.charges.list(params);
	}

	public async getCustomerCharges(
		stripeCustomerId: string,
	): Promise<Stripe.Response<Stripe.ApiList<Stripe.Charge>>> {
		const params = {
			customer: stripeCustomerId,
		};
		return await this.Stripe.charges.list(params);
	}

	public async getCustomerCards(
		stripeCustomerId: string,
	): Promise<Stripe.Response<Stripe.ApiList<Stripe.CustomerSource>>> {
		const params = {};
		return await this.Stripe.customers.listSources(
			stripeCustomerId,
			params,
		);
	}

	private async createCardToken({ card, billing }: CreateCardTokenModel) {
		const params = {
			card,
			billing,
		};

		const cardToken = await this.Stripe.tokens.create(params);
		return cardToken;
	}

	private async addCardTokenToCustomer(
		stripeCustomerId: string,
		tokenId: string,
	) {
		const params = {
			source: tokenId,
		};

		const cardTokenToCustomer = await this.Stripe.customers.createSource(
			stripeCustomerId,
			params,
		);
		return cardTokenToCustomer;
	}
}

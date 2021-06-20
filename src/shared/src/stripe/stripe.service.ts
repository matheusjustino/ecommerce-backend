import Stripe from 'stripe';

import { ChargeCustomerModel, CreateCardTokenModel } from './stripeModel';

export const STRIPE_SERVICE = 'STRIPE_SERVICE';

export interface IStripeService {
	createCustomer(name: string, email: string): Promise<Stripe.Response<Stripe.Customer>>;
	createAndAddCardToCustomer(createCard: CreateCardTokenModel, stripeCustomerId: string): Promise<Stripe.Response<Stripe.CustomerSource>>;
	chargeWithCreditCard(body: ChargeCustomerModel, stripeCustomerId: string): Promise<Stripe.Response<Stripe.PaymentIntent>>;
	getCustomerCharges(stripeCustomerId: string): Promise<Stripe.Response<Stripe.ApiList<Stripe.Charge>>>;
	getCustomerCards(stripeCustomerId: string): Promise<Stripe.Response<Stripe.ApiList<Stripe.CustomerSource>>>;
}

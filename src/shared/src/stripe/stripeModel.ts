export class CardModel {
	public number: string;
	public cvc: string;
}

export class CardToCreateTokenCardModel extends CardModel {
	public exp_year: string;
	public exp_month: string;
}

export class BillingToCreateTokenCardModel {
	public address_city: string;
	public address_line1: string;
	public address_country: string;
	public address_zip: string;
	public address_state: string;
	public name: string;
}

export class CreateCardTokenModel {
	public card: CardToCreateTokenCardModel;
	public billing?: BillingToCreateTokenCardModel;
}

export class CardToChangeCustomerModel extends CardModel {
	public exp_year: number;
	public exp_month: number;
}

export class BillingToChargeCustomerModel {
	public address: {
		city: string;
		line1: string;
		country: string;
		postal_code: string;
		state: string;
	};
	public name: string;
	public phone: string;
	public email: string;
}

export class PaymentMethodToChargeCustomerModel {
	public type: any;
	public card: CardToChangeCustomerModel;
	public billing_details?: BillingToChargeCustomerModel;
}

export class ChargeCustomerModel {
	public amount: number;
	public customer: string;
	public source?: string;
	public payment_method?: PaymentMethodToChargeCustomerModel;
}

export class RefundCustomerChargeModel {
	public payment_intent: string;
	public reason?: 'duplicate' | 'fraudulent' | 'requested_by_customer';
}

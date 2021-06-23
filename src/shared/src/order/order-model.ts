import {
	IsArray,
	IsBoolean,
	IsEmail,
	IsNotEmpty,
	IsNumber,
	IsObject,
	IsOptional,
	IsString,
	ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { User, UserDocument } from '@src/database/schemas/user.schema';
import { ShippingMethod } from '../cart/cartModel';
import {
	BillingAddressModel,
	ShippingAddressModel,
} from '../checkout/checkoutModel';
import { PaymentMethodToChargeCustomerModel } from '../stripe/stripeModel';

export class PaymentChargesBillingDetailsAddressModel {
	@IsString()
	@IsNotEmpty()
	public city: string;

	@IsString()
	@IsNotEmpty()
	public country: string;

	@IsString()
	@IsNotEmpty()
	public line1: string;

	@IsString()
	@IsNotEmpty()
	public line2: string;

	@IsString()
	@IsNotEmpty()
	public postal_code: string;

	@IsString()
	@IsNotEmpty()
	public state: string;

	constructor() {
		this.city = '';
		this.country = '';
		this.line1 = '';
		this.line2 = '';
		this.postal_code = '';
		this.state = '';
	}
}

export class PaymentSource {
	@IsString()
	@IsNotEmpty()
	public id: string;

	@IsString()
	@IsNotEmpty()
	public object: string;

	@IsString()
	@IsNotEmpty()
	public address_city: string;

	@IsString()
	@IsNotEmpty()
	public address_country: string;

	@IsString()
	@IsNotEmpty()
	public address_line1: string;

	@IsString()
	@IsNotEmpty()
	public address_line1_check: string;

	@IsString()
	@IsNotEmpty()
	public address_line2: string;

	@IsString()
	@IsNotEmpty()
	public address_state: string;

	@IsString()
	@IsNotEmpty()
	public address_zip: string;

	@IsString()
	@IsNotEmpty()
	public address_zip_check: string;

	@IsString()
	@IsNotEmpty()
	public brand: string;

	@IsString()
	@IsNotEmpty()
	public country: string;

	@IsString()
	@IsNotEmpty()
	public customer: string;

	@IsString()
	@IsNotEmpty()
	public cvc_check;

	@IsNotEmpty()
	public dynamic_last4string;

	@IsNumber()
	@IsNotEmpty()
	public exp_month: number;

	@IsNumber()
	@IsNotEmpty()
	public exp_year: number;

	@IsString()
	@IsNotEmpty()
	public fingerprint: string;

	@IsString()
	@IsNotEmpty()
	public funding: string;

	@IsString()
	@IsNotEmpty()
	public last4: string;

	@IsString()
	@IsNotEmpty()
	public name: string;

	@IsString()
	@IsNotEmpty()
	public status: string;

	constructor() {
		this.id = '';
		this.object = '';
		this.address_city = '';
		this.address_country = '';
		this.address_line1 = '';
		this.address_line1_check = '';
		this.address_line2 = '';
		this.address_state = '';
		this.address_zip = '';
		this.address_zip_check = '';
		this.brand = '';
		this.country = '';
		this.customer = '';
		this.cvc_check = '';
		this.dynamic_last4string = '';
		this.exp_month = null;
		this.exp_year = null;
		this.fingerprint = '';
		this.funding = '';
		this.last4 = '';
		this.name = '';
		this.status = '';
	}
}

export class PaymentMethodDetails {
	@IsObject()
	@IsNotEmpty()
	public card: {
		brand: string;
		checks: {
			address_line1_check: string;
			address_postal_code_check: string;
			cvc_check;
		};
		country: string;
		exp_month: number;
		exp_year: number;
		fingerprint: string;
		funding: string;
		installments;
		last4: string;
	};

	@IsString()
	@IsNotEmpty()
	public type: string;

	constructor() {
		this.card = {
			brand: '',
			checks: {
				address_line1_check: '',
				address_postal_code_check: '',
				cvc_check: null,
			},
			country: '',
			exp_month: null,
			exp_year: null,
			fingerprint: '',
			funding: '',
			installments: null,
			last4: '',
		};
		this.type = '';
	}
}

export class PaymentChargesBillingDetailsModel {
	@Type(() => PaymentChargesBillingDetailsAddressModel)
	@ValidateNested({ each: true })
	@IsNotEmpty()
	public address: PaymentChargesBillingDetailsAddressModel;

	@IsString()
	@IsEmail()
	@IsNotEmpty()
	public email: string;

	@IsString()
	@IsNotEmpty()
	public name: string;

	@IsString()
	@IsNotEmpty()
	public phone: string;

	constructor() {
		this.address = new PaymentChargesBillingDetailsAddressModel();
		this.email = '';
		this.name = '';
		this.phone = '';
	}
}

export class PaymentChargesModel {
	@IsString()
	@IsNotEmpty()
	public id: string;

	@IsNumber()
	@IsNotEmpty()
	public amount: number;

	@IsNumber()
	@IsNotEmpty()
	public amount_captured: number;

	@IsNumber()
	@IsNotEmpty()
	public amount_refunded: number;

	@IsString()
	@IsNotEmpty()
	public balance_transaction: string;

	@Type(() => PaymentChargesBillingDetailsModel)
	@ValidateNested({ each: true })
	@IsNotEmpty()
	public billing_details: PaymentChargesBillingDetailsModel;

	@IsBoolean()
	@IsNotEmpty()
	public captured: boolean;

	@IsString()
	@IsNotEmpty()
	public currency: string;

	@IsString()
	@IsNotEmpty()
	public customer: string;

	@IsString()
	@IsNotEmpty()
	public description: string;

	@IsNumber()
	@IsNotEmpty()
	public failure_code: number;

	@IsString()
	@IsNotEmpty()
	public failure_message: string;

	@IsObject()
	@IsNotEmpty()
	public fraud_details: {};

	@IsBoolean()
	@IsNotEmpty()
	public paid: boolean;

	@IsString()
	@IsNotEmpty()
	public payment_intent: string;

	@IsString()
	@IsNotEmpty()
	public payment_method: string;

	@Type(() => PaymentMethodDetails)
	@ValidateNested({ each: true })
	@IsNotEmpty()
	public payment_method_details: PaymentMethodDetails;

	@IsString()
	@IsNotEmpty()
	public receipt_url: string;

	@IsBoolean()
	@IsNotEmpty()
	public refunded: boolean;

	@IsObject()
	@IsNotEmpty()
	public refunds: {};

	@Type(() => PaymentSource)
	@ValidateNested({ each: true })
	@IsNotEmpty()
	public source: PaymentSource;

	constructor() {
		this.id = '';
		this.amount = 0;
		this.amount_captured = 0;
		this.amount_refunded = 0;
		this.balance_transaction = '';
		this.billing_details = new PaymentChargesBillingDetailsModel();
		this.captured = false;
		this.currency = '';
		this.customer = '';
		this.description = '';
		this.failure_code = 0;
		this.failure_message = '';
		this.fraud_details = {};
		this.paid = false;
		this.payment_intent = '';
		this.payment_method = '';
		this.payment_method_details = new PaymentMethodDetails();
		this.receipt_url = '';
		this.refunded = false;
		this.refunds = {};
		this.source = new PaymentSource();
	}
}

export class PaymentModel {
	@IsString()
	@IsOptional()
	public id?: string;

	@IsString()
	@IsNotEmpty()
	public status: string;

	@IsString()
	@IsNotEmpty()
	public stripChargeId: string;

	@IsNumber()
	@IsNotEmpty()
	public amount: number;
	public amount_capturable: number;

	@IsNumber()
	@IsNotEmpty()
	public amount_received: number;
	public canceled_at;
	public cancellation_reason;

	@IsString()
	@IsNotEmpty()
	public capture_method: string;

	@Type(() => PaymentChargesModel)
	@ValidateNested({ each: true })
	@IsNotEmpty()
	public charges: PaymentChargesModel;
}

export class OrderModel {
	@Type(() => User)
	@ValidateNested({ each: true })
	@IsNotEmpty()
	public user: UserDocument;

	@IsNumber()
	@IsNotEmpty()
	public total: number;

	@IsNumber()
	@IsNotEmpty()
	public quantity: number;

	@IsString()
	@IsNotEmpty()
	public status: string;

	@Type(() => ShippingMethod)
	@ValidateNested({ each: true })
	@IsNotEmpty()
	public shippingMethod: ShippingMethod;

	@Type(() => BillingAddressModel)
	@ValidateNested({ each: true })
	@IsNotEmpty()
	public billingAddress: BillingAddressModel;

	@Type(() => ShippingAddressModel)
	@ValidateNested({ each: true })
	@IsNotEmpty()
	public shippingAddress: ShippingAddressModel;

	@Type(() => OrderItemModel)
	@ValidateNested({ each: true })
	@IsNotEmpty()
	public items: OrderItemModel[];

	@Type(() => PaymentModel)
	@ValidateNested({ each: true })
	@IsNotEmpty()
	public payment: PaymentModel;
}

export class OrderItemModel {
	@IsString()
	@IsNotEmpty()
	public productId: string;

	@IsString()
	@IsNotEmpty()
	public productName: string;

	@IsNumber()
	@IsNotEmpty()
	public quantity: number;

	@IsNumber()
	@IsNotEmpty()
	public price: number;

	@IsArray()
	public attributes: [];
}

export class CreateOrderBodyModel {
	@IsString()
	@IsNotEmpty()
	public cartId: string;

	@IsString()
	@IsOptional()
	public source?: string;

	@Type(() => PaymentMethodToChargeCustomerModel)
	@ValidateNested({ each: true })
	@IsOptional()
	public payment_method?: PaymentMethodToChargeCustomerModel;
}

export class RefundChargeBodyModel {
	@IsString()
	@IsNotEmpty()
	public orderId: string;

	@IsString()
	@IsNotEmpty()
	public payment_intent: string;

	@IsString()
	@IsOptional()
	public reason?: string;
}

export class RefundOrderModel extends RefundChargeBodyModel {
	@IsString()
	@IsNotEmpty()
	public stripeCustomerId: string;
}

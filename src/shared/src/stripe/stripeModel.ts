import { Type } from 'class-transformer';
import {
	IsEmail,
	IsNotEmpty,
	IsNumber,
	IsObject,
	IsOptional,
	IsString,
	ValidateNested,
} from 'class-validator';

export class CardModel {
	@IsString()
	@IsNotEmpty()
	public number: string;

	@IsString()
	@IsNotEmpty()
	public cvc: string;
}

export class CardToCreateTokenCardModel extends CardModel {
	@IsString()
	@IsNotEmpty()
	public exp_year: string;

	@IsString()
	@IsNotEmpty()
	public exp_month: string;
}

export class BillingToCreateTokenCardModel {
	@IsString()
	@IsNotEmpty()
	public address_city: string;

	@IsString()
	@IsNotEmpty()
	public address_line1: string;

	@IsString()
	@IsNotEmpty()
	public address_country: string;

	@IsString()
	@IsNotEmpty()
	public address_zip: string;

	@IsString()
	@IsNotEmpty()
	public address_state: string;

	@IsString()
	@IsNotEmpty()
	public name: string;
}

export class CreateCardTokenModel {
	@Type(() => CardToCreateTokenCardModel)
	@ValidateNested({ each: true })
	@IsNotEmpty()
	public card: CardToCreateTokenCardModel;

	@Type(() => BillingToCreateTokenCardModel)
	@ValidateNested({ each: true })
	@IsOptional()
	public billing?: BillingToCreateTokenCardModel;
}

export class CardToChangeCustomerModel extends CardModel {
	@IsNumber()
	@IsNotEmpty()
	public exp_year: number;

	@IsNumber()
	@IsNotEmpty()
	public exp_month: number;
}

export class BillingToChargeCustomerModel {
	@IsObject()
	@IsOptional()
	public address?: {
		city: string;
		line1: string;
		country: string;
		postal_code: string;
		state: string;
	};

	@IsString()
	@IsOptional()
	public name?: string;

	@IsString()
	@IsOptional()
	public phone?: string;

	@IsString()
	@IsEmail()
	@IsOptional()
	public email?: string;
}

export class PaymentMethodToChargeCustomerModel {
	@IsNotEmpty()
	public type: any;

	@Type(() => CardToChangeCustomerModel)
	@ValidateNested({ each: true })
	@IsNotEmpty()
	public card: CardToChangeCustomerModel;

	@Type(() => BillingToChargeCustomerModel)
	@ValidateNested({ each: true })
	@IsOptional()
	public billing_details?: BillingToChargeCustomerModel;
}

export class ChargeCustomerModel {
	@IsNumber()
	@IsNotEmpty()
	public amount: number;

	@IsString()
	@IsNotEmpty()
	public customer: string;

	@IsString()
	@IsOptional()
	public source?: string;

	@Type(() => PaymentMethodToChargeCustomerModel)
	@ValidateNested({ each: true })
	@IsOptional()
	public payment_method?: PaymentMethodToChargeCustomerModel;
}

export class RefundCustomerChargeModel {
	@IsString()
	@IsNotEmpty()
	public payment_intent: string;

	@IsString()
	@IsOptional()
	public reason?: 'duplicate' | 'fraudulent' | 'requested_by_customer';
}

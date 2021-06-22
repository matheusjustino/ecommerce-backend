import {
	IsArray,
	IsEnum,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import {
	ShippingMethodCode,
	ShippingMethodCodeValidator,
} from '@src/common/enums/shipping-method-code.enum';
import {
	BillingAddressModel,
	ShippingAddressModel,
} from '../checkout/checkoutModel';
import { CalculateShippingAndDeadlineResponseModel } from '../correios/correiosModel';
import { UserModel } from '../database/schemas/userModel';

export class CartItemModel {
	@IsOptional()
	@IsOptional()
	public _id?: string;

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

export class CartModel {
	@IsOptional()
	@IsOptional()
	public id?: string;

	@Type(() => UserModel)
	@ValidateNested({ each: true })
	@IsNotEmpty()
	public user: UserModel;

	@Type(() => CartItemModel)
	@ValidateNested({ each: true })
	@IsNotEmpty()
	public items: CartItemModel[];

	@IsNumber()
	@IsNotEmpty()
	public total: number;

	@IsNumber()
	@IsNotEmpty()
	public quantity: number;

	@Type(() => ShippingMethod)
	@ValidateNested({ each: true })
	@IsNotEmpty()
	public shippingMethod: () => ShippingMethod;

	@Type(() => BillingAddressModel)
	@ValidateNested({ each: true })
	@IsNotEmpty()
	public billingAddress: BillingAddressModel;

	@Type(() => ShippingAddressModel)
	@ValidateNested({ each: true })
	@IsNotEmpty()
	public shippingAddress: ShippingAddressModel;
}

export class ShippingMethod extends CalculateShippingAndDeadlineResponseModel {
	@IsString()
	@IsNotEmpty()
	public Metodo: string;

	@IsString()
	@IsNotEmpty()
	public CepOrigem: string;

	@IsString()
	@IsNotEmpty()
	public CepDestino: string;
}

export class CartAddModel {
	@IsString()
	@IsNotEmpty()
	public productId: string;

	@IsString()
	@IsNumber()
	public quantity: number;
}

export class CartUpdateModel {
	@IsString()
	@IsNotEmpty()
	public cartItemId: string;

	@IsString()
	@IsNumber()
	public quantity: number;
}

export class CartRemoveModel {
	@IsString()
	@IsNotEmpty()
	public cartItemId: string;
}

export class SetShippingMethodBody {
	@IsString()
	@IsNotEmpty()
	public zip: string;

	@IsEnum(ShippingMethodCodeValidator, {
		message: `O método de envio deve ser SEDEX ou PAC`,
	})
	@IsNotEmpty()
	public shippingMethod: ShippingMethodCode;
}

export class SetShippingMethod extends SetShippingMethodBody {
	@IsString()
	@IsNotEmpty()
	public cartId: string;
}

export class SetBillingShippingAddressesModel {
	@Type(() => BillingAddressModel)
	@ValidateNested({ each: true })
	@IsNotEmpty()
	public billing: BillingAddressModel;

	@Type(() => ShippingAddressModel)
	@ValidateNested({ each: true })
	@IsNotEmpty()
	public shipping: ShippingAddressModel;
}

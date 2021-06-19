import { ShippingMethodCode } from "@src/common/enums/shipping-method-code.enum";
import { BillingAddressModel, ShippingAddressModel } from "../checkout/checkoutModel";
import { CalculateShippingAndDeadlineResponseModel } from "../correios/correiosModel";
import { UserModel } from "../database/schemas/userModel";

export class CartItemModel {
	public id?: string;
	public productId: string;
	public productName: string;
	public quantity: number;
	public price: number;
	public attributes: []
}

export class CartModel {
	public id?: string;
	public user: UserModel;
	public items: CartItemModel[];
	public total: number;
	public quantity: number;
	public shippingMethod: ShippingMethod;
	public billingAddress: BillingAddressModel;
	public shippingAddress: ShippingAddressModel;
}

export class ShippingMethod extends CalculateShippingAndDeadlineResponseModel {
	public Metodo: string;
	public CepOrigem: string;
	public CepDestino: string;
}

export class CartAddModel {
	public productId: string;
	public quantity: number;
}

export class CartUpdateModel {
	public cartItemId: string;
	public quantity: number;
}

export class CartRemoveModel {
	public cartItemId: string;
}

export class SetShippingMethodBody {
	public zip: string;
	public shippingMethod: ShippingMethodCode;
}

export class SetShippingMethod extends SetShippingMethodBody {
	public cartId: string;
}

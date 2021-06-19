import { CartDocument } from "@src/database/schemas/cart.schema";
import { SetShippingMethod, SetShippingMethodBody } from "../cart/cartModel";
import { CalculateShippingAndDeadlineResponseModel, CalculateShippingResponseModel } from "../correios/correiosModel";
import { BillingAddressModel, ShippingAddressModel } from "./checkoutModel";

export const CHECKOUT_SERVICE = 'CHECKOUT SERVICE';

export interface ICheckoutService {
	setBillingShippingAddress(cartId: string, billing: BillingAddressModel, shipping: ShippingAddressModel): Promise<CartDocument>;
	setShippingMethod(data: SetShippingMethod): Promise<CartDocument>;
	calculateShipping(shippingMethod: SetShippingMethodBody): Promise<CalculateShippingResponseModel[]>;
	calculateShippingAndDeadline(shippingMethod: SetShippingMethodBody): Promise<CalculateShippingAndDeadlineResponseModel[]>;
};

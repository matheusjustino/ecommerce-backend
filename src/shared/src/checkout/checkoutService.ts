export const CHECKOUT_SERVICE = 'CHECKOUT SERVICE';

export interface ICheckoutService {
	setPaymentMethod(cartId: string, data): any;
	listPaymentMethod(): any;
	calculateShipping(cartId: string, data): any;
}

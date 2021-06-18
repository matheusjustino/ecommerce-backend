import { CartDocument } from "@src/database/schemas/cart.schema";

export const CART_SERVICE = 'CART SERVICE';

export interface ICartService {
	createCart(userId: string): Promise<CartDocument>;
	getCarts(): Promise<CartDocument[]>;
	getUserCarts(userId: string): Promise<CartDocument[]>
	getCartById(cartId: string): Promise<CartDocument>
	addItemToCart(cartId: string, data): Promise<CartDocument>
	removeItemCart(cartId: string, data): Promise<CartDocument>
	deleteCart(cartId: string): Promise<CartDocument>
}

import { BadGatewayException, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';

// @SHARED
import { ICartService } from '@shared/src/cart/cartService.interface';

// REPOSITORIES
import { CartRepository } from '@src/database/repositories/cart.repository';
import { UserRepository } from '@src/database/repositories/user.repository';

// DOCUMENTS
import { CartDocument } from '@src/database/schemas/cart.schema';

@Injectable()
export class CartService implements ICartService {
	constructor(
		private readonly cartRepository: CartRepository,
		private readonly userRepository: UserRepository,
	) {}

	public async updateCart(cartId: string, data): Promise<CartDocument> {
		const cart = await this.cartRepository.cartModel.findByIdAndUpdate(
			cartId,
			{ $set: data },
			{ new: true },
		);
		return cart;
	}

	public async createCart(userId: string): Promise<CartDocument> {
		const user = await this.userRepository.userModel.findById(userId);

		if (!user) {
			throw new BadGatewayException('User not found');
		}

		const cart = new this.cartRepository.cartModel({
			user: Types.ObjectId(userId),
		});
		return await cart.save();
	}

	public async getCarts(): Promise<CartDocument[]> {
		const carts = await this.cartRepository.cartModel.find();
		return carts;
	}

	public async getUserCarts(userId): Promise<CartDocument[]> {
		const carts = await this.cartRepository.cartModel
			.find({ user: userId })
			.populate('user');

		return carts;
	}

	public async getCartById(
		cartId: string,
		populateUser?: boolean,
	): Promise<CartDocument> {
		const cart = await this.cartRepository.cartModel.findById(cartId);

		if (!cart) {
			throw new BadGatewayException('Cart not found');
		}

		return populateUser ? await cart.populate('user').execPopulate() : cart;
	}

	public async addItemToCart(cartId: string, data): Promise<CartDocument> {
		const cart = await this.cartRepository.cartModel.findById(cartId);

		if (!cart) {
			throw new BadGatewayException('Cart not found');
		}

		const itemCart = cart.items.find(
			(item) => item.productId === data.productId,
		);

		if (!itemCart) {
			cart.items.push(data);
			cart.quantity += data.quantity;
			cart.total += data.quantity * data.price;
		} else {
			for (let i = 0; i < cart.items.length; i++) {
				const cartItem = cart.items[i];

				if (cartItem.productId === data.productId) {
					cart.quantity += 1;
					cart.total += data.price;
					cartItem.quantity += 1;

					break;
				}
			}
		}

		return await cart.save();
	}

	public async removeItemCart(cartId: string, data): Promise<CartDocument> {
		const cart = await this.cartRepository.cartModel.findById(cartId);

		if (!cart) {
			throw new BadGatewayException('Cart not found');
		}

		const itemCart = cart.items.find(
			(item) => item.productId === data.productId,
		);

		if (!itemCart) {
			throw new BadGatewayException('Items do not exists in the cart');
		}

		for (let i = 0; i < cart.items.length; i++) {
			const cartItem = cart.items[i];

			if (cartItem.productId === data.productId) {
				if (cartItem.quantity > 1) {
					cart.quantity -= 1;
					cart.total -= data.price;
					cartItem.quantity -= 1;

					break;
				} else {
					cart.items.splice(i, 1);
					cart.quantity -= 1;
					cart.total -= data.price;
				}
			}
		}

		return await cart.save();
	}

	public async deleteCart(cartId: string): Promise<CartDocument> {
		const cart = await this.cartRepository.cartModel.findByIdAndDelete(
			cartId,
		);
		return cart;
	}
}

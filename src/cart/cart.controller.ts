import { Body, Controller, Delete, Get, HttpStatus, Inject, Param, Post, Res, UseGuards } from '@nestjs/common';

// @SHARED
import { CART_SERVICE, ICartService } from '@shared/src/cart/cartService.interface';

// GUARDS
import { AuthAuthGuard } from '@src/auth/guards/auth.guard';

// DECORATORS
import { User } from '@src/common/decorators/user.decorator';

@Controller('carts')
@UseGuards(AuthAuthGuard)
export class CartController {
	constructor(
		@Inject(CART_SERVICE)
		private readonly cartService: ICartService
	) {}

	@Post()
	public async createCart(@Body() body, @Res() res) {
		const cart = await this.cartService.createCart(body.userId);
		return res.status(HttpStatus.OK).json(cart);
	}

	@Post('add-item/:cartId')
	public async addItemToCart(@Param('cartId') cartId: string, @Body() data, @Res() res) {
		const cart = await this.cartService.addItemToCart(cartId, data);
		return res.status(HttpStatus.OK).json(cart);
	}

	@Post('remove-item/:cartId')
	public async removeItemCart(@Param('cartId') cartId: string, @Body() data, @Res() res) {
		const cart = await this.cartService.removeItemCart(cartId, data);
		return res.status(HttpStatus.OK).json(cart);
	}

	@Get()
	public async getCarts(@Res() res) {
		const carts = await this.cartService.getCarts();
		return res.status(HttpStatus.OK).json(carts);
	}

	@Get('user-carts')
	public async getUserCarts(@User() user, @Res() res) {
		const carts = await this.cartService.getUserCarts(user.id);
		return res.status(HttpStatus.OK).json(carts);
	}

	@Get(':cartId')
	public async getCartById(@Param('cartId') cartId: string, @Res() res) {
		const cart = await this.cartService.getCartById(cartId);
		return res.status(HttpStatus.OK).json(cart);
	}

	@Delete('delete-cart/:cartId')
	public async deleteCart(@Param('cartId') cartId: string, @Res() res) {
		const cart = await this.cartService.deleteCart(cartId);
		return res.status(HttpStatus.OK).json(cart);
	}
}

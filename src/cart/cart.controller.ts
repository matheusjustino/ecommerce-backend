import {
	Body,
	Controller,
	Delete,
	Get,
	HttpStatus,
	Inject,
	Param,
	Post,
	Res,
	UseGuards,
} from '@nestjs/common';
import { Response } from 'express';

// @SHARED
import {
	CART_SERVICE,
	ICartService,
} from '@shared/src/cart/cartService.interface';
import { CartItemModel } from '@shared/src/cart/cartModel';

// GUARDS
import { AuthGuard } from '@src/auth/guards/auth.guard';
import { RolesGuard } from '@src/auth/guards/roles.guard';
import { hasRoles } from '@src/auth/decorators/roles.decorator';

// DECORATORS
import { User } from '@src/common/decorators/user.decorator';
import { UserRole } from '@src/common/enums/user-role.enum';

@Controller('carts')
@UseGuards(AuthGuard, RolesGuard)
export class CartController {
	constructor(
		@Inject(CART_SERVICE)
		private readonly cartService: ICartService,
	) {}

	@Post()
	@hasRoles(UserRole.ADMIN, UserRole.CUSTOMER)
	public async createCart(@Body() body, @Res() res) {
		const cart = await this.cartService.createCart(body.userId);
		return res.status(HttpStatus.OK).json(cart);
	}

	@Post('add-item/:cartId')
	@hasRoles(UserRole.ADMIN, UserRole.CUSTOMER)
	public async addItemToCart(
		@Param('cartId') cartId: string,
		@Body() data: CartItemModel,
		@Res() res: Response,
	) {
		const cart = await this.cartService.addItemToCart(cartId, data);
		return res.status(HttpStatus.OK).json(cart);
	}

	@Post('remove-item/:cartId')
	@hasRoles(UserRole.ADMIN, UserRole.CUSTOMER)
	public async removeItemCart(
		@Param('cartId') cartId: string,
		@Body() data,
		@Res() res: Response,
	) {
		const cart = await this.cartService.removeItemCart(cartId, data);
		return res.status(HttpStatus.OK).json(cart);
	}

	@Get()
	@hasRoles(UserRole.ADMIN)
	public async getCarts(@Res() res: Response) {
		const carts = await this.cartService.getCarts();
		return res.status(HttpStatus.OK).json(carts);
	}

	@Get('user-carts')
	@hasRoles(UserRole.ADMIN, UserRole.CUSTOMER)
	public async getUserCarts(@User() user, @Res() res: Response) {
		const carts = await this.cartService.getUserCarts(user.id);
		return res.status(HttpStatus.OK).json(carts);
	}

	@Get(':cartId')
	@hasRoles(UserRole.ADMIN, UserRole.CUSTOMER)
	public async getCartById(
		@Param('cartId') cartId: string,
		@Res() res: Response,
	) {
		const cart = await this.cartService.getCartById(cartId);
		return res.status(HttpStatus.OK).json(cart);
	}

	@Delete('delete-cart/:cartId')
	@hasRoles(UserRole.ADMIN)
	public async deleteCart(
		@Param('cartId') cartId: string,
		@Res() res: Response,
	) {
		const cart = await this.cartService.deleteCart(cartId);
		return res.status(HttpStatus.OK).json(cart);
	}
}

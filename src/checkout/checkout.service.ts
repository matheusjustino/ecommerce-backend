import { Inject, Injectable } from '@nestjs/common';

// CART
import {
	SetShippingMethod,
	SetShippingMethodBody,
} from '@shared/src/cart/cartModel';
import {
	CART_SERVICE,
	ICartService,
} from '@shared/src/cart/cartService.interface';
import { CartDocument } from '@src/database/schemas/cart.schema';

// CHECKOUT
import { ICheckoutService } from '@shared/src/checkout/checkoutService.interface';
import {
	BillingAddressModel,
	ShippingAddressModel,
} from '@shared/src/checkout/checkoutModel';

// CORREIOS
import {
	CalculateShippingAndDeadlineResponseModel,
	CalculateShippingModel,
	CalculateShippingResponseModel,
} from '@shared/src/correios/correiosModel';
import { CorreiosService } from '@src/correios/correios.service';

// ENUM
import { ShippingMethodCode } from '@src/common/enums/shipping-method-code.enum';
import { CompanyZip } from '@src/common/enums/company-zip.enum';

@Injectable()
export class CheckoutService implements ICheckoutService {
	private CalculateShippingDataDefault: CalculateShippingModel = {
		nCdServico: ShippingMethodCode.SEDEX,
		sCepOrigem: CompanyZip.MAIN,
		sCepDestino: CompanyZip.MAIN,
		nCdFormato: 1,
		nVlAltura: 8,
		nVlComprimento: 27,
		nVlDiametro: 18,
		nVlLargura: 10,
		nVlPeso: '1',
	};

	constructor(
		@Inject(CART_SERVICE)
		private readonly cartService: ICartService,
		private readonly correiosService: CorreiosService,
	) { }

	public async setBillingShippingAddress(
		cartId: string,
		billing: BillingAddressModel,
		shipping: ShippingAddressModel,
	): Promise<CartDocument> {
		const data = {
			billingAddress: billing,
			shippingAddress: shipping,
		};

		const cart = await this.cartService.updateCart(cartId, data);
		return cart;
	}

	public async setShippingMethod(
		data: SetShippingMethod,
	): Promise<CartDocument> {
		const cart = await this.cartService.getCartById(data.cartId);

		const shippingCostAndDeadline = await this.calculateShippingAndDeadline(
			data,
		);

		const updatedCart = Object.assign(cart, {
			shippingMethod: {
				Metodo: data.shippingMethod,
				CepOrigem: CompanyZip.MAIN,
				CepDestino: data.zip,
				...shippingCostAndDeadline[0],
			},
		});

		return await updatedCart.save();
	}

	public async calculateShipping(
		shippingMethod: SetShippingMethodBody,
	): Promise<CalculateShippingResponseModel[]> {
		const calculateShippingData = {
			...this.CalculateShippingDataDefault,
			nCdServico: ShippingMethodCode[shippingMethod.shippingMethod],
			sCepDestino: shippingMethod.zip,
		};

		return await this.correiosService.calculateShipping(
			calculateShippingData,
		);
	}

	public async calculateShippingAndDeadline(
		shippingMethod: SetShippingMethodBody,
	): Promise<CalculateShippingAndDeadlineResponseModel[]> {
		const calculateShippingData = {
			...this.CalculateShippingDataDefault,
			nCdServico: ShippingMethodCode[shippingMethod.shippingMethod],
			sCepDestino: shippingMethod.zip,
		};

		return await this.correiosService.calculateShippingAndDeadline(
			calculateShippingData,
		);
	}
}

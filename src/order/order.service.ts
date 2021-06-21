import { Inject, Injectable } from '@nestjs/common';

// SCHEMAS
import { PaymentDocument } from '@src/database/schemas/payment.schema';
import { OrderDocument } from '@src/database/schemas/order.schema';
import { CartDocument } from '@src/database/schemas/cart.schema';

// REPOSITORIES
import { OrderRepository } from '@src/database/repositories/order.repository';

// SERVICES INTERFACE
import {
	CART_SERVICE,
	ICartService,
} from '@shared/src/cart/cartService.interface';
import { STRIPE_SERVICE } from '@shared/src/stripe/stripe.service';
import { IStripeService } from '@shared/src/stripe/stripe.service';
import { IOrderService } from '@shared/src/order/order.service';

// MODELS
import { ChargeCustomerModel } from '@shared/src/stripe/stripeModel';
import {
	CreateOrderBodyModel,
	RefundOrderModel,
} from '@shared/src/order/order-model';

@Injectable()
export class OrderService implements IOrderService {
	constructor(
		private readonly orderRepository: OrderRepository,
		@Inject(CART_SERVICE)
		private readonly cartService: ICartService,
		@Inject(STRIPE_SERVICE)
		private readonly stripeService: IStripeService,
	) {}

	public async createOrder({
		cartId,
		...data
	}: CreateOrderBodyModel): Promise<OrderDocument> {
		let order = new this.orderRepository.orderModel();

		const cart = await this.cartService.getCartById(cartId, true);
		const { stripeCustomerId } = cart.user;

		const amountToCharge =
			cart.total + this.castShippingCost(cart.shippingMethod.Valor);

		const customerChargeBody: ChargeCustomerModel = {
			customer: stripeCustomerId,
			amount: amountToCharge * 100,
			...data,
		};
		const customerCharge = await this.stripeService.chargeWithCreditCard(
			customerChargeBody,
			stripeCustomerId,
		);
		order = this.mappingOrder(order, cart, customerCharge);
		return await order.save();
	}

	public async createOrderWithInstallment(data, stripeCustomerId: string) {
		const order =
			await this.stripeService.chargeWithCreditCardAndInstallments(
				data,
				stripeCustomerId,
			);
		return order;
	}

	public async getUserOrders(userId): Promise<OrderDocument[]> {
		const orders = await this.orderRepository.orderModel
			.find({ user: userId })
			.populate('user');
		return orders;
	}

	public async refundOrder({
		orderId,
		stripeCustomerId,
		payment_intent,
		reason,
	}: RefundOrderModel) {
		const order = await this.orderRepository.orderModel.findById(orderId);

		await this.stripeService.refundCustomerCharge({
			payment_intent,
			reason,
		});
		const stripeOrder = await this.stripeService.getCustomerCharge({
			stripeCustomerId,
			payment_intent,
		});

		order.payment = this.mappingRefundOrder(
			stripeOrder.data[0],
			order.payment,
		);

		order.markModified('payment');
		return await order.save();
	}

	private mappingRefundOrder(refundedCharge, payment: PaymentDocument) {
		payment.charges.refunded = refundedCharge.refunded;
		payment.charges.refunds = Object.assign({}, refundedCharge.refunds);
		return payment;
	}

	private mappingOrder(
		order: OrderDocument,
		cart: CartDocument,
		charge,
	): OrderDocument {
		// CART
		order.items = cart.items;
		order.quantity = cart.quantity;
		order.total = cart.total;
		order.user = cart.user;
		order.shippingMethod = cart.shippingMethod;
		order.billingAddress = cart.billingAddress;
		order.shippingAddress = cart.shippingAddress;
		order.status = charge.status;

		// STRIPE CHARGE
		order.payment = this.mappingStripeChargeToOrderPayment(
			charge,
			order.payment,
		);
		return order;
	}

	private castShippingCost(shippingCost: string): number {
		const newShippingCost = Number(
			shippingCost.split('.').join('').replace(',', '.'),
		);
		return newShippingCost;
	}

	private mappingStripeChargeToOrderPayment(
		charge,
		payment: PaymentDocument,
	): PaymentDocument {
		payment.stripChargeId = charge.id;
		payment.status = charge.status;
		payment.amount = charge.amount;
		payment.amount_capturable = charge.amount_capturable;
		payment.amount_received = charge.amount_received;
		payment.canceled_at = charge.canceled_at;
		payment.cancellation_reason = charge.cancellation_reason;
		payment.capture_method = charge.capture_method;
		payment.charges = {
			id: charge.charges.data[0].id,
			amount: charge.charges.data[0].amount,
			amount_captured: charge.charges.data[0].amount_captured,
			amount_refunded: charge.charges.data[0].amount_refunded,
			balance_transaction: charge.charges.data[0].balance_transaction,
			billing_details: {
				address: {
					city: charge.charges.data[0].billing_details.address.city,
					country:
						charge.charges.data[0].billing_details.address.country,
					line1: charge.charges.data[0].billing_details.address.line1,
					line2: charge.charges.data[0].billing_details.address.line2,
					postal_code:
						charge.charges.data[0].billing_details.address
							.postal_code,
					state: charge.charges.data[0].billing_details.address.state,
				},
				email: charge.charges.data[0].billing_details.email,
				name: charge.charges.data[0].billing_details.name,
				phone: charge.charges.data[0].billing_details.phone,
			},
			captured: charge.charges.data[0].captured,
			currency: charge.charges.data[0].currency,
			customer: charge.charges.data[0].customer,
			description: charge.charges.data[0].description,
			failure_code: charge.charges.data[0].failure_code,
			failure_message: charge.charges.data[0].failure_message,
			fraud_details: charge.charges.data[0].fraud_details,
			paid: charge.charges.data[0].paid,
			payment_intent: charge.charges.data[0].payment_intent,
			payment_method: charge.charges.data[0].payment_method,
			payment_method_details: {
				type: charge.charges.data[0].payment_method_details.type,
				card: {
					brand: charge.charges.data[0].payment_method_details.card
						.brand,
					checks: {
						address_line1_check:
							charge.charges.data[0].payment_method_details.card
								.checks.address_line1_check,
						address_postal_code_check:
							charge.charges.data[0].payment_method_details.card
								.checks.address_postal_code_check,
						cvc_check:
							charge.charges.data[0].payment_method_details.card
								.checks.cvc_check,
					},
					country:
						charge.charges.data[0].payment_method_details.card
							.country,
					exp_month:
						charge.charges.data[0].payment_method_details.card
							.exp_month,
					exp_year:
						charge.charges.data[0].payment_method_details.card
							.exp_year,
					fingerprint:
						charge.charges.data[0].payment_method_details.card
							.fingerprint,
					funding:
						charge.charges.data[0].payment_method_details.card
							.funding,
					installments:
						charge.charges.data[0].payment_method_details.card
							.installments,
					last4: charge.charges.data[0].payment_method_details.card
						.last4,
				},
			},
			receipt_url: charge.charges.data[0].receipt_url,
			refunded: charge.charges.data[0].refunded,
			refunds: charge.charges.data[0].refunds,
			source: charge.charges.data[0].source
				? {
						id: charge.charges.data[0].source.id,
						object: charge.charges.data[0].source.object,
						address_city:
							charge.charges.data[0].source.address_city,
						address_country:
							charge.charges.data[0].source.address_country,
						address_line1:
							charge.charges.data[0].source.address_line1,
						address_line1_check:
							charge.charges.data[0].source.address_line1_check,
						address_line2:
							charge.charges.data[0].source.address_line2,
						address_state:
							charge.charges.data[0].source.address_state,
						address_zip: charge.charges.data[0].source.address_zip,
						address_zip_check:
							charge.charges.data[0].source.address_zip_check,
						brand: charge.charges.data[0].source.brand,
						country: charge.charges.data[0].source.country,
						customer: charge.charges.data[0].source.customer,
						cvc_check: charge.charges.data[0].source.cvc_check,
						dynamic_last4string:
							charge.charges.data[0].source.dynamic_last4string,
						exp_month: charge.charges.data[0].source.exp_month,
						exp_year: charge.charges.data[0].source.exp_year,
						fingerprint: charge.charges.data[0].source.fingerprint,
						funding: charge.charges.data[0].source.funding,
						last4: charge.charges.data[0].source.last4,
						name: charge.charges.data[0].source.name,
						status: charge.charges.data[0].source.status,
				  }
				: null,
		};

		return payment;
	}
}

import { OrderDocument } from "@src/database/schemas/order.schema";
import { CreateOrderBodyModel } from "./order-model";

export const ORDER_SERVICE = 'ORDER SERVICE';

export interface IOrderService {
	createOrder({ cartId, ...data }: CreateOrderBodyModel): Promise<OrderDocument>;
	getUserOrders(userId): Promise<OrderDocument[]>
}

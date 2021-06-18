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

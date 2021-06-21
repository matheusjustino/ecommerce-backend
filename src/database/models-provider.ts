import { AsyncModelFactory } from '@nestjs/mongoose';
import bcrypt from 'bcrypt';

// SCHEMAS
import { User, UserSchema, UserDocument } from './schemas/user.schema';
import { Product, ProductSchema } from './schemas/product.schema';
import { Cart, CartSchema } from './schemas/cart.schema';
import { Order, OrderSchema } from './schemas/order.schema';

export const ModelsProviderAsync: AsyncModelFactory[] = [
	{
		name: User.name,
		collection: 'users',
		useFactory: () => {
			const schema = UserSchema;
			schema.pre<UserDocument>('save', async function (next) {
				if (!this.isModified('password')) next();

				const salt: string = await bcrypt.genSalt(5);
				const hash = await bcrypt.hash(this.password, salt);
				this.password = hash;
				next();
			});
			return schema;
		},
	},
	{
		name: Product.name,
		collection: 'products',
		useFactory: () => ProductSchema,
	},
	{
		name: Cart.name,
		collection: 'carts',
		useFactory: () => CartSchema,
	},
	{
		name: Order.name,
		collection: 'orders',
		useFactory: () => OrderSchema,
	},
];

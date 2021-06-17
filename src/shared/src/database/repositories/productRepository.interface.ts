import { Model } from 'mongoose';

import { ProductDocument } from "@src/database/schemas/product.schema";

export interface IProductRepository {
	get productModel(): Model<ProductDocument>;
}

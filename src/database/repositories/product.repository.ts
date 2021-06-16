import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

// SCHEMAS
import { Product, ProductDocument } from '@src/database/schemas/product.schema';

// @SHARED
import { IProductRepository } from '@shared/src/database/repositories/productRepository.interface';

@Injectable()
export class ProductRepository implements IProductRepository {
	constructor(
		@InjectModel(Product.name)
		private readonly ProductModel: Model<ProductDocument>,
	) {}

	public get productModel(): Model<ProductDocument> {
		return this.ProductModel;
	}
}

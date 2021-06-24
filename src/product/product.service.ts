import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from '@src/database/repositories/product.repository';

// @SHARED
import { ProductModel } from '@shared/src/database/schemas/productModel';
import { ProductUpdateModel } from '@shared/src/product/productUpdateModel';
import { ProductCreateModel } from '@shared/src/product/productCreateModel';

// SERVICES INTERFACE
import { IProductService } from '@shared/src/product/productService.interface';
import {
	IRedisCacheInterface,
	REDIS_CACHE_SERVICE,
} from '@shared/src/redis-cache/redis-cache.service';

@Injectable()
export class ProductService implements IProductService {
	constructor(
		private readonly productRepository: ProductRepository,
		@Inject(REDIS_CACHE_SERVICE)
		private readonly redisCacheService: IRedisCacheInterface,
	) {}

	public async createProduct(
		data: ProductCreateModel,
	): Promise<ProductModel> {
		// invalidando lista de products no cache
		await this.redisCacheService.invalidate('PRODUCT_LIST');

		const product = await this.productRepository.productModel.create(data);
		return product;
	}

	public async findAllProducts(): Promise<ProductModel[]> {
		// buscando do cache caso exista
		let products = await this.redisCacheService.recover<ProductModel[]>(
			'PRODUCT_LIST',
		);

		if (!products) {
			products = await this.productRepository.productModel.find();

			// salvando no cache
			await this.redisCacheService.save('PRODUCT_LIST', products);
		}
		return products;
	}

	public async findProductById(id: string): Promise<ProductModel> {
		const product = await this.productRepository.productModel.findById(id);
		if (!product) {
			throw new BadRequestException('Product not found.');
		}
		return product;
	}

	public async updateProduct(
		id: string,
		data: ProductUpdateModel,
	): Promise<ProductModel> {
		const product = await this.productRepository.productModel.findById(id);

		if (!product) {
			throw new BadRequestException('Product not found.');
		}

		const updatedProduct = Object.assign(product, data);

		// invalidando lista de products no cache
		await this.redisCacheService.invalidate('PRODUCT_LIST');

		return await updatedProduct.save();
	}

	public async deleteProduct(id: string): Promise<void> {
		// invalidando lista de products no cache
		await this.redisCacheService.invalidate('PRODUCT_LIST');

		await this.productRepository.productModel.findByIdAndDelete(id);
	}
}

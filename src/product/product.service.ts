import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductRepository } from '@src/database/repositories/product.repository';

// @SHARED
import { ProductModel } from '@shared/src/database/schemas/productModel';
import { IProductService } from '@shared/src/product/productService.interface';
import { ProductUpdateModel } from '@shared/src/product/productUpdateModel';
import { ProductCreateModel } from '@shared/src/product/productCreateModel';

@Injectable()
export class ProductService implements IProductService {
	constructor(private readonly productRepository: ProductRepository) {}

	public async createProduct(
		data: ProductCreateModel,
	): Promise<ProductModel> {
		const product = await this.productRepository.productModel.create(data);
		return product;
	}

	public async findAllProducts(): Promise<ProductModel[]> {
		const products = await this.productRepository.productModel.find();
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
		return await updatedProduct.save();
	}

	public async deleteProduct(id: string): Promise<void> {
		await this.productRepository.productModel.findByIdAndDelete(id);
	}
}

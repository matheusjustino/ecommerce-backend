import { ProductModel } from "@src/shared/src/database/schemas/productModel";
import { ProductUpdateModel } from "@src/shared/src/product/productUpdateModel";

export const PRODUCT_SERVICE = 'PRODUCT SERVICE';
export interface IProductService {
	findAllProducts(): Promise<ProductModel[]>;
	findProductById(id: string): Promise<ProductModel>;
	updateProduct(id: string, data: ProductUpdateModel): Promise<ProductModel>;
	deleteProduct(id: string): Promise<void>;
}

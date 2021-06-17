import { ProductModel } from "@src/shared/src/database/schemas/productModel";
import { ProductUpdateModel } from "@src/shared/src/product/productUpdateModel";
import { ProductCreateModel } from "./productCreateModel";

export const PRODUCT_SERVICE = 'PRODUCT SERVICE';
export interface IProductService {
	createProduct(data: ProductCreateModel): Promise<ProductModel>;
	findAllProducts(): Promise<ProductModel[]>;
	findProductById(id: string): Promise<ProductModel>;
	updateProduct(id: string, data: ProductUpdateModel): Promise<ProductModel>;
	deleteProduct(id: string): Promise<void>;
}

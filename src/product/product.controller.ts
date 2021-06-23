import {
	Body,
	Controller,
	Delete,
	Get,
	HttpStatus,
	Inject,
	Param,
	Post,
	Put,
	Res,
	UseGuards,
} from '@nestjs/common';
import {
	ApiBody,
	ApiOkResponse,
	ApiOperation,
	ApiParam,
	ApiTags,
} from '@nestjs/swagger';

// GUARDS
import { AuthGuard } from '@src/auth/guards/auth.guard';
import { RolesGuard } from '@src/auth/guards/roles.guard';

// SCHEMAS
import { Product } from '@src/database/schemas/product.schema';

// SHARED
import { ProductCreateModel } from '@shared/src/product/productCreateModel';
import {
	IProductService,
	PRODUCT_SERVICE,
} from '@shared/src/product/productService.interface';
import { ProductUpdateModel } from '@shared/src/product/productUpdateModel';

import { UserRole } from '@src/common/enums/user-role.enum';
import { hasRoles } from '@src/auth/decorators/roles.decorator';

@ApiTags('Product')
@Controller('products')
@UseGuards(AuthGuard, RolesGuard)
export class ProductController {
	constructor(
		@Inject(PRODUCT_SERVICE)
		private readonly productService: IProductService,
	) {}

	@Get()
	@hasRoles(UserRole.ADMIN, UserRole.CUSTOMER)
	@ApiOkResponse({ type: [Product] })
	@ApiOperation({ description: 'Lista todos os produtos.' })
	public async findAllProducts(@Res() response): Promise<Product[]> {
		const products = await this.productService.findAllProducts();
		return response.status(HttpStatus.OK).json(products);
	}

	@Get(':id')
	@hasRoles(UserRole.ADMIN, UserRole.CUSTOMER)
	@ApiParam({
		name: 'id',
		description: 'Deve ser passado o id do produto como parâmetro',
	})
	@ApiOkResponse({ type: Product })
	@ApiOperation({ description: 'Lista todos os produtos.' })
	public async findProductById(
		@Param('id') id: string,
		@Res() response,
	): Promise<Product> {
		const product = await this.productService.findProductById(id);
		return response.status(HttpStatus.OK).json(product);
	}

	@Post('create')
	@hasRoles(UserRole.ADMIN)
	@ApiBody({ type: ProductCreateModel })
	@ApiOkResponse({ type: Product })
	@ApiOperation({ description: 'Cria um produto.' })
	public async createProduct(
		@Body() data: ProductCreateModel,
		@Res() response,
	): Promise<Product> {
		const product = await this.productService.createProduct(data);
		return response.status(HttpStatus.OK).json(product);
	}

	@Put('update/:id')
	@hasRoles(UserRole.ADMIN)
	@ApiBody({ type: ProductUpdateModel })
	@ApiOkResponse({ type: Product })
	@ApiOperation({ description: 'Atualiza um produto.' })
	public async updateProduct(
		@Param('id') id: string,
		@Body() data: ProductUpdateModel,
		@Res() response,
	): Promise<Product> {
		const product = await this.productService.updateProduct(id, data);
		return response.status(HttpStatus.OK).json(product);
	}

	@Delete('delete/:id')
	@hasRoles(UserRole.ADMIN)
	@ApiParam({ name: 'id', description: 'Deve ser passado o id do produto' })
	@ApiOkResponse({ type: Object })
	@ApiOperation({ description: 'Deleta um produto.' })
	public async deleteProduct(
		@Param('id') id: string,
		@Res() response,
	): Promise<void> {
		await this.productService.deleteProduct(id);
		return response
			.status(HttpStatus.OK)
			.json({ message: `Product ${id} has been deleted.` });
	}
}

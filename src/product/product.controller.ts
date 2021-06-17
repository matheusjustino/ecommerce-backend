import { Body, Controller, Delete, Get, HttpStatus, Inject, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { AuthAuthGuard } from '@src/auth/guards/auth.guard';
import { Product } from '@src/database/schemas/product.schema';

// SHARED
import { ProductCreateModel } from '@shared/src/product/productCreateModel';
import { IProductService, PRODUCT_SERVICE } from '@shared/src/product/productService.interface';
import { ProductUpdateModel } from '@shared/src/product/productUpdateModel';

@Controller('products')
@UseGuards(AuthAuthGuard)
export class ProductController {
  constructor(
    @Inject(PRODUCT_SERVICE)
    private readonly productService: IProductService
  ){}

  @Get()
  public async findAllProducts(
    @Res() response
  ): Promise<Product[]> {
    const products = await this.productService.findAllProducts();
    return response.status(HttpStatus.OK).json(products);
  }

  @Get(':id')
  public async findProductById(
    @Param('id') id: string,
    @Res() response
  ): Promise<Product> {
    const product = await this.productService.findProductById(id);
    return response.status(HttpStatus.OK).json(product);
  }

  @Post('create')
  public async createProduct(
    @Body() data: ProductCreateModel,
    @Res() response
  ): Promise<Product> {
    const product = await this.productService.createProduct(data);
    return response.status(HttpStatus.OK).json(product);
  }

  @Put('update/:id')
  public async updateProduct(
    @Param('id') id: string,
    @Body() data: ProductUpdateModel,
    @Res() response
  ): Promise<Product> {
    const product = await this.productService.updateProduct(id, data);
    return response.status(HttpStatus.OK).json(product);
  }

  @Delete('delete/:id')
  public async deleteProduct(
    @Param('id') id: string,
    @Res() response
  ): Promise<void> {
    await this.productService.deleteProduct(id);
    return response.status(HttpStatus.OK).json({message: `Product ${id} has been deleted.`});
  }
}

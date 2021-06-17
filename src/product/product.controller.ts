import { Body, Controller, Delete, Get, HttpStatus, Inject, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { ProductCreateModel } from '@shared/src/product/productCreateModel';
import { PRODUCT_SERVICE } from '@shared/src/product/productService.interface';
import { ProductUpdateModel } from '@shared/src/product/productUpdateModel';
import { AuthAuthGuard } from '@src/auth/guards/auth.guard';
import { Product } from '@src/database/schemas/product.schema';
import { ProductService } from '@src/product/product.service';

@Controller('products')
@UseGuards(AuthAuthGuard)
export class ProductController {
  constructor(
    @Inject(PRODUCT_SERVICE)
    private readonly productService: ProductService
  ){}

  @Get()
  public async findAllProducts(
    @Res() response: any
  ): Promise<Product[]> {
    const products = await this.productService.findAllProducts();
    return response.status(HttpStatus.OK).json(products);
  }

  @Get(':id')
  public async findProductById(
    @Param('id') id: string,
    @Res() response: any
  ): Promise<Product> {
    const product = await this.productService.findProductById(id);
    return response.status(HttpStatus.OK).json(product);
  }

  @Post('create')
  public async createProduct(
    @Body() data: ProductCreateModel,
    @Res() response: any
  ): Promise<Product> {
    const product = await this.productService.createProduct(data);
    return response.status(HttpStatus.OK).json(product);
  }

  @Put('update/:id')
  public async updateProduct(
    @Param('id') id: string,
    @Body() data: ProductUpdateModel,
    @Res() response: any
  ): Promise<Product> {
    const product = await this.productService.updateProduct(id, data);
    return response.status(HttpStatus.OK).json(product);
  }

  @Delete('delete/:id')
  public async deleteProduct(
    @Param('id') id: string,
    @Res() response: any
  ): Promise<void> {
    await this.productService.deleteProduct(id);
    return response.status(HttpStatus.OK).json({message: `Product ${id} has been deleted.`});
  }
}

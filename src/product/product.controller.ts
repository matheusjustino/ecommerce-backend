import { Controller, Inject, UseGuards } from '@nestjs/common';
import { PRODUCT_SERVICE } from '@shared/src/product/productService.interface';
import { AuthAuthGuard } from '@src/auth/guards/auth.guard';
import { ProductService } from './product.service';

@Controller('product')
@UseGuards(AuthAuthGuard)
export class ProductController {
  constructor(
    @Inject(PRODUCT_SERVICE)
    private readonly productService: ProductService
  ){}
}

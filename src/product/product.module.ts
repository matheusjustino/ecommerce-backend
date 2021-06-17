import { Module } from '@nestjs/common';
import { ProductController } from '@src/product/product.controller';
import { ProductService } from '@src/product/product.service';
import { DatabaseModule } from '@src/database/database.module';
import { AuthModule } from '@src/auth/auth.module';
import { PRODUCT_SERVICE } from '@shared/src/product/productService.interface';

@Module({
  imports: [
		DatabaseModule,
		AuthModule
	],
  controllers: [ProductController],
  providers: [
    {
			useClass: ProductService,
			provide: PRODUCT_SERVICE
		}
  ]
})
export class ProductModule {}

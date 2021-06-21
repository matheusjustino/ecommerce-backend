import { Module } from '@nestjs/common';

// MODULES
import { DatabaseModule } from '@src/database/database.module';
import { AuthModule } from '@src/auth/auth.module';
import { UserModule } from '@src/user/user.module';

// SERVICES INTERFACE
import { PRODUCT_SERVICE } from '@shared/src/product/productService.interface';

import { ProductController } from '@src/product/product.controller';
import { ProductService } from '@src/product/product.service';

@Module({
  imports: [
			DatabaseModule,
			AuthModule,
			UserModule
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

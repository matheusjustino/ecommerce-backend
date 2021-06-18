import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { AppConfigModule } from './app-config/app-config.module';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { ProductModule } from './product/product.module';

@Module({
	imports: [DatabaseModule, AppConfigModule, UserModule, AuthModule, ProductModule, CartModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}

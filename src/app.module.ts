import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { AppConfigModule } from './app-config/app-config.module';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { ProductModule } from './product/product.module';
import { CheckoutModule } from './checkout/checkout.module';
import { CorreiosModule } from './correios/correios.module';
import { OrderModule } from './order/order.module';
import { StripeModule } from './stripe/stripe.module';
import { MailModule } from './mail/mail.module';
import { AddressModule } from './address/address.module';
import { JobsModule } from './jobs/jobs.module';
import { RedisCacheModule } from './redis-cache/redis-cache.module';

@Module({
	imports: [
		DatabaseModule,
		AppConfigModule,
		UserModule,
		AuthModule,
		ProductModule,
		CartModule,
		CheckoutModule,
		CorreiosModule,
		OrderModule,
		StripeModule,
		MailModule,
		AddressModule,
		JobsModule,
		RedisCacheModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}

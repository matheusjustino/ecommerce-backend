import { UserModule } from '@src/user/user.module';
import { forwardRef, Module } from '@nestjs/common';

import { AppConfigModule } from '@src/app-config/app-config.module';
import { AuthModule } from '@src/auth/auth.module';

import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import { STRIPE_SERVICE } from '@shared/src/stripe/stripe.service';

@Module({
	imports: [
		AppConfigModule,
		forwardRef(() => UserModule),
		forwardRef(() => AuthModule)
	],
	providers: [
		{
			useClass: StripeService,
			provide: STRIPE_SERVICE
		}
	],
	controllers: [StripeController],
	exports: [
		{
			useClass: StripeService,
			provide: STRIPE_SERVICE
		}
	]
})
export class StripeModule {}

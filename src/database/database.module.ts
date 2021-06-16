import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// MODULES
import { AppConfigModule } from '../app-config/app-config.module';

// SERVICES
import { AppConfigService } from '../app-config/app-config.service';

// PROVIDERS
import { ModelsProviderAsync } from './models-provider';

// REPOSITORIES
import { UserRepository } from './repositories/user.repository';
import { ProductRepository } from './repositories/product.repository';

@Module({
	imports: [
		MongooseModule.forRootAsync({
			imports: [AppConfigModule],
			useFactory: (appConfigService: AppConfigService) => ({
				uri: appConfigService.databaseUrl,
				useNewUrlParser: true,
				useFindAndModify: false,
				useUnifiedTopology: true,
				useCreateIndex: true,
			}),
			inject: [AppConfigService],
		}),
		MongooseModule.forFeatureAsync(ModelsProviderAsync),
	],
	providers: [UserRepository, ProductRepository],
	exports: [UserRepository, ProductRepository]
})
export class DatabaseModule {}

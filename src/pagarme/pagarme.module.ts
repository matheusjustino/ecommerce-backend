import { Module } from '@nestjs/common';

import { PagarmeService } from './pagarme.service';

import { AppConfigModule } from '@src/app-config/app-config.module';
import { PagarmeController } from './pagarme.controller';

@Module({
	imports: [AppConfigModule],
	providers: [PagarmeService],
	exports: [PagarmeService],
	controllers: [PagarmeController],
})
export class PagarmeModule {}

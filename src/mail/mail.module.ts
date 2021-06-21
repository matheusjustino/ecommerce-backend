import { Module } from '@nestjs/common';

// MODULES
import { AppConfigModule } from '@src/app-config/app-config.module';

// SERVICES INTERFACES
import { MAIL_SERVICE } from '@shared/src/mail/mail.service';
import { MailService } from './mail.service';

import { HandlebarsMailTemplate } from './handlebars-mail-template.service';

@Module({
	imports: [AppConfigModule],
	providers: [
		MailService,
		{
			useClass: MailService,
			provide: MAIL_SERVICE
		},
		HandlebarsMailTemplate
	],
	exports: [
		MailService,
		{
			useClass: MailService,
			provide: MAIL_SERVICE
		},
		HandlebarsMailTemplate
	]
})
export class MailModule { }

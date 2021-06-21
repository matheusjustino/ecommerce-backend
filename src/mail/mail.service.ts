import { Injectable } from '@nestjs/common';
import nodemailer from 'nodemailer';

// SERVICES
import { HandlebarsMailTemplate } from './handlebars-mail-template.service';
import { AppConfigService } from '@src/app-config/app-config.service';

// SERVICES INTERFACES
import { IMailService } from '@shared/src/mail/mail.service';

// MODELS
import { SendEmail } from '@shared/src/mail/mailModel';

@Injectable()
export class MailService implements IMailService {
	constructor(
		private readonly appConfigService: AppConfigService,
		private readonly handlebarsMailTemplate: HandlebarsMailTemplate,
	) {}

	public async sendEmail({
		from,
		to,
		subject,
		templateData,
	}: SendEmail): Promise<void> {
		const transporter = await nodemailer.createTransport({
			host: this.appConfigService.mailHost,
			port: this.appConfigService.mailPort,
			auth: {
				user: this.appConfigService.mailUser,
				pass: this.appConfigService.mailPass,
			},
		});

		const message = await transporter.sendMail({
			from: {
				name:
					from?.name ||
					this.appConfigService.mailCompanyName ||
					'Equipe de Vendas',
				address:
					from?.email ||
					this.appConfigService.mailCompanyEmail ||
					'equipe@vendas.com.br',
			},
			to: {
				name: to.name,
				address: to.email,
			},
			replyTo: from?.email || this.appConfigService.mailCompanyEmail,
			subject,
			html: await this.handlebarsMailTemplate.parser(templateData),
		});

		console.log('Message sent: %s', message.messageId);
		console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
	}
}

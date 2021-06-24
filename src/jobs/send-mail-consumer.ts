import { Inject } from '@nestjs/common';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

import { IMailService, MAIL_SERVICE } from '@shared/src/mail/mail.service';
import { SendEmail } from '@shared/src/mail/mailModel';

@Processor('send-mail-queue')
export class SendMailProducer {
	constructor(
		@Inject(MAIL_SERVICE)
		private readonly mailService: IMailService,
	) {}

	@Process('send-mail-job')
	public async sendMailJob(job: Job<SendEmail>): Promise<void> {
		const { data } = job;

		await this.mailService.sendEmail(data);
	}
}

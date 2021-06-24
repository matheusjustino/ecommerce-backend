import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

// MODELS
import { SendEmail } from '@shared/src/mail/mailModel';

// SERVICES INTERFACE
import { ISendMailProducerService } from '@shared/src/jobs/send-mail-producer.service';

@Injectable()
export class SendMailProducerService implements ISendMailProducerService {
	constructor(
		@InjectQueue('send-mail-queue') private readonly mailQueue: Queue,
	) {}

	public async sendMail(data: SendEmail): Promise<void> {
		await this.mailQueue.add('send-mail-job', data, {
			delay: 2000,
			attempts: 2,
		});
	}
}

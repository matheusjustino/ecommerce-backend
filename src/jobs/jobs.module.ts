import { forwardRef, Module } from '@nestjs/common';
import { MiddlewareBuilder } from '@nestjs/core';
import { BullModule, InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { createBullBoard } from 'bull-board';
import { BullAdapter } from 'bull-board/bullAdapter';

import { MailModule } from '@src/mail/mail.module';

import { SendMailProducerService } from './send-mail-producer.service';
import { SendMailProducer } from './send-mail-consumer';
import { SEND_MAIL_PRODUCER_SERVICE } from '@shared/src/jobs/send-mail-producer.service';

@Module({
	imports: [
		BullModule.forRoot({
			redis: {
				host: 'localhost',
				port: 6379,
			},
		}),
		BullModule.registerQueue({
			name: 'send-mail-queue',
		}),
		forwardRef(() => MailModule),
	],
	providers: [
		{
			useClass: SendMailProducerService,
			provide: SEND_MAIL_PRODUCER_SERVICE,
		},
		SendMailProducer,
	],
	exports: [
		{
			useClass: SendMailProducerService,
			provide: SEND_MAIL_PRODUCER_SERVICE,
		},
		SendMailProducer,
	],
})
export class JobsModule {
	constructor(
		@InjectQueue('send-mail-queue') private readonly mailQueue: Queue,
	) {}

	public configure(consumer: MiddlewareBuilder) {
		const { router } = createBullBoard([new BullAdapter(this.mailQueue)]);
		consumer.apply(router).forRoutes('/admin/queues/mail');
	}
}

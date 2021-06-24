import { SendEmail } from '../mail/mailModel';

export const SEND_MAIL_PRODUCER_SERVICE = 'SEND MAIL PRODUCER SERVICE';

export interface ISendMailProducerService {
	sendMail(data: SendEmail): Promise<void>;
}

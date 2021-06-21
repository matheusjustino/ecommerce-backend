import { SendEmail } from "./mailModel";

export const MAIL_SERVICE = 'MAIL SERVICE';

export interface IMailService {
	sendEmail(data: SendEmail): Promise<void>;
}

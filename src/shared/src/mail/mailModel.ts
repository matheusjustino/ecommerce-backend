export class MailContact {
	name: string;
	email: string;
}

export class TemplateVariable {
	[key: string]: string | number;
}

export class ParserMailTemplate {
	file: string;
	variables: TemplateVariable;
}

export class SendEmail {
	from?: MailContact;
	to: MailContact;
	subject: string;
	templateData: ParserMailTemplate;
}

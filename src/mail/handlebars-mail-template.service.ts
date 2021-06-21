import { Injectable } from '@nestjs/common';
import fs from 'fs';
import handlebars from 'handlebars';

import { ParserMailTemplate } from '@shared/src/mail/mailModel';

@Injectable()
export class HandlebarsMailTemplate {
	public async parser({
		file,
		variables,
	}: ParserMailTemplate): Promise<string> {
		const templateFileContent = await fs.promises.readFile(file, {
			encoding: 'utf-8',
		});
		const parseTemplate = handlebars.compile(templateFileContent);

		return parseTemplate(variables);
	}
}

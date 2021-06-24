import {
	Body,
	Controller,
	Get,
	HttpStatus,
	Param,
	Post,
	Res,
} from '@nestjs/common';
import { Response } from 'express';

import { PagarmeService } from './pagarme.service';

@Controller('pagarme')
export class PagarmeController {
	constructor(private readonly pagarmeService: PagarmeService) {}

	@Post('customer')
	public async createCustomer(@Body() body, @Res() res: Response) {
		const customer = await this.pagarmeService.createCustomer(body);
		return res.status(HttpStatus.OK).json(customer);
	}

	@Get('customer')
	public async getCustomers(@Res() res: Response) {
		const customers = await this.pagarmeService.getCustomers();
		return res.status(HttpStatus.OK).json(customers);
	}

	@Get('customer/:customerId')
	public async getCustomerById(
		@Param('customerId') id: string,
		@Res() res: Response,
	) {
		const customer = await this.pagarmeService.getCustomerById(id);
		return res.status(HttpStatus.OK).json(customer);
	}

	@Post('card/customer')
	public async createCustomerCard(@Body() body, @Res() res: Response) {
		const customerCard = await this.pagarmeService.createCustomerCard(body);
		return res.status(HttpStatus.OK).json(customerCard);
	}

	@Get('card/customer')
	public async getCustomerCards(@Res() res: Response) {
		const customerCards = await this.pagarmeService.getCustomerCards(
			'5812682',
		);
		return res.status(HttpStatus.OK).json(customerCards);
	}

	@Post('transaction')
	public async createTransactionWithCC(@Body() body, @Res() res: Response) {
		const transaction = await this.pagarmeService.createTransactionWithCC(
			body,
		);
		return res.status(HttpStatus.OK).json(transaction);
	}
}

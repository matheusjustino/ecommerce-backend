import { Injectable } from '@nestjs/common';
import pagarme from 'pagarme';

import { AppConfigService } from '@src/app-config/app-config.service';

/**
 * Doc: https://docs.pagar.me/reference#criar-transacao
 * Dashboard: https://beta.dashboard.sandbox.pagar.me/
 */

@Injectable()
export class PagarmeService {
	private Pagarme = null;

	constructor(private readonly appConfigService: AppConfigService) {
		(async () => await this.connectPagarmeClient())();
	}

	public async createCustomer(data) {
		const customer = await this.Pagarme.customers.create(data);
		return customer;
	}

	public async getCustomers() {
		const customers = await this.Pagarme.customers.all();
		return customers;
	}

	public async getCustomerById(customer_id: string) {
		const customer = await this.Pagarme.customers.find({ id: customer_id });
		return customer;
	}

	public async createCustomerCard(data) {
		const customerCard = this.Pagarme.cards.create(data);
		return customerCard;
	}

	public async getCustomerCards(customer_id: string) {
		const customerCards = this.Pagarme.cards.all({ customer_id });
		return customerCards;
	}

	public async createTransactionWithCC(data) {
		const transaction = await this.Pagarme.transactions.create(data);

		return transaction;
	}

	private async connectPagarmeClient() {
		if (!this.Pagarme) {
			this.Pagarme = await pagarme.client.connect({
				api_key: this.appConfigService.pmApi,
			});
		}
	}

	private mappingDataToCreateTransaction({ amount, card }) {
		const transaction = {
			amount,
			card_number: card.card_number,
			card_holder_name: card.card_holder_name,
			card_expiration_date: card.card_expiration_date,
			card_cvv: card.card_cvv,
		};

		return transaction;
	}
}

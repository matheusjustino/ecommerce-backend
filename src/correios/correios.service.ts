import { Injectable } from '@nestjs/common';
import Correios from 'node-correios';

import { ICorreiosService } from '@shared/src/correios/correios.service';
import {
	CalculateShippingAndDeadlineResponseModel,
	CalculateShippingModel,
	CalculateShippingResponseModel,
} from '@shared/src/correios/correiosModel';

@Injectable()
export class CorreiosService implements ICorreiosService {
	private ApiCorreios;

	constructor() {
		this.ApiCorreios = new Correios();
	}

	public async verifyZip(zip: string) {
		const res = await this.ApiCorreios.consultaCEP({ cep: zip });
		return res;
	}

	public async calculateShipping(
		data: CalculateShippingModel,
	): Promise<CalculateShippingResponseModel[]> {
		try {
			const res = await this.ApiCorreios.calcPreco(data);
			return res;
		} catch (error) {
			console.log(error);
			return error;
		}
	}

	public async calculateShippingAndDeadline(
		data: CalculateShippingModel,
	): Promise<CalculateShippingAndDeadlineResponseModel[]> {
		try {
			const res = await this.ApiCorreios.calcPrecoPrazo(data);
			return res;
		} catch (error) {
			console.log(error);
			return error;
		}
	}
}

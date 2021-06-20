import { Sex } from '@src/common/enums/sex.enum';

export class UserModel {
	public id?: string;
	public firstName: string;
	public lastName: string;
	public legalDocument: string;
	public phone: string;
	public gender: Sex;
	public email: string;
	public password: string;
}

// export class UserUpdateModel {
// 	public firstName?: string;
// 	public lastName?: string;
// 	public legalDocument?: string;
// 	public phone?: string;
// 	public gender?: Sex;
// 	public email?: string;
// 	public password?: string;
// }

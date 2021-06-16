import { Body, Controller, Delete, Get, HttpStatus, Inject, Param, Put, Res, UseGuards } from '@nestjs/common';
import { User } from 'src/database/schemas/user.schema';
import { UserUpdateModel } from '@shared/src/user/userUpdateModel';

import { AuthAuthGuard } from '@src/auth/guards/auth.guard';
import { IUserService, USER_SERVICE } from '@shared/src/user/userService.interface';

@Controller('users')
@UseGuards(AuthAuthGuard)
export class UserController {
	constructor(
		@Inject(USER_SERVICE)
		private readonly userService: IUserService
	) { }

	@Get()
	public async findAllUsers(
		@Res() response,
	): Promise<User[]> {
		const users = await this.userService.findAllUsers();
		return response.status(HttpStatus.OK).json(users);
	}

	@Get(':id')
	public async findUserById(
		@Param('id') id: string,
		@Res() response,
	): Promise<User> {
		const user = await this.userService.findUserById(id);
		return response.status(HttpStatus.OK).json(user);
	}

	@Put(':id')
	public async updateUser(
		@Param('id') id: string,
		@Body() data: UserUpdateModel,
		@Res() response
	): Promise<User> {
		const userUpdated = await this.userService.updateUser(id, data);
		return response.status(HttpStatus.OK).json(userUpdated);
	}

	@Delete(':id')
	public async deleteUser(
		@Param('id') id: string,
		@Res() response
	): Promise<void> {
		await this.userService.deleteUser(id);
		return response.status(HttpStatus.OK).json({message: `User ${id} has been deleted.`});
	}
}

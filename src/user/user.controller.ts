import {
	Body,
	Controller,
	Delete,
	Get,
	HttpStatus,
	Inject,
	Param,
	Put,
	Res,
	UseGuards,
} from '@nestjs/common';
import {
	ApiBody,
	ApiOkResponse,
	ApiOperation,
	ApiParam,
	ApiTags,
} from '@nestjs/swagger';

// GUARDS
import { AuthGuard } from '@src/auth/guards/auth.guard';
import { RolesGuard } from '@src/auth/guards/roles.guard';

// SCHEMAS
import { User } from 'src/database/schemas/user.schema';

// @SHARED
import { UserUpdateModel } from '@shared/src/user/userUpdateModel';
import {
	IUserService,
	USER_SERVICE,
} from '@shared/src/user/userService.interface';

import { UserRole } from '@src/common/enums/user-role.enum';
import { hasRoles } from '@src/auth/decorators/roles.decorator';

@ApiTags('User')
@Controller('users')
@UseGuards(AuthGuard, RolesGuard)
export class UserController {
	constructor(
		@Inject(USER_SERVICE)
		private readonly userService: IUserService,
	) {}

	@Get()
	@hasRoles(UserRole.ADMIN)
	@ApiOkResponse({ type: [User] })
	@ApiOperation({ description: 'Lista todos os usuários.' })
	public async findAllUsers(@Res() response): Promise<User[]> {
		const users = await this.userService.findAllUsers();
		return response.status(HttpStatus.OK).json(users);
	}

	@Get(':id')
	@hasRoles(UserRole.ADMIN, UserRole.CUSTOMER)
	@ApiParam({
		name: 'id',
		description: 'Deve ser passado o id do usuário como parâmetro.',
	})
	@ApiOkResponse({ type: User })
	@ApiOperation({ description: 'Lista um usuário por meio do ID.' })
	public async findUserById(
		@Param('id') id: string,
		@Res() response,
	): Promise<User> {
		const user = await this.userService.findUserById(id);
		return response.status(HttpStatus.OK).json(user);
	}

	@Put(':id')
	@hasRoles(UserRole.ADMIN, UserRole.CUSTOMER)
	@ApiBody({ type: UserUpdateModel })
	@ApiParam({
		name: 'id',
		description: 'Deve ser passado o id do usuário como parâmetro.',
	})
	@ApiOkResponse({ type: User })
	@ApiOperation({ description: 'Devolve um usuário atualizado.' })
	public async updateUser(
		@Param('id') id: string,
		@Body() data: UserUpdateModel,
		@Res() response,
	): Promise<User> {
		const userUpdated = await this.userService.updateUser(id, data);
		return response.status(HttpStatus.OK).json(userUpdated);
	}

	@Delete(':id')
	@hasRoles(UserRole.ADMIN)
	@ApiParam({
		name: 'id',
		description: 'Deve ser passado o id do usuário como parâmetro.',
	})
	@ApiOkResponse({ type: Object })
	@ApiOperation({ description: 'Deleta um usuário.' })
	public async deleteUser(
		@Param('id') id: string,
		@Res() response,
	): Promise<void> {
		await this.userService.deleteUser(id);
		return response
			.status(HttpStatus.OK)
			.json({ message: `User ${id} has been deleted.` });
	}
}

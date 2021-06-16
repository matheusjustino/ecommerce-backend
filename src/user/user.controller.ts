import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { User } from 'src/database/schemas/user.schema';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) { }

  @Get(':id')
  public async findUserById(
    @Param('id') id: string,
    @Res() response,
  ): Promise<User> {
    const user = await this.userService.findUserById(id);
    return response.status(HttpStatus.OK).json(user);
  }

  @Get()
  public async findAllUsers(
    @Res() response
  ): Promise<User[]> {
    const users = await this.userService.findAllUsers();
    return response.status(HttpStatus.OK).json(users);
  }

  @Post()
  public async createUser(
    @Body() data: CreateUserDTO,
    @Res() response
  ): Promise<User> {
    const userCreated = await this.userService.createUser(data);
    return response.status(HttpStatus.OK).json(userCreated);
  }

  @Put(':id')
  public async updateUser(
    @Param('id') id: string,
    @Body() data: UpdateUserDTO,
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

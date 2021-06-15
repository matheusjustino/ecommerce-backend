import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) { }

  @Get()
  public findUserById(
    @Param('id') id: string
  ) {
    this.userService.findUserById(id);
  }

  @Get()
  public findAllUsers() {
    return this.userService.findAllUsers();
  }

  @Post()
  public createUser(
    @Body() data: CreateUserDTO
  ) {
    this.userService.createUser(data);
    console.log(data);
  }

  @Put()
  public updateUser(
    @Param('id') id: string,
    @Body() data: UpdateUserDTO
  ) {
    this.userService.updateUser(id, data);
  }

  @Delete()
  public deleteUser(
    @Param('id') id: string
  ) {
    this.userService.deleteUser(id);
  }
}

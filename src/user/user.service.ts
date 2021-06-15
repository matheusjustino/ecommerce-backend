import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UpdateUserDTO } from './dtos/update-user.dto';

@Injectable()
export class UserService {
  private users = [];
  constructor(){}

  public findAllUsers(): any {
    return this.users;
  }

  public createUser(data: CreateUserDTO): any {
    this.users.push(data);
  }

  public findUserById(id: string): any {
  }

  public updateUser(id: string, data: UpdateUserDTO): any {
  }

  public deleteUser(id: string): any {
  }
}

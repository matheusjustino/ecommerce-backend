import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from 'src/database/schemas/user.schema';
import { UserRepository } from '../database/repositories/user.repository';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { isValidCPF } from '@brazilian-utils/brazilian-utils';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository
  ){}

  public async findAllUsers(): Promise<User[]> {
    const users = await this.userRepository.userModel.find();
    return users;
  }

  public async createUser(data: CreateUserDTO): Promise<User> {
    const validateCPF = isValidCPF(data.legalDocument);
    console.log(validateCPF, data.legalDocument);
    if (!validateCPF) {
      throw new BadRequestException('Legal Document format not is valid.')
    }
    return await this.userRepository.userModel.create(data);
  }

  public async findUserById(id: string): Promise<User> {
    const user = this.userRepository.userModel.findById(id);
    if (!user) {
      throw new BadRequestException('User not found.');
    }
    return user;
  }

  public async updateUser(id: string, data: UpdateUserDTO): Promise<User> {
    const user = await this.userRepository.userModel.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    );
    if (!user) {
      throw new BadRequestException('User not found.');
    }
    return user;
  }

  public async deleteUser(id: string): Promise<void> {
    await this.userRepository.userModel.findByIdAndDelete(id);
  }
}

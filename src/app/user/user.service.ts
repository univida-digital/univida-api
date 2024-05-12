import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) { }

  async findAll() {
    return await this.userRepository.find({
      select: ['id', 'firstName', 'lastName', 'email', 'type', 'created_at', 'updated_at', 'deleted_at'],
    });
  }

  async findByEmail(email: string) {
    try {
      return await this.userRepository.findOneOrFail({ where: { email } });
    } catch (error) {
      throw new NotFoundException(`Not found user with email ${email}`);
    }
  }

  async findById(id: number) {
    try {
      return await this.userRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new NotFoundException(`Not found user with id ${id}`);
    }
  }

  async update(id: number, data: UserDto) {
    try {
      const user = await this.userRepository.findOneOrFail({ where: { id } });
      this.userRepository.merge(user, data);
      return await this.userRepository.save(user);
    } catch (error) {
      throw new NotFoundException(`Error in update user with id ${id}`);
    }
  }

  async create(data: UserDto) {
    const user = this.userRepository.create(data);
    return await this.userRepository.save(user);
  }

  async delete(id: number) {
    try {
      const user = await this.userRepository.findOneOrFail({ where: { id } });
      return await this.userRepository.softRemove(user);
    } catch (error) {
      throw new NotFoundException(`Error in delete user with id ${id}`);
    }
  }
}

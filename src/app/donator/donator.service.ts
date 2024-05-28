import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DonatorEntity } from './entities/donator.entity';
import { Repository } from 'typeorm';
import { DonatorDetailsDto } from './dto/donator.details.dto';
import { DonatorDto } from './dto/donator.dto';
import { DonatorDetailsEntity } from './entities/donator.details.entity';
import { ContactEntity } from 'src/shared/entities/contact.entity';

@Injectable()
export class DonatorService {
  constructor(
    @InjectRepository(DonatorEntity)
    private donatorRepository: Repository<DonatorEntity>,
    @InjectRepository(DonatorDetailsEntity)
    private donatorDetailsRepository: Repository<DonatorDetailsEntity>,
  ) { } 

  async findAll() {
    return await this.donatorRepository.find();
  }  
  
  async findById(id: number) {
    try {
      return await this.donatorRepository.findOneOrFail({ where: { id } })
    } catch (error) {
      throw new NotFoundException(`Not found user with id ${id}`);
    };
  }

  async create(data: DonatorDto) {
    try {
      const donator = this.donatorRepository.create(data);
      return await this.donatorRepository.save(donator);
    } catch (error) {
      throw new NotFoundException(`Error to create donator: ${error.message}`);
    }
  }

  async delete(id: number) {
    try {
      const donator = await this.donatorRepository.findOneOrFail({ where: { id } });
      await this.donatorRepository.softRemove(donator);
      return { message: `Donator ${id} was deleted` };
    } catch (error) {
      throw new NotFoundException(`Donator with id ${id} not found`);
    }
  }

  async update(id: number, data: DonatorDto) {
    try {
      const donator = await this.donatorRepository.findOneOrFail({ where: { id } });
      this.donatorRepository.merge(donator, data);
      return await this.donatorRepository.save(donator);
    } catch (error) {
      throw new NotFoundException(`Donator with id ${id} not found`);
    }
  }
}

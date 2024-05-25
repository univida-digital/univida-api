import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DonatorEntity } from './entities/donator.entity';
import { Repository } from 'typeorm';
import { DonatorDetailsDto } from './dto/donator.details.dto';
import { DonatorDto } from './dto/donator.dto';
import { DonatorDetailsEntity } from './entities/donator.details.entity';

@Injectable()
export class DonatorService {
  constructor(
    @InjectRepository(DonatorEntity)
    private donatorRepository: Repository<DonatorEntity>,
    @InjectRepository(DonatorDetailsEntity)
    private donatorDetailsRepository: Repository<DonatorDetailsEntity>
  ) { }

  async findAll() {
    return await this.donatorDetailsRepository.find({
      relations: ['donatorId']
    });
  }  
  
  async findById(id: number) {
    try {
      return await this.donatorRepository.findOneOrFail({ where: { id } })
    } catch (error) {
      throw new NotFoundException(`Not found user with id ${id}`);
    };
  }

  async findByIdDonatorDetails(id: number) {
    return await this.donatorDetailsRepository.findOneOrFail({ where: { id } });
  }

  async createDonatorDetails(data: DonatorDetailsDto) {
    const donatorDetails = this.donatorDetailsRepository.create(data);
    return await this.donatorDetailsRepository.save(donatorDetails);
  }

  async create(data: DonatorDto) {
    const donator = this.donatorRepository.create(data);
    return await this.donatorRepository.save(donator);
  }

  async delete(id: number) {
    try {
      const donator = await this.donatorRepository.findOneOrFail({ where: { id } });
      const donationsDetails = await this.donatorDetailsRepository.findOneOrFail({ where: { id } });
      await this.donatorDetailsRepository.softRemove(donationsDetails);
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

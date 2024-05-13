import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DonatorEntity } from './donator.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DonatorService {
  constructor(
    @InjectRepository(DonatorEntity)
    private donatorRepository: Repository<DonatorEntity>
  ) {}

  async findAll() {
    return await this.donatorRepository.find({
      select: ['id', 'firstName', 'lastName', 'cpf', 'rg', 'contact', 'address'],
      relations: ['userId']
    });
  }
  

  async findById(id: number) {
    return await this.donatorRepository.findOneOrFail({ where: { id } });
  }

  async donationsDetails(id: number) {
    return await this.donatorRepository.findOneOrFail({ where: { id } });
  }

  async createDonatorDetails() {
    return await this.donatorRepository.create();
  }

  async create(data: any) {
    console.log(data)
    const donator = this.donatorRepository.create(data);
    return await this.donatorRepository.save(donator);
  }

  async delete(id: number) {
    return await this.donatorRepository.delete(id);
  }

  async update(id: number) {
    return id;
  }

  async donations(id: number) {
    return await this.donatorRepository.findOneOrFail({ where: { id } });
  }
}

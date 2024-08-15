import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DonatorEntity } from "./entities/donator.entity";
import { Repository } from "typeorm";
import { DonatorDto } from "./dto/donator.dto";
import { DonatorQueryDto } from "./dto/donator.query.dto";
import { paginate, Pagination } from "nestjs-typeorm-paginate";

@Injectable()
export class DonatorService {
  constructor(
    @InjectRepository(DonatorEntity)
    private donatorRepository: Repository<DonatorEntity>,
  ) {}

  async getFilters(query: DonatorQueryDto) {
    const filters = {};

    if (query.firstName) filters["firstName"] = query.firstName;
    if (query.lastName) filters["lastName"] = query.lastName;
    if (query.cpf) filters["cpf"] = query.cpf;
    if (query.rg) filters["rg"] = query.rg;
    if (query.birthDate) filters["birthDate"] = query.birthDate;
    if (query.userId) filters["user.id"] = query.userId;

    return filters;
  }

  async findAll(query: DonatorQueryDto): Promise<Pagination<DonatorEntity>> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;

    const filters = await this.getFilters(query);

    return paginate<DonatorEntity>(
      this.donatorRepository,
      { page, limit },
      {
        where: filters,
      },
    );
  }

  async findById(id: number) {
    try {
      return await this.donatorRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new NotFoundException(`Not found user with id ${id}`);
    }
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

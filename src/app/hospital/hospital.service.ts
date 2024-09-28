import { InjectRepository } from "@nestjs/typeorm";
import { HospitalEntity } from "./hospital.entity";
import { Repository } from "typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { HospitalDto } from "./dto/hospital.dto";
import { HospitalQueryDto } from "./dto/hospital.query.dto";
import { paginate, Pagination } from "nestjs-typeorm-paginate";
import { getDistanceFromLatLonInKm } from "src/helpers/get.distance.helper";

@Injectable()
export class HospitalService {
  constructor(
    @InjectRepository(HospitalEntity)
    private hospitalRepository: Repository<HospitalEntity>,
  ) {}

  async getFilters(query: HospitalQueryDto) {
    const filters = {};

    if (query.cnpj) filters["cnpj"] = query.cnpj;
    if (query.hospitalType) filters["hospitalType"] = query.hospitalType;
    if (query.name) filters["name"] = query.name;
    if (query.userId) filters["user.id"] = query.userId;

    return filters;
  }

  async findAll(query: HospitalQueryDto): Promise<Pagination<HospitalEntity>> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;

    const filters = await this.getFilters(query);

    return paginate<HospitalEntity>(
      this.hospitalRepository,
      { page, limit },
      {
        where: filters,
      },
    );
  }

  async findById(id: number) {
    try {
      return await this.hospitalRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new NotFoundException(`Not found user with id ${id}`);
    }
  }

  async findNearby(lat: string, lng: string): Promise<(HospitalEntity & { distance: number })[]> {
    const hospitals = await this.hospitalRepository.find();
  
    const nearbyHospitals = hospitals
      .map((hospital) => {
        const distance = getDistanceFromLatLonInKm(
          parseFloat(lat),
          parseFloat(lng),
          parseFloat(hospital.addresses[0].lat),
          parseFloat(hospital.addresses[0].lng)
        );
  
        return {
          ...hospital,
          distance,
        };
      })
      .filter((hospital) => hospital.distance)
      .sort((a, b) => a.distance - b.distance);
  
    return nearbyHospitals;
  }

  async create(data: HospitalDto) {
    const hospital = this.hospitalRepository.create(data);
    return await this.hospitalRepository.save(hospital);
  }

  async delete(id: number) {
    try {
      const hospital = await this.hospitalRepository.findOneOrFail({
        where: { id },
      });
      await this.hospitalRepository.softRemove(hospital);
      return { message: `Hospital ${id} was deleted` };
    } catch (error) {
      throw new NotFoundException(`Hospital with id ${id} not found`);
    }
  }

  async update(id: number, data: HospitalDto) {
    try {
      const hospital = await this.hospitalRepository.findOneOrFail({
        where: { id },
      });
      this.hospitalRepository.merge(hospital, data);
      return await this.hospitalRepository.save(hospital);
    } catch (error) {
      throw new NotFoundException(`Hospital with id ${id} not found`);
    }
  }
}

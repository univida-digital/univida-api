import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { paginate, Pagination } from "nestjs-typeorm-paginate";
import { AppointmentsQueryDto } from "./dto/appointments.query.dto";
import { AppointmentsEntity } from "./entities/appointments.entity";

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(AppointmentsEntity)
    private donatorRepository: Repository<AppointmentsEntity>,
  ) {}

  async getFilters(query: AppointmentsQueryDto) {
    const filters = {};

    if (query.scheduledDate) filters["scheduledDate"] = query.scheduledDate;
    if (query.hospitalId) filters["lastName"] = query.hospitalId;
    if (query.donatorId) filters["donator.id"] = query.donatorId;
    if (query.statusId) filters["status.id"] = query.statusId;

    return filters;
  }

  async findAll(query: AppointmentsQueryDto): Promise<Pagination<AppointmentsEntity>> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;

    const filters = await this.getFilters(query);

    return paginate<AppointmentsEntity>(
      this.donatorRepository,
      { page, limit },
      {
        where: filters,
      },
    );
  }
}

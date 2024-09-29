import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppointmentsService } from './appointments.service';
import { IndexDonatorSwagger } from '../donator/swagger/index-donator.swagger';
import { AppointmentsEntity } from './entities/appointments.entity';
import { Pagination } from 'nestjs-typeorm-paginate';
import { AppointmentsQueryDto } from './dto/appointments.query.dto';

@Controller("api/v1/appointments")
@ApiTags("Appointments")
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Get()
  @ApiOperation({ summary: "Buscar agendamentos" })
  @ApiResponse({ type: IndexDonatorSwagger, isArray: true })
  async index(
    @Query() query: AppointmentsQueryDto,
  ): Promise<Pagination<AppointmentsEntity>> {
    return await this.appointmentsService.findAll(query);
  }
}

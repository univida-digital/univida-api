import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppointmentsService } from './appointments.service';
import { AppointmentsEntity } from './entities/appointments.entity';
import { Pagination } from 'nestjs-typeorm-paginate';
import { AppointmentsQueryDto } from './dto/appointments.query.dto';
import { IndexAppointmentsSwagger } from './swagger/index-appointments.swagger';
import { AppointmentsDto } from './dto/appointments.dto';

@Controller("api/v1/appointments")
@ApiTags("Appointments")
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) { }

  @Get()
  @ApiOperation({ summary: "Buscar agendamentos" })
  @ApiResponse({ type: IndexAppointmentsSwagger, isArray: true })
  async index(
    @Query() query: AppointmentsQueryDto,
  ): Promise<Pagination<AppointmentsEntity>> {
    return await this.appointmentsService.findAll(query);
  }

  @Get("availability")
  @ApiOperation({ summary: "Buscar disponibilidade de horários para um hospital e um dia específico" })
  async availability(
    @Query("hospitalId") hospitalId: number,
    @Query("scheduledDate") scheduledDate: string,
  ) {
    return await this.appointmentsService.findAvailability(hospitalId, scheduledDate);
  }

  @Post()
  @ApiOperation({ summary: "Criar agendamento" })
  async create(@Body() body: AppointmentsDto): Promise<AppointmentsEntity> {
    return await this.appointmentsService.create(body);
  }
}

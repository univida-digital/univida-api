import { BadRequestException, ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { paginate, Pagination } from "nestjs-typeorm-paginate";
import { AppointmentsQueryDto } from "./dto/appointments.query.dto";
import { AppointmentsEntity } from "./entities/appointments.entity";
import { AppointmentsDto } from "./dto/appointments.dto";
import { AppointmentsStatus } from "./entities/appointments.status.entity";

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(AppointmentsEntity)
    private AppoimentsRepository: Repository<AppointmentsEntity>,
  ) {}

  async getFilters(query: AppointmentsQueryDto) {
    const filters = {};

    if (query.scheduledDate) filters["scheduledDate"] = query.scheduledDate;
    if (query.hospitalId) filters["lastName"] = query.hospitalId;
    if (query.donatorId) filters["donator.id"] = query.donatorId;
    if (query.statusId) filters["status.id"] = query.statusId;

    return filters;
  }

  // Check if the time has already passed
  isPassedTime = (time: string, scheduledDate: string) => {
    const formattedScheduledDate = new Date(scheduledDate).toISOString().split('T')[0];
    const formattedCurrentDate = new Date().toISOString().split('T')[0];

    // If the scheduled date is before the current date, return true
    if (formattedScheduledDate < formattedCurrentDate) return true;

    // If the scheduled date is after the current date, return false
    if (formattedScheduledDate > formattedCurrentDate) return false;

    const [hour, minutes] = time.split(':').map(Number);
    const [currentHour, currentMinutes] = new Date().toLocaleTimeString().split(':').map(Number);

    return hour < currentHour || (hour === currentHour && minutes < currentMinutes);
  }

  async findAll(query: AppointmentsQueryDto): Promise<Pagination<AppointmentsEntity>> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;

    const filters = await this.getFilters(query);

    return paginate<AppointmentsEntity>(
      this.AppoimentsRepository,
      { page, limit },
      {
        where: filters,
      },
    );
  }

  async findAvailability(hospitalId: number, scheduledDate: string) {
    const appointments = await this.AppoimentsRepository.find({
      where: {
        hospital: { id: hospitalId },
        scheduledDate      
      },
    });

    const availableTimes = [];
    const busyTimes = []

    appointments.forEach((appointment) => busyTimes.push(appointment.scheduledTime));

    for (let hour = 8; hour < 18; hour++) {
      for (let minutes = 0; minutes < 60; minutes += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        if (!busyTimes.includes(time) && !this.isPassedTime(time, scheduledDate)) {
          availableTimes.push(time);
        }
      }
    }

    return availableTimes;
  }

  async create(data: AppointmentsDto): Promise<AppointmentsEntity> {
    const donatorAppointments = await this.AppoimentsRepository.find({
      where: {
        donator: { id: data.donatorId },
      },
    });
  
    const sixtyDaysAgo = new Date();
    sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);
  
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

    donatorAppointments.forEach((appointment) => {
      const isCompleted = appointment.status.id === AppointmentsStatus.COMPLETED;
      const scheduledDate = new Date(appointment.scheduledDate);
      const isMale = appointment.donator.donatorDetails.gender === "Masculino";

      if (appointment.scheduledDate === data.scheduledDate) {
        throw new ConflictException('Você já possui um agendamento para esta data.');
      }
  
      if (appointment.status.id === AppointmentsStatus.CONFIRMED) {
        throw new ConflictException(
          `Você já possui um agendamento ativo para o dia ${appointment.scheduledDate}.`
        );
      }

      if (isMale && scheduledDate > sixtyDaysAgo && isCompleted) {
        throw new ConflictException('Você já realizou uma doação nos últimos 60 dias. Tente novamente depois.');
      }
  
      if (!isMale && scheduledDate > ninetyDaysAgo && isCompleted) {
        throw new ConflictException('Você já realizou uma doação nos últimos 90 dias. Tente novamente depois.');
      }
    });

    const hospitalAppointments = await this.AppoimentsRepository.find({
      where: {
        hospital: { id: data.hospitalId },
        scheduledDate: data.scheduledDate,
      },
    });
    
    const busyTimes: string[] = [];

    hospitalAppointments.forEach((appointment) => busyTimes.push(appointment.scheduledTime));
  
    if (busyTimes.includes(data.scheduledTime)) {
      throw new ConflictException('O horário selecionado não está mais vago. Por favor, selecione outro.');
    }
  
    if (this.isPassedTime(data.scheduledTime, data.scheduledDate)) {
      throw new BadRequestException('O horário selecionado já passou. Por favor, selecione outro.');
    }
  
    const appointment = this.AppoimentsRepository.create({
      donator: { id: data.donatorId },
      hospital: { id: data.hospitalId },
      status: { id: AppointmentsStatus.CONFIRMED },
      scheduledDate: data.scheduledDate,
      scheduledTime: data.scheduledTime,
    });
  
    return await this.AppoimentsRepository.save(appointment);
  }
  
}

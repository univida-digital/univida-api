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

  async findAvailability(hospitalId: number, scheduledDate: string) {
    const appointments = await this.donatorRepository.find({
      where: {
        hospital: { id: hospitalId },
        scheduledDate      
      },
    });

    const availableTimes = [];
    const busyTimes = []

    appointments.forEach((appointment) => busyTimes.push(appointment.scheduledTime));
    
    // Check if the time has already passed
    const isPassedTime = (time: string) => {
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

    for (let hour = 8; hour < 18; hour++) {
      for (let minutes = 0; minutes < 60; minutes += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        if (!busyTimes.includes(time) && !isPassedTime(time)) {
          availableTimes.push(time);
        }
      }
    }

    return availableTimes;
  }
}

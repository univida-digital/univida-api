import { Module } from "@nestjs/common";
import { AppointmentsService } from "./appointments.service";
import { DonatorEntity } from "../donator/entities/donator.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppointmentsController } from "./appointments.controller";
import { HospitalEntity } from "../hospital/hospital.entity";
import { AppointmentsEntity } from "./entities/appointments.entity";
import { AppointmentsStatusEntity } from "./entities/appointments.status.entity";
import { CustomLogger } from "src/logger.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DonatorEntity,
      HospitalEntity,
      AppointmentsEntity,
      AppointmentsStatusEntity,
    ]),
  ],
  controllers: [AppointmentsController],
  providers: [AppointmentsService, CustomLogger],
})
export class AppointmentsModule {}

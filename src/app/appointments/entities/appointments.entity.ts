import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { DonatorDetailsEntity } from "../../donator/entities/donator.details.entity";
import { DonatorEntity } from "../../donator/entities/donator.entity";
import { HospitalEntity } from "src/app/hospital/hospital.entity";
import { AppointmentsStatusEntity } from "./appointments.status.entity";

@Entity({ schema: "appointments", name: "appointments" })
export class AppointmentsEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @OneToOne(() => DonatorEntity, { eager: true })
  @JoinColumn({ name: "donator_id" })
  donator: DonatorEntity;

  @OneToOne(() => HospitalEntity, { eager: true, cascade: true })
  @JoinColumn({ name: "hospital_id" })
  hospital: HospitalEntity;

  @OneToOne(() => DonatorDetailsEntity, { eager: true, cascade: true })
  @JoinColumn({ name: "status_id" })
  status: AppointmentsStatusEntity;

  @Column({ name: "scheduled_date" })
  @ApiProperty()
  scheduledDate: Date;

  @Column({ name: "scheduled_time" })
  @ApiProperty()
  scheduledTime: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}

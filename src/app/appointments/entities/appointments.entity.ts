import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { DonatorEntity } from "../../donator/entities/donator.entity";
import { HospitalEntity } from "src/app/hospital/hospital.entity";
import { AppointmentsStatusEntity } from "./appointments.status.entity";

@Entity({ schema: "appointments", name: "appointments" })
export class AppointmentsEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ManyToOne(() => DonatorEntity, { eager: true, cascade: true })
  @JoinColumn({ name: "donator_id" })
  donator: DonatorEntity;

  @ManyToOne(() => HospitalEntity, { eager: true, cascade: true })
  @JoinColumn({ name: "hospital_id" })
  hospital: HospitalEntity;

  @ManyToOne(() => AppointmentsStatusEntity, { eager: true, cascade: true })
  @JoinColumn({ name: "status_id" })
  status: AppointmentsStatusEntity;

  @Column({ name: "scheduled_date" })
  @ApiProperty()
  scheduledDate: string;

  @Column({ name: "scheduled_time" })
  @ApiProperty()
  scheduledTime: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}

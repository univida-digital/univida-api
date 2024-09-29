import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

export enum AppointmentsStatus {
  CONFIRMED = 1,
  CANCELLED = 2,
  EXPIRED = 3,
  REJECTED = 4,
  COMPLETED = 5,
}

@Entity({ schema: "appointments", name: "appointments_status" })
export class AppointmentsStatusEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  status: string;

  @CreateDateColumn({ name: "created_at" })
  created_at: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updated_at: Date;
}

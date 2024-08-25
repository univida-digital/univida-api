import { DonatorEntity } from "src/app/donator/entities/donator.entity";
import { HospitalEntity } from "src/app/hospital/hospital.entity";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ schema: "public", name: "contact" })
export class ContactEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => DonatorEntity, (donator) => donator.contacts)
  @JoinColumn({ name: "donator_id" })
  donator: DonatorEntity;

  @ManyToOne(() => HospitalEntity, (hospital) => hospital.contacts)
  @JoinColumn({ name: "hospital_id" })
  hospital: HospitalEntity;

  @Column()
  contact: string;

  @Column()
  emergency_contact: string;

  @Column()
  emergency_contact_name: string;

  @CreateDateColumn({ name: "created_at" })
  created_at: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updated_at: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  deleted_at: Date;
}

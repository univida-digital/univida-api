import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { DonatorEntity } from "./donator.entity";

@Entity({ schema: "public", name: "donator_details" })
export class DonatorDetailsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => DonatorEntity)
  donator: DonatorEntity;

  @Column({ name: "orientation", nullable: true })
  orientation: string;

  @Column({ name: "gender", nullable: true })
  gender: string;

  @Column({ name: "weight_kilo", nullable: true })
  weightKilo: number;

  @Column({ name: "has_allergy", nullable: true })
  hasAllergy: boolean;

  @Column({ name: "allergy_description", nullable: true })
  allergyDescription: string;

  @Column({ name: "has_active_sex_life", nullable: true })
  hasActiveSexLife: boolean;

  @Column({ name: "has_casual_active_sex_life", nullable: true })
  hasCasualActiveSexLife: boolean;

  @Column({ name: "has_tattoo", nullable: true })
  hasTattoo: boolean;

  @Column({ name: "tattoo_quantity", nullable: true })
  tattooQuantity: number;

  @Column({ name: "used_drugs", nullable: true })
  usedDrugs: boolean;

  @Column({ name: "drug_description", nullable: true })
  drugDescription: string;

  @CreateDateColumn({ name: "created_at" })
  created_at: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updated_at: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  deleted_at: Date;
}

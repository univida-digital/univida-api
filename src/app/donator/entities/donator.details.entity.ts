import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { DonatorEntity } from "./donator.entity";

@Entity({schema: 'public', name: 'donator_details'})
export class DonatorDetailsEntity {
  @PrimaryGeneratedColumn()
  id: number;
  
  @OneToOne(() => DonatorEntity)
  @JoinColumn({ name: "donator_id" })
  donatorId: number;

  @Column({ name: 'orientation' })
  orientation: string;

  @Column({ name: 'gender' })
  gender: string;

  @Column({ name: 'weight_kilo' })
  weightKilo: number;

  @Column({ name: 'has_allergy' })
  hasAllergy: boolean;

  @Column({ name: 'has_active_sex_live'})
  hasActiveSexLive: boolean;
  
  @Column({ name: 'has_tattoo' })
  hasTattoo: boolean;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;
  
  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
  
  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at: Date;
}
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { DonatorEntity } from "./donator.entity";

@Entity({schema: 'public', name: 'donator_details'})
export class DonatorDetailsEntity {
  @PrimaryGeneratedColumn()
  id: number;
  
  @OneToOne(() => DonatorEntity)
  donator: DonatorEntity;

  @Column({ name: 'orientation' })
  orientation: string;

  @Column({ name: 'gender' })
  gender: string;

  @Column({ name: 'weight_kilo' })
  weightKilo: number;

  @Column({ name: 'has_allergy' })
  hasAllergy: boolean;

  @Column({ name: 'allergy_description', nullable: true})
  allergyDescription: string;

  @Column({ name: 'has_active_sex_live', nullable: true })
  hasActiveSexLive: boolean;
  
  @Column({ name: 'has_tattoo', nullable: true })
  hasTattoo: boolean;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;
  
  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
  
  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at: Date;
}
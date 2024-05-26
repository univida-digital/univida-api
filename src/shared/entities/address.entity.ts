import { DonatorEntity } from "src/app/donator/entities/donator.entity";
import { HospitalEntity } from "src/app/hospital/hospital.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ schema: 'public', name: 'address' })
export class AddressEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  street: string;

  @Column()
  zip: string;

  @Column()
  number: number;

  @Column()
  neighborhood: string;

  @Column()
  state: string;

  @ManyToOne(() => DonatorEntity, donator => donator.addresses)
  @JoinColumn({ name: 'donator_id' })
  donator: DonatorEntity;

  @ManyToOne(() => HospitalEntity, hospital => hospital.addresses)
  @JoinColumn({ name: 'hospital_id' })
  hospital: HospitalEntity;

  @Column()
  city: string;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at: Date;
}
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "../user/user.entity";

@Entity({ schema: 'public', name: 'hospital' })
export class HospitalEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: "user_id" })
  userId: number;

  @Column()
  name: string;

  @Column()
  cnpj: string;

  @Column()
  contact: string;

  @Column({ name: "hospital_type" })
  hospitalType: string;

  @Column()
  address: string;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at: Date;
}
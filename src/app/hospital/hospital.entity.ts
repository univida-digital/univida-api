import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "../user/user.entity";
import { AddressDto } from "src/shared/dto/address.dto";
import { AddressEntity } from "src/shared/entities/address.entity";
import { ContactDto } from "src/shared/dto/contact.dto";
import { ContactEntity } from "src/shared/entities/contact.entity";

@Entity({ schema: "public", name: "hospital" })
export class HospitalEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UserEntity, { eager: true })
  @JoinColumn({ name: "user_id" })
  user: UserEntity;

  @OneToMany(() => AddressEntity, address => address.hospital, { eager: true, cascade: true })
  addresses: AddressDto[];

  @OneToMany(() => ContactEntity, contact => contact.hospital, { eager: true, cascade: true })
  contacts: ContactDto[];

  @Column()
  name: string;

  @Column()
  cnpj: string;

  @Column({ name: "hospital_type" })
  hospitalType: string;

  @CreateDateColumn({ name: "created_at" })
  created_at: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updated_at: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  deleted_at: Date;
}

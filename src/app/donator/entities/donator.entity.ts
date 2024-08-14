import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "../../user/user.entity";
import { ContactEntity } from "src/shared/entities/contact.entity";
import { DonatorDetailsEntity } from "./donator.details.entity";
import { ContactDto } from "src/shared/dto/contact.dto";
import { AddressEntity } from "src/shared/entities/address.entity";
import { AddressDto } from "src/shared/dto/address.dto";

@Entity({ schema: "public", name: "donator" })
export class DonatorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UserEntity, { eager: true })
  @JoinColumn({ name: "user_id" })
  user: UserEntity;

  @OneToOne(() => DonatorDetailsEntity, { eager: true, cascade: true })
  @JoinColumn({ name: "donator_details_id" })
  donatorDetails: DonatorDetailsEntity;

  @Column({ name: "first_name" })
  firstName: string;

  @Column({ name: "last_name" })
  lastName: string;

  @Column({ name: "birth_date", type: "date" })
  birthDate: Date;

  @Column()
  cpf: string;

  @Column()
  rg: string;

  @OneToMany(() => AddressEntity, address => address.donator, { eager: true, cascade: true })
  addresses: AddressDto[];

  @OneToMany(() => ContactEntity, contact => contact.donator, { eager: true, cascade: true })
  contacts: ContactDto[];

  @CreateDateColumn({ name: "created_at" })
  created_at: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updated_at: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  deleted_at: Date;
}

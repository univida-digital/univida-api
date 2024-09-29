import { UserEntity } from "src/app/user/user.entity";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ schema: "notification", name: "email_validation" })
export class EmailValidationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: "user_id" })
  user: UserEntity;

  @Column({ name: "validation_code" })
  validationCode: number;

  @Column({ name: "is_validated", default: false })
  isValidated: boolean;

  @Column({ name: "expiration_date", nullable: true })
  expirationDate: Date;

  @CreateDateColumn({ name: "created_at" })
  created_at: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updated_at: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  deleted_at: Date;
}

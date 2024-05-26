import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { hashSync } from 'bcryptjs';
import { DonatorEntity } from "../donator/entities/donator.entity";
import { HospitalEntity } from "../hospital/hospital.entity";

@Entity({schema: 'public', name: 'user'})
export class UserEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column({ name: 'type' })
    type: string;

    @OneToOne(() => DonatorEntity)
    donator: DonatorEntity;

    @OneToOne(() => HospitalEntity)
    hospital: HospitalEntity;

    @Column()
    password: string;
    
    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;
    
    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: Date;
    
    @DeleteDateColumn({ name: 'deleted_at' })
    deleted_at: Date;

    // Mudar o before update caso dê algum problema 
    @BeforeInsert()
    @BeforeUpdate()
    hashPassword(){
        this.password = hashSync(this.password, 10);
    }
}

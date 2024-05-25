import { Module } from '@nestjs/common';
import { HospitalController } from './hospital.controller';
import { HospitalService } from './hospital.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HospitalEntity } from './hospital.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HospitalEntity])],
  controllers: [HospitalController],
  providers: [HospitalService]
})
export class HospitalModule {}

import { Module } from '@nestjs/common';
import { DonatorController } from './donator.controller';
import { DonatorService } from './donator.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DonatorEntity } from './entities/donator.entity';
import { DonatorDetailsEntity } from './entities/donator.details.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DonatorEntity, DonatorDetailsEntity])],
  controllers: [DonatorController],
  providers: [DonatorService]
})
export class DonatorModule { }

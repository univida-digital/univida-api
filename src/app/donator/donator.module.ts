import { Module } from '@nestjs/common';
import { DonatorController } from './donator.controller';
import { DonatorService } from './donator.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DonatorEntity } from './donator.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DonatorEntity])],
  controllers: [DonatorController],
  providers: [DonatorService]
})
export class DonatorModule {}

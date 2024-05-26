import { Module } from '@nestjs/common';
import { DonatorController } from './donator.controller';
import { DonatorService } from './donator.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DonatorEntity } from './entities/donator.entity';
import { DonatorDetailsEntity } from './entities/donator.details.entity';
import { AddressEntity } from 'src/shared/entities/address.entity';
import { ContactEntity } from 'src/shared/entities/contact.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DonatorEntity, DonatorDetailsEntity, AddressEntity, ContactEntity])],
  controllers: [DonatorController],
  providers: [DonatorService]
})
export class DonatorModule { }

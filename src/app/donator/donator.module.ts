import { Module } from '@nestjs/common';
import { DonatorController } from './donator.controller';
import { DonatorService } from './donator.service';

@Module({
  controllers: [DonatorController],
  providers: [DonatorService]
})
export class DonatorModule {}

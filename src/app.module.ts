import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserModule } from './app/user/user.module';
import { AuthModule } from './auth/auth.module';
import { DonatorModule } from './app/donator/donator.module';
import { HospitalModule } from './app/hospital/hospital.module';
import { dataSourceOptions } from 'db/data-source';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(dataSourceOptions),
    UserModule,
    AuthModule,
    DonatorModule,
    HospitalModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}

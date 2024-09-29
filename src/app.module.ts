import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { UserModule } from "./app/user/user.module";
import { AuthModule } from "./auth/auth.module";
import { DonatorModule } from "./app/donator/donator.module";
import { HospitalModule } from "./app/hospital/hospital.module";
import { NotificationModule } from "./app/notification/notification.module";
import { AppointmentsModule } from "./app/appointments/appointments.module";
import { CustomLogger } from "./logger.service";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.TYPEORM_CONNECTION as any,
      host: process.env.TYPEORM_HOST,
      port: parseInt(process.env.TYPEORM_PORT, 10),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      migrations: [__dirname + "/migrations/*{.ts,.js}"],
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      migrationsRun: true,
    } as TypeOrmModuleOptions),
    UserModule,
    AuthModule,
    DonatorModule,
    HospitalModule,
    NotificationModule,
    AppointmentsModule,
  ],
  controllers: [],
  providers: [CustomLogger],
  exports: [CustomLogger],
})
export class AppModule {}

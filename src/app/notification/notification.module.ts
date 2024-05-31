import { Module } from "@nestjs/common";
import { NotificationController } from "./notification.controller";
import { NotificationService } from "./notification.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EmailValidationEntity } from "./entity/email.validation.entity";
import { UserModule } from "../user/user.module";

@Module({
  imports: [TypeOrmModule.forFeature([EmailValidationEntity]), UserModule],
  controllers: [NotificationController],
  providers: [NotificationService],
})

export class NotificationModule {}

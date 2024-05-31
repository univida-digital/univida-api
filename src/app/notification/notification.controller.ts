import { Body, Controller, Post } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { EmailValidationDto } from './dto/email.validation.dto';
import { SendEmailDto } from './dto/send.email.dto';

@Controller('api/v1/notification')
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService
  ) {}

  @Post('/send-email')
  async sendEmail(@Body() body: SendEmailDto){
    return await this.notificationService.sendEmail(body.email);
  }

  @Post('/validate-email')
  async validateEmail(@Body() body: EmailValidationDto) {
    return await this.notificationService.validateEmail(body);
  }

}

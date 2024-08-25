import { Body, Controller, Post } from "@nestjs/common";
import { NotificationService } from "./notification.service";
import { EmailValidationDto } from "./dto/email.validation.dto";
import { SendEmailDto } from "./dto/send.email.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@Controller("api/v1/notification")
@ApiTags("Notification")
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post("/send-email")
  @ApiOperation({ summary: "Enviar e-mail para usuario" })
  async sendEmail(@Body() body: SendEmailDto) {
    return await this.notificationService.sendEmail(body.email);
  }

  @Post("/validate-email")
  @ApiOperation({ summary: "Validar e-mail" })
  async validateEmail(@Body() body: EmailValidationDto) {
    return await this.notificationService.validateEmail(body);
  }
}

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { EmailValidationEntity } from './entity/email.validation.entity';
import { EmailValidationDto } from './dto/email.validation.dto';
import { config as dotenvConfig } from 'dotenv';
import { ExpiredValidationCodeException, InvalidValidationCodeException } from 'src/exceptions';

dotenvConfig();

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(EmailValidationEntity)
    private emailValidationRepository: Repository<EmailValidationEntity>,

    private readonly userService: UserService
  ) { }

  private generateRandomCode() {
    const min = 10000;
    const max = 99999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private transporter = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });


  async validateEmail(data: EmailValidationDto) {
    const emailValidation = await this.emailValidationRepository.findOne({
      where: {
        user: { id: data.user_id },
        validationCode: data.validationCode,
      },
    });

    if (!emailValidation) {
      throw new BadRequestException('Invalid validation code');
    }

    if (emailValidation.expirationDate && emailValidation.expirationDate < new Date()) {
      throw new ExpiredValidationCodeException('Validation code has expired');
    }

    emailValidation.isValidated = true;

    await this.emailValidationRepository.save(emailValidation);

    return { message: 'Email validated successfully' };
  }

  async sendEmail(email: string) {
    try {
      const user = await this.userService.findByEmail(email);

      const randomCode = this.generateRandomCode();
      
      try {
        await this.transporter.sendMail({
          from: process.env.MAIL_USER,
          to: user.email,
          subject: 'Código de validação',
          text: 'Seu código de validação é: ' + randomCode,
        });
      } catch (error) {
        throw new BadRequestException(`Error sending email: ${error}`);
      }
      
      const emailValidation = new EmailValidationEntity();

      const expirationTimeInMinutes = 5;
      const expirationDate = new Date();
      expirationDate.setMinutes(expirationDate.getMinutes() + expirationTimeInMinutes);

      emailValidation.user = user;
      emailValidation.validationCode = randomCode;
      emailValidation.expirationDate = expirationDate;

      await this.emailValidationRepository.save(emailValidation);

      return { message: `Email to user ${user.id} sent successfully` };
    } catch (error) {
      throw new NotFoundException(`User not found: ${error}`);
    }
  }
}

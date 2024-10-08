import { IsNotEmpty } from "class-validator";

export class SendEmailDto {
  @IsNotEmpty()
  email: string;
}

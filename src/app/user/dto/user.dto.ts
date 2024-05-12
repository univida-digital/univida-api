import { IsEmail, IsNotEmpty, Matches } from "class-validator";
import { messagesHelper } from "src/helpers/message.helper";
import { regExHelper } from "src/helpers/regex.helper";

export class UserDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;
  
  @IsNotEmpty()
  type: string;
  
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Matches(regExHelper.password, { message: messagesHelper.PASSWORD_VALID })
  password: string;
}
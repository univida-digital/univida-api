import { IsNotEmpty } from "class-validator";
import { UserEntity } from "src/app/user/user.entity";

export class EmailValidationDto {
  @IsNotEmpty()
  user_id: number;
    
  @IsNotEmpty()
  validationCode: number;
}
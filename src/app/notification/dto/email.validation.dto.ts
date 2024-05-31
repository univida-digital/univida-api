import { IsNotEmpty } from "class-validator";
import { UserEntity } from "src/app/user/user.entity";

export class EmailValidationDto {
  @IsNotEmpty()
  user: UserEntity;
    
  @IsNotEmpty()
  validationCode: number;
}
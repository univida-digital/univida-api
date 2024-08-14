import { IsNotEmpty } from "class-validator";
import { UserEntity } from "src/app/user/user.entity";
import { AddressDto } from "src/shared/dto/address.dto";
import { ContactDto } from "src/shared/dto/contact.dto";

export class HospitalDto {
  @IsNotEmpty()
  user: UserEntity;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  cnpj: string;

  @IsNotEmpty()
  hospitalType: string;

  @IsNotEmpty()
  contacts: ContactDto[];

  @IsNotEmpty()
  addresses: AddressDto[];
}

import { IsNotEmpty, IsOptional } from "class-validator";
import { ContactDto } from "src/shared/dto/contact.dto";
import { UserEntity } from "src/app/user/user.entity";
import { DonatorDetailsDto } from "./donator.details.dto";
import { AddressDto } from "src/shared/dto/address.dto";

export class DonatorDto {
  @IsOptional()
  donatorDetailsId: number;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;
  
  @IsNotEmpty()
  cpf: string;

  @IsNotEmpty()
  rg: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  contacts: ContactDto[];

  @IsNotEmpty()
  addresses: AddressDto[];

  @IsNotEmpty()
  donatorDetails: DonatorDetailsDto;

  @IsNotEmpty()
  user: UserEntity;
}
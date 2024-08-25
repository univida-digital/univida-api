import { IsNotEmpty, IsOptional } from "class-validator";
import { ContactDto } from "src/shared/dto/contact.dto";
import { UserEntity } from "src/app/user/user.entity";
import { DonatorDetailsDto } from "./donator.details.dto";
import { AddressDto } from "src/shared/dto/address.dto";
import { ApiProperty } from "@nestjs/swagger";

export class DonatorDto {
  @IsOptional()
  @ApiProperty()
  donatorDetailsId: number;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  @ApiProperty()
  lastName: string;

  @IsNotEmpty()
  @ApiProperty()
  cpf: string;

  @IsNotEmpty()
  @ApiProperty()
  rg: string;

  @IsNotEmpty()
  @ApiProperty()
  contacts: ContactDto[];

  @IsNotEmpty()
  @ApiProperty()
  addresses: AddressDto[];

  @IsNotEmpty()
  @ApiProperty()
  donatorDetails: DonatorDetailsDto;

  @IsNotEmpty()
  @ApiProperty()
  birthDate: Date;

  @IsNotEmpty()
  @ApiProperty()
  user: UserEntity;
}

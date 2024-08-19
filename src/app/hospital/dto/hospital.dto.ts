import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { UserEntity } from "src/app/user/user.entity";
import { AddressDto } from "src/shared/dto/address.dto";
import { ContactDto } from "src/shared/dto/contact.dto";

export class HospitalDto {
  @IsNotEmpty()
  @ApiProperty()
  user: UserEntity;

  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  cnpj: string;

  @IsNotEmpty()
  @ApiProperty()
  hospitalType: string;

  @IsNotEmpty()
  @ApiProperty()
  contacts: ContactDto[];

  @IsNotEmpty()
  @ApiProperty()
  addresses: AddressDto[];
}

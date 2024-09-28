import { IsNotEmpty, IsOptional } from "class-validator";

export class AddressDto {
  @IsNotEmpty()
  street: string;

  @IsNotEmpty()
  zip: string;

  @IsNotEmpty()
  number: number;

  @IsNotEmpty()
  neighborhood: string;

  @IsNotEmpty()
  state: string;

  @IsNotEmpty()
  city: string;

  @IsOptional()
  lat: string;

  @IsOptional()
  lng: string;
}

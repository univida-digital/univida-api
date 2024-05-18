import { IsInt, IsNotEmpty, IsOptional, isInt } from "class-validator";

export class DonatorDto {
  @IsOptional()
  donatorDetailsId: number;

  @IsInt()
  userId: number;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;
  
  @IsNotEmpty()
  cpf: string;

  @IsNotEmpty()
  rg: string;

  @IsNotEmpty()
  contact: string;

  @IsNotEmpty()
  address: string;
}
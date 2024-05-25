import { IsInt, IsNotEmpty, IsOptional, isInt } from "class-validator";

export class HospitalDto {
  @IsInt()
  userId: number;
   
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  cnpj: string;

  @IsNotEmpty()
  hospitalType: string;

  @IsNotEmpty()
  contact: string;

  @IsNotEmpty()
  address: string;
}
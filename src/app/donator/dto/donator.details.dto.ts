import { IsNotEmpty, IsOptional } from "class-validator";

export class DonatorDetailsDto {
  @IsOptional()
  donatorId: number;

  @IsNotEmpty()
  orientation: string;

  @IsNotEmpty()
  gender: string;

  @IsNotEmpty()
  weightKilo: number;

  @IsNotEmpty()
  hasAllergy: boolean;
  
  @IsNotEmpty()
  hasActiveSexLive: boolean;
  
  @IsNotEmpty()
  hasTattoo: boolean;

  @IsOptional()
  allergyDescription: string;
}
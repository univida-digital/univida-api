import { IsNotEmpty, IsOptional } from "class-validator";
import { DonatorEntity } from "../entities/donator.entity";

export class DonatorDetailsDto {
  @IsNotEmpty()
  donator: DonatorEntity;

  @IsNotEmpty()
  orientation: string;

  @IsNotEmpty()
  gender: string;

  @IsNotEmpty()
  weightKilo: number;

  @IsNotEmpty()
  hasAllergy: boolean;
  
  @IsNotEmpty()
  hasActiveSexLife: boolean;

  @IsOptional()
  hasCasualActiveSexLife: boolean;

  @IsNotEmpty()
  usedDrugs: boolean;

  @IsOptional()
  drugDescription: string;
  
  @IsNotEmpty()
  hasTattoo: boolean;

  @IsOptional()
  tattooQuantity: number;

  @IsOptional()
  allergyDescription: string;
}
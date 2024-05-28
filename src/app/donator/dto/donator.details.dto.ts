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
  hasActiveSexLive: boolean;
  
  @IsNotEmpty()
  hasTattoo: boolean;

  @IsOptional()
  allergyDescription: string;
}
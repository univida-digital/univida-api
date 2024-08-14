import { IsOptional } from "class-validator";

export class DonatorQueryDto {
  @IsOptional()
  firstName?: string;

  @IsOptional()
  lastName?: string;

  @IsOptional()
  cpf?: string;

  @IsOptional()
  rg?: string;

  @IsOptional()
  birthDate?: string;

  @IsOptional()
  userId?: number;

  @IsOptional()
  page?: number;

  @IsOptional()
  limit?: number;
}

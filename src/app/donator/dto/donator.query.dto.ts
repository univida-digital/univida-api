import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class DonatorQueryDto {
  @IsOptional()
  @ApiPropertyOptional()
  firstName?: string;

  @IsOptional()
  @ApiPropertyOptional()
  lastName?: string;

  @IsOptional()
  @ApiPropertyOptional()
  cpf?: string;

  @IsOptional()
  @ApiPropertyOptional()
  rg?: string;

  @IsOptional()
  @ApiPropertyOptional()
  birthDate?: string;

  @IsOptional()
  @ApiPropertyOptional()
  userId?: number;

  @IsOptional()
  @ApiPropertyOptional()
  page?: number;

  @IsOptional()
  @ApiPropertyOptional()
  limit?: number;
}

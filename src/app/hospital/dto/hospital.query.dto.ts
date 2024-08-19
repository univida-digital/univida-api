import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class HospitalQueryDto {
  @IsOptional()
  @ApiPropertyOptional()
  name?: string;

  @IsOptional()
  @ApiPropertyOptional()
  cnpj?: string;

  @IsOptional()
  @ApiPropertyOptional()
  hospitalType?: string;

  @IsOptional()
  @ApiPropertyOptional()
  userId?: string;

  @IsOptional()
  @ApiPropertyOptional()
  page?: number;

  @IsOptional()
  @ApiPropertyOptional()
  limit?: number;
}

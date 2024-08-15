import { IsOptional } from "class-validator";

export class HospitalQueryDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  cnpj?: string;

  @IsOptional()
  hospitalType?: string;

  @IsOptional()
  userId?: string;

  @IsOptional()
  page?: number;

  @IsOptional()
  limit?: number;
}

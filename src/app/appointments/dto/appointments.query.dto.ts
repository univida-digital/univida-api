import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class AppointmentsQueryDto {
  @IsOptional()
  @ApiPropertyOptional()
  donatorId?: number;

  @IsOptional()
  @ApiPropertyOptional()
  hospitalId?: number;

  @IsOptional()
  @ApiPropertyOptional()
  scheduledDate?: string;

  @IsOptional()
  @ApiPropertyOptional()
  statusId?: number;

  @IsOptional()
  @ApiPropertyOptional()
  page?: number;

  @IsOptional()
  @ApiPropertyOptional()
  limit?: number;
}

import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class AppointmentsDto {
  @IsNumber()
  @ApiProperty()
  donatorId: number;

  @IsNumber()
  @ApiProperty()
  hospitalId: number;

  @IsString()
  @ApiProperty()
  scheduledDate: string;

  @IsString()
  @ApiProperty()
  scheduledTime: string;
}

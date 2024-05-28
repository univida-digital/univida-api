import { IsNotEmpty, IsOptional } from "class-validator";

export class ContactDto {
  @IsNotEmpty()
  contact: string;

  @IsOptional()
  emergency_contact: string;

  @IsOptional()
  emergency_contact_name: string;
}
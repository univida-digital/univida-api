import {
  IPaginationLinks,
  IPaginationMeta,
  Pagination,
} from "nestjs-typeorm-paginate";
import { ApiProperty } from "@nestjs/swagger";
import { AppointmentsEntity } from "src/app/appointments/entities/appointments.entity";

export class IndexAppointmentsSwagger implements Pagination<AppointmentsEntity> {
  meta: IPaginationMeta;
  items: AppointmentsEntity[];
  links?: IPaginationLinks;
  @ApiProperty({ type: [AppointmentsEntity], description: "Lista de agendamentos" })
  data: AppointmentsEntity[];
}
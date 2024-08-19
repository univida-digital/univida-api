import {
  IPaginationLinks,
  IPaginationMeta,
  Pagination,
} from "nestjs-typeorm-paginate";
import { HospitalEntity } from "../hospital.entity";
import { ApiProperty } from "@nestjs/swagger";

export class IndexHospitalSwagger implements Pagination<HospitalEntity> {
  meta: IPaginationMeta;
  items: HospitalEntity[];
  links?: IPaginationLinks;
  @ApiProperty({ type: [HospitalEntity], description: "Lista de hospitais" })
  data: HospitalEntity[];
}

import {
  IPaginationLinks,
  IPaginationMeta,
  Pagination,
} from "nestjs-typeorm-paginate";
import { ApiProperty } from "@nestjs/swagger";
import { DonatorEntity } from "../entities/donator.entity";

export class IndexDonatorSwagger implements Pagination<DonatorEntity> {
  meta: IPaginationMeta;
  items: DonatorEntity[];
  links?: IPaginationLinks;
  @ApiProperty({ type: [DonatorEntity], description: "Lista de doadores" })
  data: DonatorEntity[];
}

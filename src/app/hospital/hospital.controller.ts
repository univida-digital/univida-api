import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { HospitalService } from "./hospital.service";
import { HospitalDto } from "./dto/hospital.dto";
import { HospitalQueryDto } from "./dto/hospital.query.dto";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { IndexHospitalSwagger } from "./swagger/index-hospital.swagger";
import { HospitalEntity } from "./hospital.entity";
import { Pagination } from "nestjs-typeorm-paginate";

@Controller("api/v1/hospital")
@ApiTags(`Hospital`)
export class HospitalController {
  constructor(private readonly hospitalService: HospitalService) {}

  @Get()
  @ApiOperation({ summary: "Buscar Hospital" })
  @ApiResponse({ type: IndexHospitalSwagger, isArray: true })
  async index(
    @Query() query: HospitalQueryDto,
  ): Promise<Pagination<HospitalEntity>> {
    return await this.hospitalService.findAll(query);
  }

  @Get(":id")
  @ApiOperation({ summary: "Buscar Hospital por id" })
  @ApiParam({ name: "id", required: false, description: "ID do hospital" })
  async show(id: number) {
    return await this.hospitalService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: "Criar Hospital" })
  async create(@Body() body: HospitalDto) {
    return await this.hospitalService.create(body);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Deletar Hospital" })
  async delete(@Param("id") id: number) {
    return await this.hospitalService.delete(id);
  }

  @Put(":id")
  @ApiOperation({ summary: "Atualizar Hospital" })
  async update(@Param("id") id: number, @Body() body: HospitalDto) {
    return await this.hospitalService.update(id, body);
  }
}

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
import { DonatorService } from "./donator.service";
import { DonatorDto } from "./dto/donator.dto";
import { DonatorQueryDto } from "./dto/donator.query.dto";
import { DonatorEntity } from "./entities/donator.entity";
import { Pagination } from "nestjs-typeorm-paginate";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { IndexDonatorSwagger } from "./swagger/index-donator.swagger";

@Controller("api/v1/donator")
@ApiTags("Donator")
export class DonatorController {
  constructor(private readonly donatorService: DonatorService) {}

  @Get()
  @ApiOperation({ summary: "Buscar doador" })
  @ApiResponse({ type: IndexDonatorSwagger, isArray: true })
  async index(
    @Query() query: DonatorQueryDto,
  ): Promise<Pagination<DonatorEntity>> {
    return await this.donatorService.findAll(query);
  }

  @Get(":id")
  @ApiOperation({ summary: "Buscar doador por id" })
  @ApiParam({ name: "id", required: false, description: "ID do donator" })
  async show(id: number) {
    return await this.donatorService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: "Criar novo doador" })
  async create(@Body() body: DonatorDto) {
    return await this.donatorService.create(body);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Deletar doador" })
  async delete(@Param("id") id: number) {
    return await this.donatorService.delete(id);
  }

  @Put(":id")
  @ApiOperation({ summary: "Atualizar doador" })
  async update(@Param("id") id: number, @Body() body: DonatorDto) {
    return await this.donatorService.update(id, body);
  }
}

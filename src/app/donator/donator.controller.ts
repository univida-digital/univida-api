import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { DonatorService } from "./donator.service";
import { DonatorDto } from "./dto/donator.dto";
import { DonatorQueryDto } from "./dto/donator.query.dto";
import { DonatorEntity } from "./entities/donator.entity";
import { Pagination } from "nestjs-typeorm-paginate";

@Controller("api/v1/donator")
export class DonatorController {
  constructor(private readonly donatorService: DonatorService) {}

  @Get()
  async index(@Query() query: DonatorQueryDto): Promise<Pagination<DonatorEntity>> {
    return await this.donatorService.findAll(query);
  }

  @Get(":id")
  async show(id: number) {
    return await this.donatorService.findById(id);
  }

  @Post()
  async create(@Body() body: DonatorDto) {
    return await this.donatorService.create(body);
  }

  @Delete(":id")
  async delete(@Param("id") id: number) {
    return await this.donatorService.delete(id);
  }

  @Put(":id")
  async update(@Param("id") id: number, @Body() body: DonatorDto) {
    return await this.donatorService.update(id, body);
  }
}

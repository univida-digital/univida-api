import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { HospitalService } from "./hospital.service";
import { HospitalDto } from "./dto/hospital.dto";
import { HospitalQueryDto } from "./dto/hospital.query.dto";

@Controller("api/v1/hospital")
export class HospitalController {
  constructor(private readonly hospitalService: HospitalService) {}

  @Get()
  async index(@Query() query: HospitalQueryDto) {
    return await this.hospitalService.findAll(query);
  }

  @Get(":id")
  async show(id: number) {
    return await this.hospitalService.findById(id);
  }

  @Post()
  async create(@Body() body: HospitalDto) {
    return await this.hospitalService.create(body);
  }

  @Delete(":id")
  async delete(@Param("id") id: number) {
    return await this.hospitalService.delete(id);
  }

  @Put(":id")
  async update(@Param("id") id: number, @Body() body: HospitalDto) {
    return await this.hospitalService.update(id, body);
  }
}

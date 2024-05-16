import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { DonatorService } from './donator.service';
import { DonatorEntity } from './entities/donator.entity';
import { DonatorDto } from './dto/donator.dto';
import { DonatorDetailsDto } from './dto/donator.details.dto';

@Controller('api/v1/donator')
export class DonatorController {
  constructor(private readonly donatorService: DonatorService) { }

  @Get()
  async index() {
    return await this.donatorService.findAll();
  }

  @Get(':id')
  async show(id: number) {
    return await this.donatorService.findById(id);
  }

  @Get('details/:id')
  async donationsDetails(id: number) {
    return await this.donatorService.findByIdDonatorDetails(id);
  }

  @Post('details')
  async createDonatorDetails(@Body() body: DonatorDetailsDto) {
    return await this.donatorService.createDonatorDetails(body);
  }

  @Post()
  async create(@Body() body: DonatorDto) {
    return await this.donatorService.create(body);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.donatorService.delete(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: DonatorDto){
    return await this.donatorService.update(id, body);
  }
}

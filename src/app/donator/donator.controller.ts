import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { DonatorService } from './donator.service';
import { DonatorEntity } from './donator.entity';

@Controller('api/v1/donator')
export class DonatorController {
  constructor( private readonly donatorService: DonatorService ) {}

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
    return await this.donatorService.donationsDetails(id);
  }

  @Post('details')
  async createDonatorDetails() {
    return await this.donatorService.createDonatorDetails();
  }

  @Post()
  async create(@Body() body: any) {
    return await this.donatorService.create(body);
  }

  @Delete(':id')
    async delete(id: number) {
      return await this.donatorService.delete(id);
    }

  @Put(':id')
    async update(id: number) {
      return await this.donatorService.update(id);
    }
  }

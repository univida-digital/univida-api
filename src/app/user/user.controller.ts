import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDto } from "./dto/user.dto";
import { AuthGuard } from "@nestjs/passport";

@Controller("api/v1/user")
// @UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async index() {
    return await this.userService.findAll();
  }

  @Post()
  async create(@Body() body: UserDto) {
    return await this.userService.create(body);
  }

  @Get(":id")
  async show(@Param("id") id: number) {
    return await this.userService.findById(id);
  }

  @Put(":id")
  async update(@Param("id") id: number, @Body() body: UserDto) {
    return await this.userService.update(id, body);
  }

  @Delete(":id")
  async delete(@Param("id") id: number) {
    return await this.userService.delete(id);
  }
}

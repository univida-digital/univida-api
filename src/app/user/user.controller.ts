import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDto } from "./dto/user.dto";
import { AuthGuard } from "@nestjs/passport";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { IndexUserSwagger } from "./swagger/index-user.swagger";

@Controller("api/v1/user")
// @UseGuards(AuthGuard('jwt'))
@ApiTags("User")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: "Listar todos os usuarios" })
  @ApiResponse({ type: IndexUserSwagger, isArray: true })
  async index() {
    return await this.userService.findAll();
  }

  @Post()
  @ApiOperation({ summary: "Adicionar novos usuarios" })
  async create(@Body() body: UserDto) {
    return await this.userService.create(body);
  }

  @Get(":id")
  @ApiOperation({ summary: "Buscar usuarios por id" })
  async show(@Param("id") id: number) {
    return await this.userService.findById(id);
  }

  @Put(":id")
  @ApiOperation({ summary: "Atualizar usuario existente" })
  async update(@Param("id") id: number, @Body() body: UserDto) {
    return await this.userService.update(id, body);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Deletar usuarios" })
  async delete(@Param("id") id: number) {
    return await this.userService.delete(id);
  }
}

import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../entities/usuario.entity';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth-guard';

@Controller('/usuario')
export class UsuarioController {

  constructor(private readonly usuarioService: UsuarioService) {}

  @Post("/cadastrar")
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() usuario: Usuario
  ): Promise<Usuario> {
    return await this.usuarioService.create(usuario);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/all")
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Usuario[]> {
    return await this.usuarioService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async findById(
    @Param('id', ParseIntPipe) id: number
  ): Promise<Usuario> {
    return await this.usuarioService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put("/atualizar")
  @HttpCode(HttpStatus.OK)
  async update(
    @Body() usuario: Usuario
  ): Promise<Usuario> {
    return await this.usuarioService.update(usuario);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/deletar/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('id', ParseIntPipe) id: number
  ) {
    return await this.usuarioService.remove(id);
  }
}

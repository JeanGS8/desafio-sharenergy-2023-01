import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../entities/usuario.entity';

@Controller('/usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  create(
    @Body() usuario: Usuario
  ) {
    return this.usuarioService.create(usuario);
  }

  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

  @Get('/:id')
  findById(
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.usuarioService.findById(id);
  }

  @Put()
  update(
    @Body() usuario: Usuario
  ) {
    return this.usuarioService.update(usuario);
  }

  @Delete('/:id')
  remove(
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.usuarioService.remove(id);
  }
}

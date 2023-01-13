import { Bcrypt } from './../auth/bcrypt/bcrypt';
import { Module } from '@nestjs/common';
import { UsuarioService } from './services/usuario.service';
import { UsuarioController } from './controllers/usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario])],
  exports: [UsuarioService],
  controllers: [UsuarioController],
  providers: [UsuarioService, Bcrypt]
})
export class UsuarioModule {}

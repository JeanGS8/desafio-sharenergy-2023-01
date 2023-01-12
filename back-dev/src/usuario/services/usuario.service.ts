import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Usuario } from '../entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsuarioService {

  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>
  ){}

  async create(usuario: Usuario) {

    return await this.usuarioRepository.save(usuario);
  }

  async findAll() {

    return await this.usuarioRepository.find();
  }

  async findById(id: number) {

    let escolhaUsuario = await this.usuarioRepository.findOne({
      where: {
        id
      }
    })

    if(!escolhaUsuario || !id)
      throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);
    return escolhaUsuario;
  }

  async update(usuario: Usuario) {

    let escolhaUsuario: Usuario = await this.findById(usuario.id);

    if(!escolhaUsuario || !usuario.id)
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    return await this.usuarioRepository.save(usuario)
  }

  async remove(id: number) {

    let escolhaUsuario: Usuario = await this.findById(id);
    if(!escolhaUsuario || !id)
      throw new HttpException("Usuário não existe!", HttpStatus.BAD_REQUEST)
    return await this.usuarioRepository.delete(id);
  }
}

import { Usuario } from '../entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Bcrypt } from '../../auth/bcrypt/bcrypt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class UsuarioService {

  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    private bcrypt: Bcrypt
  ){}
  
  async findByUsuario(username: string): Promise<Usuario | undefined>{

    return await this.usuarioRepository.findOne({
      where: {
        username: username
      }
    })
  }

  async create(usuario: Usuario): Promise<Usuario> {

    let buscaUsuario = await this.findByUsuario(usuario.username);

    if(!buscaUsuario){
      usuario.password = await this.bcrypt.criptografarSenha(usuario.password);
      return await this.usuarioRepository.save(usuario);
    }
    throw new HttpException('Usuário já existe!', HttpStatus.BAD_REQUEST);
  }

  async findAll(): Promise<Usuario[]> {

    return await this.usuarioRepository.find();
  }

  async findById(id: number): Promise<Usuario> {

    let buscausuario = await this.usuarioRepository.findOne({
      where: {
        id
      }
    })

    if(!buscausuario)
      throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);
    return buscausuario;
  }

  async update(usuario: Usuario): Promise<Usuario> {

    let updateUsuario: Usuario = await this.findById(usuario.id);
    let buscaUsuario = await this.findByUsuario(usuario.username);

    if(!updateUsuario)
      throw new HttpException('Usuario não encontrado!', HttpStatus.NOT_FOUND);

    if(usuario && buscaUsuario.id !== usuario.id)
      throw new HttpException('username já cadastrado, digite outro!', HttpStatus.BAD_REQUEST);
    
    usuario.password = await this.bcrypt.criptografarSenha(usuario.password)
    return await this.usuarioRepository.save(usuario);
  }

  async remove(id: number): Promise<DeleteResult> {

    let buscausuario: Usuario = await this.findById(id);
    if(!buscausuario || !id)
      throw new HttpException("Usuário não existe!", HttpStatus.BAD_REQUEST)
    return await this.usuarioRepository.delete(id);
  }
}

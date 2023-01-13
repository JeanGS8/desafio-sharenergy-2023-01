import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsuarioService } from "../../usuario/services/usuario.service";
import { Bcrypt } from "../bcrypt/bcrypt";

@Injectable()
export class AuthService {
    constructor(
        private usuarioService: UsuarioService,
        private jwtService: JwtService,
        private bcrypt: Bcrypt
    ) {}
    
    async validateUser(username: string, password: string): Promise<any> {
        const buscaUsuario = await this.usuarioService.findByUsuario(username);

        if (!buscaUsuario)
            throw new HttpException('Usuario não encontrado! ', HttpStatus.NOT_FOUND);

        const match = await this.bcrypt.compararSenhas(buscaUsuario.password, password);

        if (buscaUsuario && match) {
            const { password, ...result } = buscaUsuario;
            return result;
        }
        return null;
    }
    /**
     * @disc Loga o usuario no sistema
     * @returns Gera um token para que seja possivel fazer o login
     */
    async login(usuarioLogin: any) {
        const payload = {
            username: usuarioLogin.usuario,
            sub: 'backdev'
        };
        return{
            usuario: usuarioLogin.username,
            token: `Bearer ${this.jwtService.sign(payload)}`
        }
    }
}
export default interface UsuarioLogin{
  id: number,
  username: string,
  password: string,
  remember: boolean,
  token: string
}
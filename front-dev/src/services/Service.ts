import axios from "axios";
import UsuarioLogin from "../models/usuarioLogin";

export const api = axios.create({
  baseURL: 'http://localhost:4000'
})

export const login = async (url: string, dados: {username: string, password: string}, setDado: React.Dispatch<string>) => {
  const resposta = await api.post(url, dados);
  setDado(resposta.data.token);
}

export const cadastroUsuario = async (url: string, dados: {username: string, password: string}, setDado:React.Dispatch<React.SetStateAction<UsuarioLogin>>) => {
  const resposta = await api.post(url, dados);
  setDado(resposta.data);
}
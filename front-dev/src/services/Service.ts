import axios from "axios";
import UsuarioLogin from "../models/usuarioLogin";

export const api = axios.create({
  baseURL: 'http://localhost:4000'
})

export const login = async (url: string, dados: {username: string, password: string}, setDado: React.Dispatch<string>) => {

  await api.post(url, dados)
  .then((response) => {
    setDado(response.data.token);
  })
}

export const cadastroUsuario = async (url: string, dados: {username: string, password: string}, setDado:React.Dispatch<React.SetStateAction<UsuarioLogin>>) => {

  await api.post(url, dados)
  .then((response) => {
    setDado(response.data);
  })
}

export const randomUser = async(setDado:React.Dispatch<React.SetStateAction<{ foto: string; nome: string; email: string; username: string; idade: number; }>>) => {

  await axios.get('https://randomuser.me/api/')
  .then((response) => {
    setDado({
      foto: response.data.results[0].picture.large,
      nome: response.data.results[0].name.first,
      email: response.data.results[0].email,
      username: response.data.results[0].login.username,
      idade: response.data.results[0].dob.age
    })
  })
  .catch((response) => {
    console.log('ERRO: ' + response);
  })
}
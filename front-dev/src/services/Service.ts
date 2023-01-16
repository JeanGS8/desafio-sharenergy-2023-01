import axios from "axios";
import UsuarioLogin from "../models/usuarioLogin";

export const api = axios.create({
  baseURL: 'http://localhost:4000'
})

export const login = async (url: string, dados: {username: string, password: string}, setDado: React.Dispatch<string>) => {

  await api.post(url, dados)
  .then(response => {
    setDado(response.data.token);
  })
}

export const cadastroUsuario = async (url: string, dados: {username: string, password: string}, setDado:React.Dispatch<React.SetStateAction<UsuarioLogin>>) => {

  await api.post(url, dados)
  .then(response => {
    setDado(response.data);
  })
}

export const randomUser = async(setDado:React.Dispatch<React.SetStateAction<{ foto: string; nome: string; email: string; username: string; idade: number; }>>) => {

  await axios.get('https://randomuser.me/api/')
  .then(response => {
    const res = response.data.results[0];
    setDado({
      foto: res.picture.large,
      nome: res.name.first,
      email: res.email,
      username: res.login.username,
      idade: res.dob.age
    })
  })
  .catch(err => {
    console.log(`ERRO: ${err}`);
  })
}
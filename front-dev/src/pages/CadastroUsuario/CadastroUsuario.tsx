import { Button, Grid, TextField, Typography } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cadastroUsuario } from "../../services/Service";

export default function CadastroUsuario(){

  const navigate = useNavigate();
  const [token, setToken] = useState('');
  const [usuario, setUsuario] = useState({
    id: 0,
    username: '',
    password: '',
    remember: false,
    token: ''
  })

  const [senha, setSenha] = useState('');

  function updateModel(e: ChangeEvent<HTMLInputElement>){
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    })
  }
  function confirmarSenha(e: ChangeEvent<HTMLInputElement>){
    setSenha(
      e.target.value
    )
  }

  async function onSubmit(e: ChangeEvent<HTMLFormElement>){
    e.preventDefault();

    if(senha == usuario.password){
      try{
        await cadastroUsuario('/usuario/cadastrar', usuario, setUsuario)
        alert('usuario cadastrado')
        navigate('/')
      }
      catch(erro){
        alert('erro ao cadastrar usuario!');
      }
    }
    else{
      alert('senha está diferente!');
    }
  }
  
  return(
    <Grid container justifyContent='center' xs={12} m={'0 auto'} textAlign={'center'} bgcolor={'lightskyblue'} borderRadius={2} mt={15} p={5}>
      <form onSubmit={onSubmit}>
        <Typography variant="h2" color="initial" mb={2}>
          Cadastre-se
        </Typography>

        <Grid container>
          <Grid item xs={8} m={'0 auto'}>
            <TextField id="usuario" label="usuario" name='username' value={usuario.username} variant='outlined' onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} fullWidth />
          </Grid>
          <Grid item xs={8} m={'0 auto'} my={2}>
            <TextField id="senha" label="senha" name='password' value={usuario.password} variant='outlined' type='password' onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} fullWidth />
          </Grid>

          <Grid item xs={8} m={'0 auto'}>
            <TextField id="confirmarsenha" label="confirmar senha" name='confirmarsenha' value={senha} variant='outlined' type='password' onChange={(e: ChangeEvent<HTMLInputElement>) => confirmarSenha(e)} fullWidth />
          </Grid>

          <Grid item xs={8} mx={'auto'} my={2}>
            <Button type='submit' variant="contained" color="primary" fullWidth>
              Cadastrar
            </Button>
          </Grid>

          <Grid item xs={8} mx={'auto'}>
            <Link to='/'>
              <Button variant="contained" color="success" fullWidth>
                Fazer Login
              </Button>
            </Link>
          </Grid>
        </Grid>
      </form>
    </Grid>
  )
}
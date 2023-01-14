import { Grid, Typography, TextField, FormControlLabel, Checkbox, Button } from '@mui/material';
import styles from './Login.module.scss';
import { ChangeEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { login } from '../../services/Service';

export default function Login(){

  const [token, setToken] = useState('')

  const [usuario, setUsuario] = useState({
    id: 0,
    username: '',
    password: '',
    remember: false,
    token: ''
  })

  useEffect(() => {
    if(token != '')
      alert('Token funcionou!')
  }, [token])
  
  async function onSubmit(e: ChangeEvent<HTMLFormElement>){
    e.preventDefault();

    try{
      await login('/auth/logar', usuario, setToken)
      alert('usuario logado')
    }
    catch(erro){
      alert('erro ao logar!');
    }
  }

  function updateModel(e: ChangeEvent<HTMLInputElement>){
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    })
  }
  
  return(
    <Grid container justifyContent='center' xs={12} m={'0 auto'} textAlign={'center'} bgcolor={'lightskyblue'} borderRadius={2} mt={15} p={5}>
      <form onSubmit={onSubmit}>
        <Typography variant="h2" color="initial" mb={2}>
          Login
        </Typography>

        <Grid container>
          <Grid item xs={8} m={'0 auto'}>
            <TextField id="usuario" label="usuario" name='username' value={usuario.username} variant='outlined' onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} fullWidth />
          </Grid>
          <Grid item xs={8} m={'0 auto'} my={2}>
            <TextField id="senha" label="senha" name='password' value={usuario.password} variant='outlined' type='password' onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} fullWidth />
          </Grid>
    
          <Grid item xs={12}>
            <FormControlLabel
              label="Remember"
              control={
                <Checkbox
                  value={usuario.remember}
                  checked={usuario.remember}
                  name='remember'
                  onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
                  color="primary"
                />
              }
            />
          </Grid>
          <Grid item xs={8} mx={'auto'} my={2}>
            <Button type='submit' variant="contained" color="primary" fullWidth>
              Entrar
            </Button>
          </Grid>
          <Grid item xs={8} mx={'auto'}>
            <Link to='/cadastro'>
              <Button variant="contained" color="warning" fullWidth>
                Criar nova conta
              </Button>
            </Link>
          </Grid>
        </Grid>
      </form>
    </Grid>
  )
}
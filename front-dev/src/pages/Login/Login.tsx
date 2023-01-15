import { Grid, Typography, TextField, FormControlLabel, Checkbox, Button } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../services/Service';
import { useStyles } from './style';
import { addToken } from '../../store/tokens/actions';
import { useDispatch } from 'react-redux';

export default function Login(){

  const classes = useStyles();
  const navigate = useNavigate();
  const [token, setToken] = useState('');
  const dispatch = useDispatch();

  const [usuario, setUsuario] = useState({
    id: 0,
    username: '',
    password: '',
    remember: false,
    token: ''
  })

  useEffect(() => {
    if(token != ''){
      dispatch(addToken(token));
      navigate('/usuarios');
    }
  }, [token])
  
  async function onSubmit(e: ChangeEvent<HTMLFormElement>){
    e.preventDefault();

    try{
      await login('/auth/logar', usuario, setToken)
      alert('usuario logado');
    }
    catch(erro){
      alert(`Erro ao logar!`);
    }
  }

  function updateModel(e: ChangeEvent<HTMLInputElement>){
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    })
  }
  
  return(
    <Grid container justifyContent='center' xs={3} m={'0 auto'} textAlign={'center'} bgcolor={'lightskyblue'} borderRadius={2} mt={15} p={5}>
      <form onSubmit={onSubmit}>
        <Typography variant="h2" color="initial" mb={2}>
          Login
        </Typography>

        <Grid container>
          <Grid item xs={8} m={'0 auto'}>
            <TextField
              id="usuario"
              label="usuario"
              name='username'
              value={usuario.username}
              variant='outlined'
              required
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
              fullWidth
            />
          </Grid>
          <Grid item xs={8} m={'0 auto'} my={2}>
            <TextField
              id="senha"
              label="senha"
              name='password'
              value={usuario.password}
              variant='outlined'
              type='password'
              required
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
              fullWidth
            />
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
            <Link to='/cadastro' className={classes.link}>
              Criar nova conta
            </Link>
          </Grid>
        </Grid>
      </form>
    </Grid>
  )
}
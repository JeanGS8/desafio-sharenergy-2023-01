import { Avatar, IconButton, makeStyles } from "@material-ui/core";
import { Box, Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { randomUser } from "../../services/Service";
import { useSelector } from "react-redux";
import { TokenState } from "../../store/tokens/tokenReducer";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    display: 'flex',
    width: '48%',
    
    '&:nth-child(2n)': {
      marginRight: '0'
    },
    '&:nth-child(2n+1)': {
      marginLeft: '0'
    },

    '@media(max-width: 1100px)': {
      width: '100%',
      
      '&:nth-child(2n)': {
        marginRight: 'auto'
      },
      '&:nth-child(2n+1)': {
        marginLeft: 'auto'
      },
    }
  }
})

export default function Usuarios(){

  const token = useSelector<TokenState, TokenState['tokens']>(
    (state) => state.tokens
  )
  const navigate = useNavigate()

  useEffect(() => {
    if(token === ''){
      alert('Erro precisa do token')
      navigate('/');
    }
  }, [token])

  const classes = useStyles();
  const [user, setUser] = useState({
    foto: '',
    nome: '',
    email: '',
    username: '',
    idade: 0
  })

  const [usuarios, setUsuarios] = useState<{foto: string, nome: string, email: string, username: string, idade: number}[]>([])

  useEffect(() => {
    if(usuarios.length < 14){
      randomUser(setUser)
    }
  }, [usuarios])

  useEffect(() => {
    if(user.nome !== ''){
      setUsuarios([
        ...usuarios,
        user
      ])
    }
  }, [user])

  return(
    <Grid container xs={11} m={'1% auto'}>
      {usuarios.map((usuario, index) => (
        <Card key={index} sx={{margin: '1% auto'}} className={classes.root}>
          <CardMedia
            component="img"
            sx={{ width: 150 }}
            image={usuario.foto}
            alt="foto do usuário"
          />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>

              <Typography component="div" variant="h3">
                {usuario.nome}
              </Typography>

              <Typography variant="subtitle1" color="text.secondary" component="div">
                Username: {usuario.username}
              </Typography>

              <Typography variant="subtitle1" color="text.secondary" component="div">
                E-mail: {usuario.email}
              </Typography>

              <Typography variant="subtitle1" color="text.secondary" component="div">
                Idade: {usuario.idade}
              </Typography>

            </CardContent>
          </Box>
        </Card>
      ))}
    </Grid>
  )
}
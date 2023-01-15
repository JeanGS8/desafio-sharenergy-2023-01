import { makeStyles } from "@material-ui/core";
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { randomUser } from "../../services/Service";
import { useSelector } from "react-redux";
import { TokenState } from "../../store/tokens/tokenReducer";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: '16%',
    maxWidth: 345,
    margin: '1% 2.5%',

    '&:nth-child(5n)':{
      marginRight: 0,
    },
    
    '&:nth-child(5n+1)':{
      marginLeft: 0,
    },
  }
})

export default function ListagemUsuarios(){

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
    <Grid container xs={10} m={'0 auto'}>
      {usuarios.map((usuario, index) => (
        <Card className={classes.root} key={index}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt="foto do usuário"
              height="140"
              image={usuario.foto}
              title="foto do usuário"
            />
            <CardContent>
              
              <Typography gutterBottom variant="h5" component="h2">
                Nome: {usuario.nome}
              </Typography>
              
              <Typography variant="body2" color="textSecondary" component="p">
                email: {usuario.email}
              </Typography>
              
              <Typography variant="body2" color="textSecondary" component="p">
                username: {usuario.username}
              </Typography>
              
              <Typography variant="body2" color="textSecondary" component="p">
                idade: {usuario.idade}
              </Typography>

            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Grid>
  )
}
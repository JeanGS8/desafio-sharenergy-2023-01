import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import Drawer from '@mui/material/Drawer'
import { List, ListItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { TokenState } from '../../store/tokens/tokenReducer';
import { addToken } from '../../store/tokens/actions';
import { Link, useNavigate } from 'react-router-dom';
import PeopleIcon from '@mui/icons-material/People';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  link: {
    textDecoration: 'none'
  },
  item: {
    color: '#1976D2',
    padding: '10px 20px',
    transition: '.3s',
    
    '&:hover': {
      backgroundColor: '#1976D2',
      color: '#FFF'
    }
  },
  icon: {
    marginRight: '10px',
    margin: '6px 0'
  }
})
export default function Navbar(){

  const classes = useStyles();
  const navigate = useNavigate();
  const token = useSelector<TokenState, TokenState['tokens']>(
    (state) => state.tokens
  );
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleDrawerOpen = () => {
    setOpen(true);
  }

  const handleDrawerClose = () => {
    setOpen(false);
  }

  function logout(){
    navigate('/');
    dispatch(addToken(''));
    alert('usuário deslogado!');
  }
    
  return(
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge='start'
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          {token != '' &&
            <Button color="inherit" style={{marginLeft: 'auto'}} onClick={logout}>
              Logout
            </Button>
          }
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
          }
        }}
        variant="persistent"
        anchor="left"
        open={open}
        onMouseLeave={handleDrawerClose}
      >
        
        <List sx={{padding: 0}}>
          <Link to='/usuarios' className={classes.link}>
            <ListItem className={classes.item}>
              <PeopleIcon className={classes.icon}/>
              Usuarios
            </ListItem>
          </Link>
        </List>

      </Drawer>
    </Box>
  )
}
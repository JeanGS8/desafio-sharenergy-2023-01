import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import Drawer from '@mui/material/Drawer'
import { List, ListItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { TokenState } from '../../store/tokens/tokenReducer';
import { addToken } from '../../store/tokens/actions';
import { Link } from 'react-router-dom';
import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  link: {
    textDecoration: 'none',
    display: 'block'
  },
  item: {
    color: '#1976D2',
    padding: '10px 20px',
    
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
    dispatch(addToken(''));
    alert('usuário deslogado!');
  }
    
  return(
    <>
      {token != '' &&
        <Box sx={{ display: 'flex' }}>
          <AppBar position="absolute">
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

              <Link to='/gatos' className={classes.link}>
                <ListItem className={classes.item}>
                  <LogoutIcon className={classes.icon}/>
                  Gatos
                </ListItem>
              </Link>
              
              <Link to='/' className={classes.link} onClick={logout}>
                <ListItem className={classes.item}>
                  <LogoutIcon className={classes.icon}/>
                  Logout
                </ListItem>
              </Link>
            </List>

          </Drawer>
        </Box>
      }
    </>
  )
}
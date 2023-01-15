import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';
import { useState } from 'react';
import Drawer from '@mui/material/Drawer'
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

export default function Navbar(){

  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  }

  const handleDrawerClose = () => {
    setOpen(false);
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
          <Typography variant="h6" noWrap component="div">
            News
          </Typography>
          <Button color="inherit" style={{marginLeft: 'auto'}}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
        onMouseLeave={handleDrawerClose}
      >
        
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {2 % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary='adwad' />
            </ListItemButton>
          </ListItem>
        </List>

      </Drawer>
    </Box>
  )
}
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  CssBaseline,
  IconButton,
  Divider,
  InputBase,
  Paper,
  Button,
  Rating,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';

const MovieDashboard = ({ children }) => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleToggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleSignOut = () => {
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  const handleSearch = () => {
    
    navigate('/movie/${movie._id}');
  };

  const handleListItemClick = (path) => {
    navigate(path);
    setDrawerOpen(false); 
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <CssBaseline />

      
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          whiteSpace: 'nowrap',
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
          },
        }}
        open={drawerOpen}
      >
        <Toolbar>
          <IconButton onClick={handleToggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List>
          <ListItem button onClick={() => handleListItemClick('/home')}>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button onClick={() => handleListItemClick('/movies')}>
            <ListItemText primary="Movies" />
          </ListItem>
          
          <ListItem button onClick={() => handleListItemClick('/favorite')}>
            <ListItemText primary="FavoritePage" />
          </ListItem>

          <ListItem button onClick={() => handleListItemClick('/recommendations')}>
            <ListItemText primary="RecommendationPage" />
          </ListItem>
        </List>
      </Drawer>

      
      <div style={{ marginLeft: drawerOpen ? 240 : 0, padding: '20px', flexGrow: 1, transition: 'margin-left 0.3s' }}>
      
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleToggleDrawer} sx={{ marginRight: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
              Movie Dashboard
            </Typography>
            <Paper component="form" sx={{ display: 'flex', alignItems: 'center', width: '300px' }}>
              <InputBase placeholder="Search Movies" sx={{ ml: 1, flex: 1 }} />
              <IconButton type="submit" aria-label="search" onClick={handleSearch}>
                <SearchIcon />
              </IconButton>
            </Paper>
            <IconButton color="inherit" onClick={handleSignOut}>
              <ExitToAppIcon />
            </IconButton>
            <IconButton color="inherit">
              <AccountCircleIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

     
        {children}

     
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
          <div>
            <Button variant="contained" color="primary">
              Previous
            </Button>
            <Button variant="contained" color="primary" sx={{ ml: 1 }}>
              Next
            </Button>
          </div>
          <Rating name="movie-rating" defaultValue={0} precision={0.5} />
        </div>
      </div>
    </div>
  );
};

export default MovieDashboard;

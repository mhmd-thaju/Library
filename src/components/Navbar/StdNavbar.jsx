import React from 'react'
import "./StdNavbar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';

import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

export const StdNavbar = () => {
  const { user, logoutUser, isAdmin } = useUser()
  const navigate = useNavigate()


  const studentSignout = () => {
    logoutUser()
    navigate("/")
  }

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className='navbar'>


      <div className="logo">
        <h1> <FontAwesomeIcon icon={faBook} /> LIBRARY MANAGEMENT SYSTEM</h1>
      </div>
      {!isAdmin ? (<div className="links">
        <div className="link">
          <Link to='/student/home' style={{ textDecoration: "none" }}><h2>  Home</h2></Link>
        </div>
        <div className="link">
          <Link to="/student/mybooks" style={{ textDecoration: "none" }}><h2> My Books</h2></Link>
        </div>
        <div className="link">
          <Link to="/student/notifications" style={{ textDecoration: "none" }}><h2> Notifications</h2></Link>
        </div>
      </div>) : (<div className="links">
        <div className="link">
          <Link to='/admin/home' style={{ textDecoration: "none" }}><h2>  Home</h2></Link>
        </div>
        <div className="link">
          <Link to="/admin/users" style={{ textDecoration: "none" }}><h2> Users</h2></Link>
        </div>
        <div className="link">
          <Link to="/admin/requests" style={{ textDecoration: "none" }}><h2> Requests</h2></Link>
        </div>
      </div>)}

      <div className="user">
        {<h3 style={{ marginRight: "20px", fontSize: "36px" }}>{user?.name}  </h3>}

        <div >
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle fontSize='large' />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => {
              navigate(isAdmin ? `/admin/profile` : `/student/${user.lid}/profile`, { state: { user } })
            }} >Profile</MenuItem>

            <MenuItem onClick={() => {
              studentSignout()
              handleClose()
            }}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
    </div >
  )
}



/*


import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

export default function MenuAppBar() {
    
    const handleChange = (event) => {
        setAuth(event.target.checked);
    };
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={auth}
              onChange={handleChange}
              aria-label="login switch"
            />
          }
          label={auth ? 'Logout' : 'Login'}
        />
      </FormGroup>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Photos
          </Typography>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}


*/
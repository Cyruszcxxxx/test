import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { logout } from '../../slices/authSlice';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { getUser } from '../../slices/authSlice';
import { Menu, MenuItem } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';


export default () => {
    
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {t} = useTranslation('common');
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const isMenuOpen = Boolean(anchorEl);

    const basicUserInfo = useAppSelector((state) => state.auth.basicUserInfo);
    //get user information
    const userProfileInfo = useAppSelector((state) => state.auth.userProfileData); 

    const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
    
  
    const handleMenuClose = () => {
      setAnchorEl(null);
    };

    useEffect(() => {
      if (basicUserInfo) {
        dispatch(getUser(basicUserInfo.id));
      }
    }, [basicUserInfo]);
    
    const handleLogout = async () => {
      await dispatch(logout());
      navigate("/login");
    };

    const handleProfileClick = async() => {
      handleMenuClose(); // close menu
      if (basicUserInfo) {
        await dispatch(getUser(basicUserInfo.id));
      }
      //await dispatch(getUser(basicUserInfo.id));
      navigate('/profile'); // navigate to profile
    };

    const handleHomeClick = async() => {
      handleMenuClose(); // close menu
      
      navigate('/'); // navigate to Home page
    };

    const handleTransactionClick = async() => {
      handleMenuClose(); // close menu
      
      navigate('/transactions'); // navigate to Transactions list page
    };

    const handleAddClick = async() => {
      handleMenuClose(); // close menu
      
      navigate('/transaction'); // navigate to Home page
    };

    const theme = createTheme({
      typography: {
        allVariants: {
          fontWeight: '600',
          color: '#16515C'
        },
        h3: {
          fontFamily: '"Roboto Slab", serif',
          fontWeight: '600',
          color: '#16515C',
        },
      },
    });

    return (
    <ThemeProvider theme={theme}>
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static" sx={{ backgroundColor: '#28EBA6'}}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={handleMenuClick}
        >
          <MenuIcon />
        </IconButton>
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose} 
          >
            <MenuItem onClick={handleHomeClick}>HomePage</MenuItem>
            <MenuItem onClick={handleProfileClick}>My Profile</MenuItem>
            <MenuItem onClick={handleTransactionClick}>Check My Transactions</MenuItem>
            <MenuItem onClick={handleAddClick}>Add Transactions</MenuItem>
        </Menu>
        
        {/* application logo & title*/}
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'left' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src={process.env.PUBLIC_URL + '/logo.png'} alt="Title Logo" width="100" height="auto"/>
            <Typography variant="h3" sx={{ marginLeft: 2 }}>
              ExpenseTracker
            </Typography>
          </Box>
        </Box>

        {/* user information */}
        <Box sx={{ display: 'flex', justifyContent: 'right', flexDirection: 'column', mr: 2 }}>
              <Typography variant="h6">
                {t('Hello!')} {userProfileInfo?.name}
              </Typography>
              <Typography variant="body1">
                {userProfileInfo?.email} 
              </Typography>
        </Box>

        <Button sx={{ color: '#16515C',fontWeight:'800' }} onClick={handleLogout}>{t('Logout')}</Button>
      </Toolbar>
    </AppBar>
  </Box></ThemeProvider>
  );
}
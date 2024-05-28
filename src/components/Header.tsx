import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { Settings, Notifications, AccountCircle } from '@mui/icons-material';
import logo from '../images/photo.png'; // Adjust the import path as neede
const Header: React.FC = () => {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" padding="20px">
      <Box display="flex" alignItems="center">
        <img src={logo} alt="logo" style={{ height: '40px', marginRight: '16px' }} />
        <Typography variant="h4" style={{ color: 'white', marginTop: '10px' }} gutterBottom>
          Drawing Tool
        </Typography>
      </Box>
      <Box display="flex" alignItems="center">
        <IconButton style={{ color: 'white' }}>
          <Settings />
        </IconButton>
        <IconButton style={{ color: 'white' }}>
          <Notifications />
        </IconButton>
        <IconButton style={{ color: 'white' }}>
          <AccountCircle />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Header;

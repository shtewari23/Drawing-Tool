import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Container, Box, Typography, IconButton } from '@mui/material';
import Canvas from './components/Canvas';
import { Settings, Notifications, AccountCircle } from '@mui/icons-material';
import logo from './images/photo.png'; // Adjust the import path as needed

const theme = createTheme({
  palette: {
    background: {
      default: 'black',
    },
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    success: {
      main: '#4caf50',
    },
    warning: {
      main: '#ff9800',
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <div style={{ borderRadius: '10px', backgroundColor: '#292C31', margin: '20px', height: '700px' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" padding="20px">
          <Box display="flex" alignItems="center">
            <img src={logo} alt="logo" style={{ height: '40px', marginRight: '16px' }} />
            <Typography variant="h4" style={{ color: 'white' , marginTop:'10px'}} gutterBottom>
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
        <CssBaseline />
        <Container style={{ borderRadius: '10px', margin: '0' }}>
          <Box display="flex" flexDirection="column">
            <Canvas />
          </Box>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default App;

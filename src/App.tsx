import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Container, Box } from '@mui/material';
import Canvas from './components/Canvas';
import Header from './components/Header';

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
        <Header/>
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

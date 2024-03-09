import AcUnitIcon from '@mui/icons-material/AcUnit';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import './App.css';


function App() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Snow Depth
        </Typography>
        <AcUnitIcon sx={{ fontSize: 60, color: 'info.main' }} />
        <Typography variant="body1">
          Current snow situation in your town.
        </Typography>
      </Box>
    </Container>
  );
}

export default App

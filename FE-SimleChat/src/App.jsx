import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import ChatPage from './components/chatPage';

export default function App() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <ChatPage/>
      </Box>
    </Container>
  );
}

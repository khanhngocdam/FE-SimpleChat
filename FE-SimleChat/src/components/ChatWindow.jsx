import * as React from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import MessageBubble from './MessageBubble'

export default function ChatWindow({ messages, isSending }) {
  const endRef = React.useRef(null);

  React.useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length, isSending]);

  return (
    <Paper variant="outlined" sx={{ p: 2, height: 460, overflow: 'auto' }}>
      <Stack spacing={2}>
        {messages.map((m) => (
          <MessageBubble key={m.id} msg={m} />
        ))}

        {isSending ? (
          <Stack direction="row" spacing={1} alignItems="center">
            <CircularProgress size={18} />
            <Typography variant="body2" color="text.secondary">
              Assistant is thinking...
            </Typography>
          </Stack>
        ) : null}

        <div ref={endRef} />
      </Stack>
    </Paper>
  );
}

import * as React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function Composer({ onSend, disabled }) {
  const [text, setText] = React.useState('');

  function submit() {
    if (!text.trim()) return;
    onSend(text);
    setText('');
  }

  return (
    <Stack direction="row" spacing={1} alignItems="stretch">
      <TextField
        fullWidth
        multiline
        minRows={2}
        maxRows={6}
        disabled={disabled}
        value={text}
        placeholder="Type a message... (e.g. Summarize the dataset / What's in this image?)"
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            submit();
          }
        }}
      />
      <Button variant="contained" disabled={disabled} onClick={submit}>
        Send
      </Button>
    </Stack>
  );
}

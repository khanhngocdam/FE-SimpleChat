import * as React from 'react';
import { mkMessage } from '../lib/format.js';
import { sendChat, uploadImage, uploadCsv, loadCsvFromUrl } from '../lib/api.js';
import { validateImage, validateCsv, validateUrl } from '../lib/validators.js';

import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import AttachmentsPanel from './AttachmentsPanel.jsx';
import ChatWindow from './ChatWindow.jsx';
import Composer from './Composer.jsx';

export default function ChatPage() {
  const [sessionId, setSessionId] = React.useState(crypto.randomUUID?.() || String(Date.now()));
  const [messages, setMessages] = React.useState([]);
  const [activeImage, setActiveImage] = React.useState(null);
  const [activeCsv, setActiveCsv] = React.useState(null);

  const [isSending, setIsSending] = React.useState(false);
  const [error, setError] = React.useState(null);

  const addMessage = React.useCallback((m) => {
    setMessages((prev) => [...prev, m]);
  }, []);

  function newSession() {
    setSessionId(crypto.randomUUID?.() || String(Date.now()));
    setMessages([]);
    setActiveImage(null);
    setActiveCsv(null);
    setError(null);
  }

  async function handleSend(text) {
    if (!text?.trim()) return;
    setError(null);

    addMessage(mkMessage({ role: 'user', content: text }));
    setIsSending(true);

    try {
      const resp = await sendChat({
        sessionId,
        message: text,
        imageId: activeImage?.id,
        csvId: activeCsv?.id,
      });

      addMessage(
        mkMessage({
          role: 'assistant',
          content: resp.assistant_message || '(no response)',
          artifacts: resp.artifacts || {},
        })
      );
    } catch (e) {
      setError(e.message || 'Chat error');
    } finally {
      setIsSending(false);
    }
  }

  async function handleImageFile(file) {
    const err = validateImage(file);
    if (err) return setError(err);

    setError(null);
    setIsSending(true);
    try {
      const resp = await uploadImage(file);
      const image = { id: resp.image_id, url: resp.image_url, name: file.name };
      setActiveImage(image);

      addMessage(
        mkMessage({
          role: 'user',
          content: `Uploaded image: **${file.name}**`,
          attachments: { image },
        })
      );
    } catch (e) {
      setError(e.message || 'Upload image failed');
    } finally {
      setIsSending(false);
    }
  }

  async function handleCsvFile(file) {
    const err = validateCsv(file);
    if (err) return setError(err);

    setError(null);
    setIsSending(true);
    try {
      const resp = await uploadCsv(file);
      const csv = {
        id: resp.csv_id,
        name: file.name,
        columns: resp.columns || [],
        previewRows: resp.preview_rows || [],
      };
      setActiveCsv(csv);

      addMessage(
        mkMessage({
          role: 'user',
          content: `Uploaded CSV: **${file.name}**`,
          attachments: { csv },
        })
      );
    } catch (e) {
      setError(e.message || 'Upload CSV failed');
    } finally {
      setIsSending(false);
    }
  }

  async function handleCsvUrl(url) {
    const err = validateUrl(url);
    if (err) return setError(err);

    setError(null);
    setIsSending(true);
    try {
      const resp = await loadCsvFromUrl(url);
      const csv = {
        id: resp.csv_id,
        name: resp.name || 'remote.csv',
        columns: resp.columns || [],
        previewRows: resp.preview_rows || [],
      };
      setActiveCsv(csv);

      addMessage(
        mkMessage({
          role: 'user',
          content: `Loaded CSV from URL:\n\n${url}`,
          attachments: { csv },
        })
      );
    } catch (e) {
      setError(e.message || 'Load CSV URL failed');
    } finally {
      setIsSending(false);
    }
  }

  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Stack spacing={2}>
        <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
          <Typography variant="body2" color="text.secondary">
            Session: {sessionId}
          </Typography>
          <Button size="small" variant="outlined" onClick={newSession} disabled={isSending}>
            New session
          </Button>
        </Stack>

        {error ? <Alert severity="error">{error}</Alert> : null}

        <AttachmentsPanel
          activeImage={activeImage}
          activeCsv={activeCsv}
          disabled={isSending}
          onImageFile={handleImageFile}
          onCsvFile={handleCsvFile}
          onCsvUrl={handleCsvUrl}
          onClearImage={() => setActiveImage(null)}
          onClearCsv={() => setActiveCsv(null)}
        />

        <ChatWindow messages={messages} isSending={isSending} />

        <Composer onSend={handleSend} disabled={isSending} />
      </Stack>
    </Paper>
  );
}

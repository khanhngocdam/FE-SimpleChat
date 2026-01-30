import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import ReactMarkdown from 'react-markdown';
import { fmtTime } from '../lib/format.js';
import TableView from './TableView.jsx';
import ChartView from './ChartView.jsx';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

function toAbsoluteUrl(u) {
  if (!u) return u;
  if (u.startsWith('http://') || u.startsWith('https://')) return u;
  // u kiểu "/static/abc.png"
  return `${API_BASE}${u.startsWith('/') ? '' : '/'}${u}`;
}

export default function MessageBubble({ msg }) {
  const isUser = msg.role === 'user';

  const imageUrl = msg.attachments?.image?.url
    ? toAbsoluteUrl(msg.attachments.image.url)
    : null;

  return (
    <Box sx={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start' }}>
      <Paper
        variant="outlined"
        sx={{
          p: 1.5,
          maxWidth: '78%',
          bgcolor: isUser ? 'primary.50' : 'background.paper',
        }}
      >
        <Stack spacing={1}>
          <Stack direction="row" spacing={1} alignItems="baseline">
            <Typography variant="subtitle2">{isUser ? 'You' : 'Assistant'}</Typography>
            <Typography variant="caption" color="text.secondary">
              {fmtTime(msg.createdAt)}
            </Typography>
          </Stack>

          <Box sx={{ '& p': { m: 0 } }}>
            <ReactMarkdown>{msg.content}</ReactMarkdown>
          </Box>

          {msg.attachments?.image ? (
            <>
              <Divider />
              <Typography variant="caption" color="text.secondary">
                Image: {msg.attachments.image.name}
              </Typography>
              <Box
                component="img"
                src={imageUrl}                       // ✅ dùng absolute url
                alt={msg.attachments.image.name}
                sx={{
                  width: '100%',
                  display: 'block',                 // ✅ tránh một số case img bị inline
                  borderRadius: 1,
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              />
            </>
          ) : null}

          {/* ... phần csv/table/chart giữ nguyên ... */}
          {msg.attachments?.csv ? (
            <>
              <Divider />
              <Typography variant="caption" color="text.secondary">
                CSV: {msg.attachments.csv.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Columns: {(msg.attachments.csv.columns || []).join(', ') || '(unknown)'}
              </Typography>
            </>
          ) : null}

          {msg.artifacts?.table ? (
            <>
              <Divider />
              <TableView table={msg.artifacts.table} />
            </>
          ) : null}

          {msg.artifacts?.chart ? (
            <>
              <Divider />
              <ChartView chart={msg.artifacts.chart} />
            </>
          ) : null}
        </Stack>
      </Paper>
    </Box>
  );
}

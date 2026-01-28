import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function AttachmentsPanel({
  activeImage,
  activeCsv,
  disabled,
  onImageFile,
  onCsvFile,
  onCsvUrl,
  onClearImage,
  onClearCsv,
}) {
  const [url, setUrl] = React.useState('');

  return (
    <Accordion defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Attachments (Image / CSV)</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing={2}>
          <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
            <Button component="label" variant="contained" disabled={disabled}>
              Upload Image
              <input
                hidden
                type="file"
                accept="image/png,image/jpeg"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (!f) return;
                  onImageFile(f);
                  e.target.value = '';
                }}
              />
            </Button>

            <Button component="label" variant="contained" disabled={disabled}>
              Upload CSV
              <input
                hidden
                type="file"
                accept=".csv,text/csv"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (!f) return;
                  onCsvFile(f);
                  e.target.value = '';
                }}
              />
            </Button>

            {activeImage ? (
              <Chip
                label={`Active image: ${activeImage.name}`}
                onDelete={disabled ? undefined : onClearImage}
                variant="outlined"
              />
            ) : null}

            {activeCsv ? (
              <Chip
                label={`Active CSV: ${activeCsv.name}`}
                onDelete={disabled ? undefined : onClearCsv}
                variant="outlined"
              />
            ) : null}
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center">
            <TextField
              fullWidth
              size="small"
              label="CSV URL (raw link)"
              value={url}
              disabled={disabled}
              onChange={(e) => setUrl(e.target.value)}
            />
            <Button
              variant="outlined"
              disabled={disabled}
              onClick={() => onCsvUrl(url)}
            >
              Load
            </Button>
          </Stack>

          <Typography variant="caption" color="text.secondary">
            Tip: GitHub CSV nên dùng raw.githubusercontent.com để backend tải đúng nội dung.
          </Typography>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}

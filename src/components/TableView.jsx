import * as React from 'react';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';

export default function TableView({ table }) {
  if (!table?.columns?.length) return null;

  return (
    <div>
      {table.title ? (
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          {table.title}
        </Typography>
      ) : null}

      <TableContainer component={Paper} variant="outlined">
        <Table size="small">
          <TableHead>
            <TableRow>
              {table.columns.map((c) => (
                <TableCell key={c}><b>{c}</b></TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(table.rows || []).map((r, i) => (
              <TableRow key={i}>
                {r.map((cell, j) => (
                  <TableCell key={j}>{String(cell)}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

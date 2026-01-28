import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

export default function ChartView({ chart }) {
  if (!chart) return null;

  if (chart.type === 'hist') {
    const data = (chart.labels || []).map((label, i) => ({
      label,
      value: chart.values?.[i] ?? 0,
    }));

    return (
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          {chart.title || 'Histogram'}
        </Typography>

        <Box sx={{ width: '100%', height: 240 }}>
          <ResponsiveContainer>
            <BarChart data={data}>
              <XAxis dataKey="label" hide />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="subtitle2">{chart.title || 'Chart'}</Typography>
      <pre style={{ margin: 0 }}>{JSON.stringify(chart, null, 2)}</pre>
    </Box>
  );
}

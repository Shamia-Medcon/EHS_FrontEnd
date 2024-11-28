// components/ComingSoon.js

import { Box, Typography } from '@mui/material';

export default function ComingSoon() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '20vh',
        textAlign: 'center',
      }}
    >
      <Typography variant="h4">Coming Soon</Typography>
    </Box>
  );
}

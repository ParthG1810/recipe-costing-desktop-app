import React from 'react';
import { Alert, AlertTitle, Box } from '@mui/material';

export default function ErrorMessage({ error, title = 'Error', onClose }) {
  if (!error) return null;

  return (
    <Box sx={{ mb: 3 }}>
      <Alert severity="error" onClose={onClose}>
        {title && <AlertTitle>{title}</AlertTitle>}
        {typeof error === 'string' ? error : error.message || 'An error occurred'}
      </Alert>
    </Box>
  );
}

import React from 'react';
import { Alert, AlertTitle, Box, alpha } from '@mui/material';
import { Error as ErrorIcon } from '@mui/icons-material';

export default function ErrorMessage({ error, title = 'Error', onClose }) {
  if (!error) return null;

  return (
    <Box sx={{ mb: 3 }}>
      <Alert
        severity="error"
        onClose={onClose}
        icon={<ErrorIcon sx={{ fontSize: 24 }} />}
        sx={{
          borderRadius: 3,
          border: '2px solid',
          borderColor: 'error.main',
          backgroundColor: alpha('#EF4444', 0.08),
          '& .MuiAlert-icon': {
            color: 'error.main',
          },
          '& .MuiAlert-message': {
            width: '100%',
          },
        }}
      >
        {title && (
          <AlertTitle sx={{ fontWeight: 700, fontSize: '1rem' }}>
            {title}
          </AlertTitle>
        )}
        <Box sx={{ fontSize: '0.95rem' }}>
          {typeof error === 'string' ? error : error.message || 'An error occurred'}
        </Box>
      </Alert>
    </Box>
  );
}

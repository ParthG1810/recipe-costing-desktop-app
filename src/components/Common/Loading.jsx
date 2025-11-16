import React from 'react';
import { Box, CircularProgress, Typography, keyframes } from '@mui/material';
import { Restaurant as RestaurantIcon } from '@mui/icons-material';

const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

export default function Loading({ message = 'Loading...' }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '400px',
        gap: 3,
      }}
    >
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress
          size={80}
          thickness={3}
          sx={{
            color: 'primary.main',
            '& circle': {
              strokeLinecap: 'round',
            },
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            width: 56,
            height: 56,
            borderRadius: 3,
            background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: `${pulse} 2s ease-in-out infinite`,
          }}
        >
          <RestaurantIcon sx={{ fontSize: 32, color: 'white' }} />
        </Box>
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
          {message}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Please wait a moment...
        </Typography>
      </Box>
    </Box>
  );
}

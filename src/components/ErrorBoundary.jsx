import { Component } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Button, Container } from '@mui/material';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.state = {
      hasError: true,
      error,
      errorInfo,
    };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container maxWidth="md">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '100vh',
              textAlign: 'center',
              gap: 3,
            }}
          >
            <Typography variant="h3" color="error">
              Something went wrong
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {this.state.error && this.state.error.toString()}
            </Typography>
            <Button
              variant="contained"
              onClick={() => {
                this.setState({ hasError: false, error: null, errorInfo: null });
                window.location.reload();
              }}
            >
              Reload Page
            </Button>
            {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
              <Box
                component="pre"
                sx={{
                  mt: 2,
                  p: 2,
                  bgcolor: 'grey.100',
                  borderRadius: 1,
                  overflow: 'auto',
                  maxWidth: '100%',
                  textAlign: 'left',
                  fontSize: '0.875rem',
                }}
              >
                {this.state.errorInfo.componentStack}
              </Box>
            )}
          </Box>
        </Container>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node,
};

export default ErrorBoundary;

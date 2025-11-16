import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

// Layout
import DashboardLayout from './components/Layout/DashboardLayout';

// Pages
import Dashboard from './pages/Dashboard';
import ProductEntry from './pages/ProductEntry';
import ProductManagement from './pages/ProductManagement';
import RecipeCreation from './pages/RecipeCreation';
import RecipeManagement from './pages/RecipeManagement';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="product-entry" element={<ProductEntry />} />
            <Route path="product-management" element={<ProductManagement />} />
            <Route path="recipe-creation" element={<RecipeCreation />} />
            <Route path="recipe-management" element={<RecipeManagement />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

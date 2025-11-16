import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
// theme
import ThemeProvider from './themes/ThemeProvider';
// layouts
import DashboardLayout from './layouts/dashboard';
// pages
import Dashboard from './pages/Dashboard';
import ProductEntry from './pages/ProductEntry';
import ProductManagement from './pages/ProductManagement';
import RecipeCreation from './pages/RecipeCreation';
import RecipeManagement from './pages/RecipeManagement';
// components
import ErrorBoundary from './components/ErrorBoundary';

// ----------------------------------------------------------------------

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
          <BrowserRouter>
          <Routes>
            <Route path="/" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="products/add" element={<ProductEntry />} />
              <Route path="product-entry" element={<ProductEntry />} />
              <Route path="product-entry/:id" element={<ProductEntry />} />
              <Route path="products/manage" element={<ProductManagement />} />
              <Route path="product-management" element={<ProductManagement />} />
              <Route path="recipes/create" element={<RecipeCreation />} />
              <Route path="recipe-creation" element={<RecipeCreation />} />
              <Route path="recipes/manage" element={<RecipeManagement />} />
              <Route path="recipe-management" element={<RecipeManagement />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

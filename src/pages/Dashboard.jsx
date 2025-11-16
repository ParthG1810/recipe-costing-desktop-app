import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Container,
  alpha,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Iconify from '../components/iconify/Iconify';
import api from '../services/api';

export default function Dashboard() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalRecipes: 0,
    totalVendors: 0,
    recentProducts: [],
    recentRecipes: [],
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [productsResponse, recipesResponse] = await Promise.all([
        api.get('/api/products'),
        api.get('/api/recipes'),
      ]);

      const products = productsResponse.data || [];
      const recipes = recipesResponse.data || [];

      // Calculate total vendors
      const vendorSet = new Set();
      products.forEach(product => {
        if (product.vendors) {
          product.vendors.forEach(vendor => vendorSet.add(vendor.vendor_name));
        }
      });

      setStats({
        totalProducts: products.length,
        totalRecipes: recipes.length,
        totalVendors: vendorSet.size,
        recentProducts: products.slice(0, 5),
        recentRecipes: recipes.slice(0, 5),
      });
    } catch (err) {
      setError(err);
      console.error('Error loading dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    {
      title: 'Add Product',
      description: 'Add a new product with vendor pricing',
      icon: 'eva:plus-circle-fill',
      gradient: 'linear-gradient(195deg, #49a3f1 0%, #1A73E8 100%)',
      path: '/products/add',
    },
    {
      title: 'Manage Products',
      description: 'View and edit existing products',
      icon: 'eva:cube-fill',
      gradient: 'linear-gradient(195deg, #66BB6A 0%, #43A047 100%)',
      path: '/products/manage',
    },
    {
      title: 'Create Recipe',
      description: 'Create a new recipe and calculate costs',
      icon: 'eva:file-add-fill',
      gradient: 'linear-gradient(195deg, #FFA726 0%, #FB8C00 100%)',
      path: '/recipes/create',
    },
    {
      title: 'Manage Recipes',
      description: 'View and edit your recipes',
      icon: 'eva:list-fill',
      gradient: 'linear-gradient(195deg, #EF5350 0%, #E53935 100%)',
      path: '/recipes/manage',
    },
  ];

  const statCards = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: 'eva:cube-fill',
      gradient: 'linear-gradient(195deg, #49a3f1 0%, #1A73E8 100%)',
      color: '#2196F3',
      change: '+12%',
      changeType: 'positive',
    },
    {
      title: 'Total Recipes',
      value: stats.totalRecipes,
      icon: 'eva:file-text-fill',
      gradient: 'linear-gradient(195deg, #66BB6A 0%, #43A047 100%)',
      color: '#4CAF50',
      change: '+8%',
      changeType: 'positive',
    },
    {
      title: 'Active Vendors',
      value: stats.totalVendors,
      icon: 'eva:people-fill',
      gradient: 'linear-gradient(195deg, #FFA726 0%, #FB8C00 100%)',
      color: '#FB8C00',
      change: '+3',
      changeType: 'positive',
    },
  ];

  if (loading) {
    return (
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <Typography>Loading dashboard...</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl">
      {/* Welcome Section */}
      <Box sx={{ mb: 5 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            mb: 1,
            color: 'text.primary',
          }}
        >
          Welcome to Recipe Costing
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400 }}>
          Manage your products, recipes, and calculate costs efficiently
        </Typography>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 5 }}>
        {statCards.map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              elevation={0}
              sx={{
                height: '100%',
                borderRadius: '1rem',
                border: 'none',
                background: '#FFFFFF',
                overflow: 'visible',
                position: 'relative',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.06), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
                transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                },
              }}
            >
              <CardContent sx={{ p: 3, position: 'relative' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        fontSize: '0.75rem',
                      }}
                    >
                      {stat.title}
                    </Typography>
                    <Typography
                      variant="h2"
                      sx={{
                        fontWeight: 800,
                        mt: 1,
                        background: stat.gradient,
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {stat.value}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: '0.75rem',
                      background: stat.gradient,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      boxShadow: `0 4px 6px -1px ${alpha(stat.color, 0.4)}, 0 2px 4px -1px ${alpha(stat.color, 0.3)}`,
                    }}
                  >
                    <Iconify icon={stat.icon} width={48} />
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Iconify icon="eva:trending-up-fill" width={18} sx={{ color: 'success.main' }} />
                  <Typography variant="body2" sx={{ color: 'success.main', fontWeight: 600 }}>
                    {stat.change}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    from last month
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Quick Actions */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
          Quick Actions
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {quickActions.map((action, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              elevation={0}
              sx={{
                height: '100%',
                borderRadius: '1rem',
                border: 'none',
                background: '#FFFFFF',
                overflow: 'visible',
                position: 'relative',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.06), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
                transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                  '& .action-arrow': {
                    transform: 'translateX(4px)',
                  },
                },
              }}
            >
              <CardActionArea
                onClick={() => navigate(action.path)}
                sx={{
                  height: '100%',
                  p: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                }}
              >
                <Box sx={{ width: '100%' }}>
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: '0.75rem',
                      background: action.gradient,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      mb: 2,
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                    }}
                  >
                    <Iconify icon={action.icon} width={40} />
                  </Box>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, mb: 1 }}>
                    {action.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {action.description}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      color: 'primary.main',
                    }}
                  >
                    Get Started
                  </Typography>
                  <Iconify
                    icon="eva:arrow-forward-fill"
                    className="action-arrow"
                    width={18}
                    sx={{
                      color: 'primary.main',
                      transition: 'transform 250ms cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  />
                </Box>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Paper,
  Divider,
} from '@mui/material';
import {
  AddCircle as AddCircleIcon,
  Inventory as InventoryIcon,
  Restaurant as RestaurantIcon,
  MenuBook as MenuBookIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import { productsAPI, recipesAPI } from '../services/api';
import Loading from '../components/Common/Loading';
import ErrorMessage from '../components/Common/ErrorMessage';

export default function Dashboard() {
  const navigate = useNavigate();
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
        productsAPI.getAll(),
        recipesAPI.getAll(),
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
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    {
      title: 'Add New Product',
      description: 'Add a new product with vendor pricing',
      icon: <AddCircleIcon sx={{ fontSize: 48 }} />,
      color: '#2196F3',
      path: '/product-entry',
    },
    {
      title: 'Manage Products',
      description: 'View and edit existing products',
      icon: <InventoryIcon sx={{ fontSize: 48 }} />,
      color: '#4CAF50',
      path: '/product-management',
    },
    {
      title: 'Create Recipe',
      description: 'Create a new recipe and calculate costs',
      icon: <RestaurantIcon sx={{ fontSize: 48 }} />,
      color: '#FF9800',
      path: '/recipe-creation',
    },
    {
      title: 'Manage Recipes',
      description: 'View and edit your recipes',
      icon: <MenuBookIcon sx={{ fontSize: 48 }} />,
      color: '#9C27B0',
      path: '/recipe-management',
    },
  ];

  const statCards = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: <InventoryIcon sx={{ fontSize: 40 }} />,
      color: '#2196F3',
    },
    {
      title: 'Total Recipes',
      value: stats.totalRecipes,
      icon: <RestaurantIcon sx={{ fontSize: 40 }} />,
      color: '#4CAF50',
    },
    {
      title: 'Unique Vendors',
      value: stats.totalVendors,
      icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
      color: '#FF9800',
    },
  ];

  if (loading) {
    return <Loading message="Loading dashboard..." />;
  }

  return (
    <Box className="fade-in">
      {/* Welcome Section */}
      <Paper
        elevation={0}
        sx={{
          p: 4,
          mb: 4,
          background: 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)',
          color: 'white',
          borderRadius: 3,
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
          Welcome to Recipe Costing App
        </Typography>
        <Typography variant="body1" sx={{ opacity: 0.95 }}>
          Manage your ingredients, track vendor pricing, and calculate recipe costs efficiently
        </Typography>
      </Paper>

      {error && <ErrorMessage error={error} onClose={() => setError(null)} />}

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statCards.map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              elevation={0}
              sx={{
                height: '100%',
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'divider',
                transition: 'all 0.3s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      backgroundColor: `${stat.color}15`,
                      color: stat.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Box>
                    <Typography variant="h3" sx={{ fontWeight: 700, color: 'text.primary' }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.title}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Quick Actions */}
      <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
        Quick Actions
      </Typography>
      <Grid container spacing={3}>
        {quickActions.map((action, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              elevation={0}
              sx={{
                height: '100%',
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'divider',
                transition: 'all 0.3s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                },
              }}
            >
              <CardActionArea
                onClick={() => navigate(action.path)}
                sx={{ height: '100%', p: 3 }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    gap: 2,
                  }}
                >
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: '50%',
                      backgroundColor: `${action.color}15`,
                      color: action.color,
                    }}
                  >
                    {action.icon}
                  </Box>
                  <Box>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                      {action.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {action.description}
                    </Typography>
                  </Box>
                </Box>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

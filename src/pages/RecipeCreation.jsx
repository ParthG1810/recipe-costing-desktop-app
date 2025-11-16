import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Paper,
  Divider,
  Container,
  CircularProgress,
  alpha,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import Iconify from '../components/iconify/Iconify';
import api from '../services/api';
import { config } from '../config';
import { formatPrice, calculateIngredientCost, getDefaultVendor } from '../utils/helpers';

export default function RecipeCreation() {
  const { enqueueSnackbar } = useSnackbar();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    ingredients: [{ product_id: '', quantity: '', unit: 'g' }],
  });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productsLoading, setProductsLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await api.get('/api/products');
      setProducts(response.data || []);
    } catch (err) {
      enqueueSnackbar(err.message || 'Failed to load products', { variant: 'error' });
    } finally {
      setProductsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = { ...newIngredients[index], [field]: value };
    setFormData(prev => ({ ...prev, ingredients: newIngredients }));
  };

  const addIngredient = () => {
    setFormData(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, { product_id: '', quantity: '', unit: 'g' }],
    }));
  };

  const removeIngredient = (index) => {
    if (formData.ingredients.length === 1) return;
    const newIngredients = formData.ingredients.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, ingredients: newIngredients }));
  };

  const calculateTotalCost = () => {
    return formData.ingredients.reduce((total, ingredient) => {
      if (!ingredient.product_id || !ingredient.quantity) return total;
      
      const product = products.find(p => p.id === parseInt(ingredient.product_id));
      if (!product || !product.vendors) return total;
      
      const vendor = getDefaultVendor(product.vendors);
      if (!vendor) return total;
      
      const cost = calculateIngredientCost(ingredient.quantity, ingredient.unit, vendor);
      return total + cost;
    }, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      enqueueSnackbar('Recipe name is required', { variant: 'error' });
      return;
    }

    if (formData.ingredients.length === 0 || !formData.ingredients[0].product_id) {
      enqueueSnackbar('At least one ingredient is required', { variant: 'error' });
      return;
    }

    try {
      setLoading(true);
      await api.post('/api/recipes', formData);
      enqueueSnackbar('Recipe created successfully!', { variant: 'success' });

      // Reset form
      setFormData({
        name: '',
        description: '',
        ingredients: [{ product_id: '', quantity: '', unit: 'g' }],
      });
    } catch (err) {
      enqueueSnackbar(err.message || 'Failed to create recipe', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  if (productsLoading) {
    return (
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  const totalCost = calculateTotalCost();

  return (
    <Container maxWidth="xl">
      {/* Page Header */}
      <Box sx={{ mb: 5 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            mb: 1,
            color: 'text.primary',
          }}
        >
          Create New Recipe
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400 }}>
          Build your recipe with ingredients and calculate the total cost
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card
            elevation={0}
            sx={{
              borderRadius: '1rem',
              border: 'none',
              background: '#FFFFFF',
              overflow: 'hidden',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.06), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
            }}
          >
            {/* Card Header */}
            <Box
              sx={{
                background: 'linear-gradient(195deg, #F59E0B 0%, #F97316 100%)',
                p: 3,
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'radial-gradient(circle at top right, rgba(255,255,255,0.15) 0%, transparent 60%)',
                },
              }}
            >
              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Recipe Details
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
                  Enter the name and ingredients for your recipe
                </Typography>
              </Box>
            </Box>

            <CardContent sx={{ p: 4 }}>
              <form onSubmit={handleSubmit}>

                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Recipe Name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., Chocolate Chip Cookies"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Description (Optional)"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      multiline
                      rows={3}
                      placeholder="Recipe description or notes"
                    />
                  </Grid>
                </Grid>

                <Divider sx={{ my: 4 }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Ingredients
                  </Typography>
                  <Button
                    startIcon={<Iconify icon="eva:plus-circle-fill" />}
                    onClick={addIngredient}
                    variant="outlined"
                    sx={{
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 600,
                    }}
                  >
                    Add Ingredient
                  </Button>
                </Box>

                {formData.ingredients.map((ingredient, index) => (
                  <Paper
                    key={index}
                    elevation={0}
                    sx={{
                      p: 3,
                      mb: 3,
                      background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)',
                      border: '2px solid',
                      borderColor: 'divider',
                      borderRadius: '0.75rem',
                      transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
                      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                      '&:hover': {
                        borderColor: 'primary.light',
                        boxShadow: '0 8px 16px rgba(99, 102, 241, 0.15)',
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12} md={5}>
                        <FormControl fullWidth size="small">
                          <InputLabel>Product</InputLabel>
                          <Select
                            value={ingredient.product_id}
                            onChange={(e) => handleIngredientChange(index, 'product_id', e.target.value)}
                            label="Product"
                            required
                          >
                            {products.map(product => (
                              <MenuItem key={product.id} value={product.id}>{product.name}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <TextField
                          fullWidth
                          label="Quantity"
                          type="number"
                          value={ingredient.quantity}
                          onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                          required
                          size="small"
                          inputProps={{ min: 0, step: 0.01 }}
                        />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <FormControl fullWidth size="small">
                          <InputLabel>Unit</InputLabel>
                          <Select
                            value={ingredient.unit}
                            onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
                            label="Unit"
                          >
                            {config.units.map(unit => (
                              <MenuItem key={unit.value} value={unit.value}>{unit.label}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={1}>
                        {formData.ingredients.length > 1 && (
                          <IconButton
                            onClick={() => removeIngredient(index)}
                            sx={{
                              color: 'error.main',
                              transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
                              '&:hover': {
                                backgroundColor: alpha('#EF4444', 0.08),
                                transform: 'scale(1.1)',
                              },
                            }}
                          >
                            <Iconify icon="eva:trash-2-outline" width={24} />
                          </IconButton>
                        )}
                      </Grid>
                    </Grid>
                  </Paper>
                ))}

                <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Iconify icon="eva:save-fill" />}
                    disabled={loading}
                    sx={{
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 600,
                      px: 4,
                      background: 'linear-gradient(195deg, #F59E0B 0%, #F97316 100%)',
                      boxShadow: '0 4px 6px -1px rgba(245, 158, 11, 0.4)',
                      '&:hover': {
                        background: 'linear-gradient(195deg, #D97706 0%, #EA580C 100%)',
                        boxShadow: '0 6px 8px -1px rgba(245, 158, 11, 0.5)',
                      },
                      '&:disabled': {
                        background: 'rgba(245, 158, 11, 0.3)',
                      },
                    }}
                  >
                    {loading ? 'Creating...' : 'Create Recipe'}
                  </Button>
                </Box>
              </form>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card
            elevation={0}
            sx={{
              borderRadius: '1rem',
              border: 'none',
              position: 'sticky',
              top: 24,
              overflow: 'hidden',
              background: '#FFFFFF',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.06), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
            }}
          >
            <Box
              sx={{
                background: 'linear-gradient(195deg, #10B981 0%, #059669 100%)',
                p: 3,
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'radial-gradient(circle at top right, rgba(255,255,255,0.15) 0%, transparent 60%)',
                },
              }}
            >
              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Cost Summary
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
                  Real-time cost calculation
                </Typography>
              </Box>
            </Box>
            <CardContent sx={{ p: 4 }}>
              <Box
                sx={{
                  p: 4,
                  borderRadius: '0.75rem',
                  background: 'linear-gradient(195deg, #10B981 0%, #059669 100%)',
                  mb: 3,
                  textAlign: 'center',
                  boxShadow: '0 4px 6px -1px rgba(16, 185, 129, 0.4)',
                }}
              >
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)', mb: 1, fontWeight: 600 }}>
                  Total Recipe Cost
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 800, color: 'white' }}>
                  {formatPrice(totalCost)}
                </Typography>
              </Box>
              <Box
                sx={{
                  p: 2,
                  borderRadius: '0.5rem',
                  backgroundColor: 'rgba(16, 185, 129, 0.08)',
                  border: '1px solid',
                  borderColor: 'rgba(16, 185, 129, 0.2)',
                }}
              >
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center' }}>
                  Based on default vendor pricing
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

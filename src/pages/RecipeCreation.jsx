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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import { recipesAPI, productsAPI } from '../services/api';
import { config } from '../config';
import { formatPrice, calculateIngredientCost, getDefaultVendor } from '../utils/helpers';
import Loading from '../components/Common/Loading';
import SuccessMessage from '../components/Common/SuccessMessage';
import ErrorMessage from '../components/Common/ErrorMessage';

export default function RecipeCreation() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    ingredients: [{ product_id: '', quantity: '', unit: 'g' }],
  });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productsLoading, setProductsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await productsAPI.getAll();
      setProducts(response.data || []);
    } catch (err) {
      setError(err);
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
      setError('Recipe name is required');
      return;
    }

    if (formData.ingredients.length === 0 || !formData.ingredients[0].product_id) {
      setError('At least one ingredient is required');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await recipesAPI.create(formData);
      setSuccess(true);
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        ingredients: [{ product_id: '', quantity: '', unit: 'g' }],
      });
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  if (productsLoading) {
    return <Loading message="Loading products..." />;
  }

  const totalCost = calculateTotalCost();

  return (
    <Box>
      {error && <ErrorMessage error={error} onClose={() => setError(null)} />}

      {/* Page Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Create New Recipe
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Build your recipe with ingredients and calculate the total cost
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card elevation={0} sx={{ borderRadius: 4, border: '1px solid', borderColor: 'divider', overflow: 'hidden' }}>
            {/* Card Header */}
            <Box
              sx={{
                background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                p: 3,
                color: 'white',
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Recipe Details
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
                Enter the name and ingredients for your recipe
              </Typography>
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
                  <Button startIcon={<AddIcon />} onClick={addIngredient} variant="outlined">
                    Add Ingredient
                  </Button>
                </Box>

                {formData.ingredients.map((ingredient, index) => (
                  <Paper
                    key={index}
                    elevation={0}
                    sx={{
                      p: 2,
                      mb: 2,
                      backgroundColor: 'background.default',
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 2,
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
                          <IconButton onClick={() => removeIngredient(index)} color="error" size="small">
                            <DeleteIcon />
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
                    startIcon={<SaveIcon />}
                    disabled={loading}
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
              borderRadius: 4,
              border: '1px solid',
              borderColor: 'divider',
              position: 'sticky',
              top: 24,
              overflow: 'hidden',
              background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)',
            }}
          >
            <Box
              sx={{
                background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                p: 3,
                color: 'white',
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Cost Summary
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
                Real-time cost calculation
              </Typography>
            </Box>
            <CardContent sx={{ p: 4 }}>
              <Box
                sx={{
                  p: 3,
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                  mb: 3,
                  textAlign: 'center',
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
                  borderRadius: 2,
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

      <SuccessMessage
        open={success}
        message="Recipe created successfully!"
        onClose={() => setSuccess(false)}
      />
    </Box>
  );
}

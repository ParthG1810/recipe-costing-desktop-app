import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  IconButton,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  Divider,
  Paper,
  Container,
  CircularProgress,
  alpha,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import Iconify from '../components/iconify/Iconify';
import api from '../services/api';
import { config } from '../config';
import { validateProductData } from '../utils/helpers';

export default function ProductEntry() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    vendors: [{ vendor_name: '', price: '', weight: '', package_size: 'g', is_default: true }],
  });
  const [loading, setLoading] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState(isEditMode);

  useEffect(() => {
    if (isEditMode) {
      loadProduct();
    }
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoadingProduct(true);
      const response = await api.get(`/api/products/${id}`);
      const productData = response.data;

      setFormData({
        name: productData.name || '',
        description: productData.description || '',
        vendors: productData.vendors && productData.vendors.length > 0
          ? productData.vendors
          : [{ vendor_name: '', price: '', weight: '', package_size: 'g', is_default: true }],
      });
    } catch (err) {
      enqueueSnackbar(err.message || 'Failed to load product', { variant: 'error' });
      navigate('/product-management');
    } finally {
      setLoadingProduct(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleVendorChange = (index, field, value) => {
    const newVendors = [...formData.vendors];
    newVendors[index] = { ...newVendors[index], [field]: value };
    
    // If setting this as default, unset others
    if (field === 'is_default' && value) {
      newVendors.forEach((v, i) => {
        if (i !== index) v.is_default = false;
      });
    }
    
    setFormData(prev => ({ ...prev, vendors: newVendors }));
  };

  const addVendor = () => {
    if (formData.vendors.length >= config.features.maxVendorsPerProduct) {
      enqueueSnackbar(`Maximum ${config.features.maxVendorsPerProduct} vendors allowed`, { variant: 'warning' });
      return;
    }
    setFormData(prev => ({
      ...prev,
      vendors: [...prev.vendors, { vendor_name: '', price: '', weight: '', package_size: 'g', is_default: false }],
    }));
  };

  const removeVendor = (index) => {
    if (formData.vendors.length === 1) {
      enqueueSnackbar('At least one vendor is required', { variant: 'warning' });
      return;
    }
    const newVendors = formData.vendors.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, vendors: newVendors }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const errors = validateProductData(formData);
    if (Object.keys(errors).length > 0) {
      enqueueSnackbar(Object.values(errors)[0], { variant: 'error' });
      return;
    }

    try {
      setLoading(true);

      if (isEditMode) {
        await api.put(`/api/products/${id}`, formData);
        enqueueSnackbar('Product updated successfully!', { variant: 'success' });
        // Navigate back to product management after a short delay
        setTimeout(() => {
          navigate('/product-management');
        }, 1500);
      } else {
        await api.post('/api/products', formData);
        enqueueSnackbar('Product added successfully!', { variant: 'success' });

        // Reset form
        setFormData({
          name: '',
          description: '',
          vendors: [{ vendor_name: '', price: '', weight: '', package_size: 'g', is_default: true }],
        });
      }
    } catch (err) {
      enqueueSnackbar(err.message || 'Failed to save product', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  if (loadingProduct) {
    return (
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

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
          {isEditMode ? 'Edit Product' : 'Add New Product'}
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400 }}>
          {isEditMode ? 'Update product details and vendor pricing' : 'Create a new product with vendor pricing information'}
        </Typography>
      </Box>

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
            background: 'linear-gradient(195deg, #6366F1 0%, #8B5CF6 100%)',
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
              Product Details
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
              Enter the basic information about your product
            </Typography>
          </Box>
        </Box>

        <CardContent sx={{ p: 4 }}>
          <form onSubmit={handleSubmit}>
            {/* Product Information */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Product Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., All-Purpose Flour"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Description (Optional)"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="e.g., Premium quality flour for baking"
                />
              </Grid>
            </Grid>

            <Divider sx={{ my: 4 }} />

            {/* Vendor Information */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Vendor Pricing
              </Typography>
              <Button
                startIcon={<Iconify icon="eva:plus-circle-fill" />}
                onClick={addVendor}
                variant="outlined"
                disabled={formData.vendors.length >= config.features.maxVendorsPerProduct}
                sx={{
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 600,
                }}
              >
                Add Vendor
              </Button>
            </Box>

            {formData.vendors.map((vendor, index) => (
              <Paper
                key={index}
                elevation={0}
                sx={{
                  p: 3,
                  mb: 3,
                  background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)',
                  border: '2px solid',
                  borderColor: vendor.is_default ? 'primary.main' : 'divider',
                  borderRadius: '0.75rem',
                  transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: vendor.is_default
                    ? '0 4px 12px rgba(99, 102, 241, 0.15)'
                    : '0 1px 3px rgba(0, 0, 0, 0.05)',
                  '&:hover': {
                    borderColor: vendor.is_default ? 'primary.dark' : 'primary.light',
                    boxShadow: '0 8px 16px rgba(99, 102, 241, 0.15)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: '0.75rem',
                        background: vendor.is_default
                          ? 'linear-gradient(195deg, #6366F1 0%, #8B5CF6 100%)'
                          : 'linear-gradient(195deg, #E2E8F0 0%, #CBD5E1 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: vendor.is_default ? 'white' : 'text.secondary',
                        fontWeight: 700,
                        fontSize: '1.1rem',
                        boxShadow: vendor.is_default
                          ? `0 4px 6px -1px ${alpha('#6366F1', 0.4)}`
                          : 'none',
                      }}
                    >
                      {index + 1}
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        Vendor {index + 1}
                      </Typography>
                      {vendor.is_default && (
                        <Box
                          component="span"
                          sx={{
                            display: 'inline-block',
                            mt: 0.5,
                            px: 1.5,
                            py: 0.25,
                            borderRadius: '0.5rem',
                            background: 'linear-gradient(195deg, #6366F1 0%, #8B5CF6 100%)',
                            color: 'white',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                          }}
                        >
                          Default Vendor
                        </Box>
                      )}
                    </Box>
                  </Box>
                  {formData.vendors.length > 1 && (
                    <IconButton
                      onClick={() => removeVendor(index)}
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
                </Box>

                <Grid container spacing={2}>
                  <Grid item xs={12} md={3}>
                    <TextField
                      fullWidth
                      label="Vendor Name"
                      value={vendor.vendor_name}
                      onChange={(e) => handleVendorChange(index, 'vendor_name', e.target.value)}
                      required
                      placeholder="e.g., ABC Suppliers"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      fullWidth
                      label="Price"
                      type="number"
                      value={vendor.price}
                      onChange={(e) => handleVendorChange(index, 'price', e.target.value)}
                      required
                      placeholder="0.00"
                      inputProps={{ min: 0, step: 0.01 }}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <TextField
                      fullWidth
                      label="Weight"
                      type="number"
                      value={vendor.weight}
                      onChange={(e) => handleVendorChange(index, 'weight', e.target.value)}
                      required
                      placeholder="0"
                      inputProps={{ min: 0, step: 0.01 }}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Unit</InputLabel>
                      <Select
                        value={vendor.package_size}
                        onChange={(e) => handleVendorChange(index, 'package_size', e.target.value)}
                        label="Unit"
                      >
                        {config.units.map(unit => (
                          <MenuItem key={unit.value} value={unit.value}>{unit.label}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <FormControlLabel
                      control={
                        <Radio
                          checked={vendor.is_default}
                          onChange={() => handleVendorChange(index, 'is_default', true)}
                        />
                      }
                      label="Default"
                    />
                  </Grid>
                </Grid>
              </Paper>
            ))}

            {/* Submit Button */}
            <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              {isEditMode && (
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/product-management')}
                  disabled={loading}
                  sx={{
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                    px: 3,
                  }}
                >
                  Cancel
                </Button>
              )}
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
                  background: 'linear-gradient(195deg, #6366F1 0%, #8B5CF6 100%)',
                  boxShadow: '0 4px 6px -1px rgba(99, 102, 241, 0.4)',
                  '&:hover': {
                    background: 'linear-gradient(195deg, #4F46E5 0%, #7C3AED 100%)',
                    boxShadow: '0 6px 8px -1px rgba(99, 102, 241, 0.5)',
                  },
                  '&:disabled': {
                    background: 'rgba(99, 102, 241, 0.3)',
                  },
                }}
              >
                {loading ? (isEditMode ? 'Updating...' : 'Adding...') : (isEditMode ? 'Update Product' : 'Add Product')}
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}

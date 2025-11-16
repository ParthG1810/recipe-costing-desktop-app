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
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import { productsAPI } from '../services/api';
import { config } from '../config';
import { validateProductData } from '../utils/helpers';
import SuccessMessage from '../components/Common/SuccessMessage';
import ErrorMessage from '../components/Common/ErrorMessage';
import Loading from '../components/Common/Loading';

export default function ProductEntry() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    vendors: [{ vendor_name: '', price: '', weight: '', package_size: 'g', is_default: true }],
  });
  const [loading, setLoading] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState(isEditMode);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      loadProduct();
    }
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoadingProduct(true);
      const response = await productsAPI.getById(id);
      const productData = response.data;

      setFormData({
        name: productData.name || '',
        description: productData.description || '',
        vendors: productData.vendors && productData.vendors.length > 0
          ? productData.vendors
          : [{ vendor_name: '', price: '', weight: '', package_size: 'g', is_default: true }],
      });
    } catch (err) {
      setError(err);
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
      setError(`Maximum ${config.features.maxVendorsPerProduct} vendors allowed`);
      return;
    }
    setFormData(prev => ({
      ...prev,
      vendors: [...prev.vendors, { vendor_name: '', price: '', weight: '', package_size: 'g', is_default: false }],
    }));
  };

  const removeVendor = (index) => {
    if (formData.vendors.length === 1) {
      setError('At least one vendor is required');
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
      setError(Object.values(errors)[0]);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      if (isEditMode) {
        await productsAPI.update(id, formData);
        setSuccess(true);
        // Navigate back to product management after a short delay
        setTimeout(() => {
          navigate('/product-management');
        }, 1500);
      } else {
        await productsAPI.create(formData);
        setSuccess(true);

        // Reset form
        setFormData({
          name: '',
          description: '',
          vendors: [{ vendor_name: '', price: '', weight: '', package_size: 'g', is_default: true }],
        });
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  if (loadingProduct) {
    return <Loading message="Loading product..." />;
  }

  return (
    <Box>
      {error && <ErrorMessage error={error} onClose={() => setError(null)} />}

      {/* Page Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          {isEditMode ? 'Edit Product' : 'Add New Product'}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {isEditMode ? 'Update product details and vendor pricing' : 'Create a new product with vendor pricing information'}
        </Typography>
      </Box>

      <Card elevation={0} sx={{ borderRadius: 4, border: '1px solid', borderColor: 'divider', overflow: 'hidden' }}>
        {/* Card Header */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
            p: 3,
            color: 'white',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Product Details
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
            Enter the basic information about your product
          </Typography>
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
                startIcon={<AddIcon />}
                onClick={addVendor}
                variant="outlined"
                disabled={formData.vendors.length >= config.features.maxVendorsPerProduct}
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
                  borderRadius: 3,
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    borderColor: 'primary.light',
                    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.1)',
                  },
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: 2,
                        background: vendor.is_default
                          ? 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)'
                          : 'linear-gradient(135deg, #E2E8F0 0%, #CBD5E1 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: vendor.is_default ? 'white' : 'text.secondary',
                        fontWeight: 700,
                        fontSize: '1.1rem',
                      }}
                    >
                      {index + 1}
                    </Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                      Vendor {index + 1}
                      {vendor.is_default && (
                        <Typography
                          component="span"
                          sx={{
                            ml: 1,
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 1,
                            background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
                            color: 'white',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                          }}
                        >
                          Default
                        </Typography>
                      )}
                    </Typography>
                  </Box>
                  {formData.vendors.length > 1 && (
                    <IconButton
                      onClick={() => removeVendor(index)}
                      sx={{
                        color: 'error.main',
                        '&:hover': {
                          backgroundColor: 'error.lighter',
                          transform: 'scale(1.1)',
                        },
                      }}
                    >
                      <DeleteIcon />
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
                >
                  Cancel
                </Button>
              )}
              <Button
                type="submit"
                variant="contained"
                size="large"
                startIcon={<SaveIcon />}
                disabled={loading}
              >
                {loading ? (isEditMode ? 'Updating...' : 'Adding...') : (isEditMode ? 'Update Product' : 'Add Product')}
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>

      <SuccessMessage
        open={success}
        message={isEditMode ? "Product updated successfully!" : "Product added successfully!"}
        onClose={() => setSuccess(false)}
      />
    </Box>
  );
}

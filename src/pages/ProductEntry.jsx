import React, { useState } from 'react';
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

export default function ProductEntry() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    vendors: [{ vendor_name: '', price: '', weight: '', package_size: 'g', is_default: true }],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

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
      await productsAPI.create(formData);
      setSuccess(true);
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        vendors: [{ vendor_name: '', price: '', weight: '', package_size: 'g', is_default: true }],
      });
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="fade-in">
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
        Add New Product
      </Typography>

      {error && <ErrorMessage error={error} onClose={() => setError(null)} />}

      <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
        <CardContent sx={{ p: 4 }}>
          <form onSubmit={handleSubmit}>
            {/* Product Information */}
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              Product Information
            </Typography>

            <Grid container spacing={3}>
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
                  mb: 2,
                  backgroundColor: 'background.default',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2,
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Vendor {index + 1}
                  </Typography>
                  {formData.vendors.length > 1 && (
                    <IconButton onClick={() => removeVendor(index)} color="error" size="small">
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
              <Button
                type="submit"
                variant="contained"
                size="large"
                startIcon={<SaveIcon />}
                disabled={loading}
              >
                {loading ? 'Adding...' : 'Add Product'}
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>

      <SuccessMessage
        open={success}
        message="Product added successfully!"
        onClose={() => setSuccess(false)}
      />
    </Box>
  );
}

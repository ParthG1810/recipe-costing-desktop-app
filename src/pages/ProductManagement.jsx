import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Radio,
  FormControlLabel,
  Divider,
  Paper,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Add as AddIcon,
  Save as SaveIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { productsAPI } from '../services/api';
import { formatPrice, getDefaultVendor, validateProductData } from '../utils/helpers';
import { config } from '../config';
import Loading from '../components/Common/Loading';
import ErrorMessage from '../components/Common/ErrorMessage';
import SuccessMessage from '../components/Common/SuccessMessage';

export default function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    description: '',
    vendors: [],
  });
  const [saveLoading, setSaveLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [searchQuery, products]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await productsAPI.getAll();
      setProducts(response.data || []);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    if (!searchQuery.trim()) {
      setFilteredProducts(products);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(query) ||
      product.description?.toLowerCase().includes(query)
    );
    setFilteredProducts(filtered);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      await productsAPI.delete(id);
      loadProducts();
    } catch (err) {
      setError(err);
    }
  };

  const handleEdit = async (product) => {
    try {
      setLoading(true);
      // Load full product details with vendors
      const response = await productsAPI.getById(product.id);
      const productData = response.data;

      setEditingProduct(productData);
      setEditFormData({
        name: productData.name || '',
        description: productData.description || '',
        vendors: productData.vendors && productData.vendors.length > 0
          ? productData.vendors
          : [{ vendor_name: '', price: '', weight: '', package_size: 'g', is_default: true }],
      });
      setEditDialogOpen(true);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setEditingProduct(null);
    setEditFormData({
      name: '',
      description: '',
      vendors: [],
    });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditVendorChange = (index, field, value) => {
    const newVendors = [...editFormData.vendors];
    newVendors[index] = { ...newVendors[index], [field]: value };

    // If setting this as default, unset others
    if (field === 'is_default' && value) {
      newVendors.forEach((v, i) => {
        if (i !== index) v.is_default = false;
      });
    }

    setEditFormData(prev => ({ ...prev, vendors: newVendors }));
  };

  const addEditVendor = () => {
    if (editFormData.vendors.length >= config.features.maxVendorsPerProduct) {
      setError(`Maximum ${config.features.maxVendorsPerProduct} vendors allowed`);
      return;
    }
    setEditFormData(prev => ({
      ...prev,
      vendors: [...prev.vendors, { vendor_name: '', price: '', weight: '', package_size: 'g', is_default: false }],
    }));
  };

  const removeEditVendor = (index) => {
    if (editFormData.vendors.length === 1) {
      setError('At least one vendor is required');
      return;
    }
    const newVendors = editFormData.vendors.filter((_, i) => i !== index);
    setEditFormData(prev => ({ ...prev, vendors: newVendors }));
  };

  const handleSaveEdit = async () => {
    // Validation
    const errors = validateProductData(editFormData);
    if (Object.keys(errors).length > 0) {
      setError(Object.values(errors)[0]);
      return;
    }

    try {
      setSaveLoading(true);
      setError(null);
      await productsAPI.update(editingProduct.id, editFormData);
      setSuccess(true);
      handleCloseEditDialog();
      loadProducts();
    } catch (err) {
      setError(err);
    } finally {
      setSaveLoading(false);
    }
  };

  if (loading) {
    return <Loading message="Loading products..." />;
  }

  return (
    <Box className="fade-in">
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
        Manage Products
      </Typography>

      {error && <ErrorMessage error={error} onClose={() => setError(null)} />}

      <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider', p: 3 }}>
        <TextField
          fullWidth
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ mb: 3 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Product Name</strong></TableCell>
                <TableCell><strong>Description</strong></TableCell>
                <TableCell><strong>Vendors</strong></TableCell>
                <TableCell><strong>Default Price</strong></TableCell>
                <TableCell align="right"><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProducts.map((product) => {
                const defaultVendor = getDefaultVendor(product.vendors);
                return (
                  <TableRow key={product.id} hover>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.description || '-'}</TableCell>
                    <TableCell>
                      <Chip label={`${product.vendors?.length || 0} vendors`} size="small" />
                    </TableCell>
                    <TableCell>
                      {defaultVendor ? formatPrice(defaultVendor.price) : '-'}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton size="small" color="primary" onClick={() => handleEdit(product)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton size="small" color="error" onClick={() => handleDelete(product.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        {filteredProducts.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography color="text.secondary">
              {searchQuery ? 'No products found matching your search.' : 'No products added yet.'}
            </Typography>
          </Box>
        )}
      </Card>

      {/* Edit Product Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={handleCloseEditDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Edit Product
            </Typography>
            <IconButton onClick={handleCloseEditDialog} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          {/* Product Information */}
          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
            Product Information
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Product Name"
                name="name"
                value={editFormData.name}
                onChange={handleEditInputChange}
                required
                placeholder="e.g., All-Purpose Flour"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Description (Optional)"
                name="description"
                value={editFormData.description}
                onChange={handleEditInputChange}
                placeholder="e.g., Premium quality flour for baking"
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          {/* Vendor Information */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Vendor Pricing
            </Typography>
            <Button
              startIcon={<AddIcon />}
              onClick={addEditVendor}
              variant="outlined"
              size="small"
              disabled={editFormData.vendors.length >= config.features.maxVendorsPerProduct}
            >
              Add Vendor
            </Button>
          </Box>

          {editFormData.vendors.map((vendor, index) => (
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
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  Vendor {index + 1}
                </Typography>
                {editFormData.vendors.length > 1 && (
                  <IconButton onClick={() => removeEditVendor(index)} color="error" size="small">
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
                    onChange={(e) => handleEditVendorChange(index, 'vendor_name', e.target.value)}
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
                    onChange={(e) => handleEditVendorChange(index, 'price', e.target.value)}
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
                    onChange={(e) => handleEditVendorChange(index, 'weight', e.target.value)}
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
                      onChange={(e) => handleEditVendorChange(index, 'package_size', e.target.value)}
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
                        onChange={() => handleEditVendorChange(index, 'is_default', true)}
                      />
                    }
                    label="Default"
                  />
                </Grid>
              </Grid>
            </Paper>
          ))}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseEditDialog} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={handleSaveEdit}
            variant="contained"
            startIcon={<SaveIcon />}
            disabled={saveLoading}
          >
            {saveLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </DialogActions>
      </Dialog>

      <SuccessMessage
        open={success}
        message="Product updated successfully!"
        onClose={() => setSuccess(false)}
      />
    </Box>
  );
}

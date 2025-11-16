import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  Container,
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
  Collapse,
  TableSortLabel,
  CircularProgress,
  Alert,
  AlertTitle,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import Iconify from '../components/iconify/Iconify';
import api from '../services/api';
import { formatPrice, getDefaultVendor } from '../utils/helpers';

export default function ProductManagement() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [orderBy, setOrderBy] = useState('name');
  const [order, setOrder] = useState('asc');
  const [expandedRows, setExpandedRows] = useState({});

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [searchQuery, products, order, orderBy]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.get('/api/products');
      // Ensure data is an array
      const productsArray = Array.isArray(data) ? data : [];
      setProducts(productsArray);
    } catch (err) {
      setError(err);
      setProducts([]);
      enqueueSnackbar(err.message || 'Failed to load products', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    // Ensure products is an array
    if (!Array.isArray(products)) {
      setFilteredProducts([]);
      return;
    }

    let filtered = products;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = products.filter(product =>
        product.name?.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      let aValue, bValue;

      switch (orderBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'description':
          aValue = (a.description || '').toLowerCase();
          bValue = (b.description || '').toLowerCase();
          break;
        case 'vendors':
          aValue = a.vendors?.length || 0;
          bValue = b.vendors?.length || 0;
          break;
        case 'price':
          const defaultVendorA = getDefaultVendor(a.vendors);
          const defaultVendorB = getDefaultVendor(b.vendors);
          aValue = defaultVendorA?.price || 0;
          bValue = defaultVendorB?.price || 0;
          break;
        default:
          return 0;
      }

      if (aValue < bValue) {
        return order === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return order === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setFilteredProducts(sorted);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      await api.delete(`/api/products/${id}`);
      enqueueSnackbar('Product deleted successfully', { variant: 'success' });
      loadProducts();
    } catch (err) {
      setError(err);
      enqueueSnackbar(err.message || 'Failed to delete product', { variant: 'error' });
    }
  };

  const handleEdit = (product) => {
    navigate(`/product-entry/${product.id}`);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const toggleRow = (productId) => {
    setExpandedRows(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  if (loading) {
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
      {error && (
        <Alert
          severity="error"
          onClose={() => setError(null)}
          sx={{ mb: 3, borderRadius: 2 }}
        >
          <AlertTitle>Error</AlertTitle>
          {error.message || 'An error occurred'}
        </Alert>
      )}

      {/* Page Header */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Product Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            View, search, and manage all your products
          </Typography>
        </Box>
        <Chip
          label={`${filteredProducts.length} Products`}
          sx={{
            background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
            color: 'white',
            fontWeight: 700,
            fontSize: '0.95rem',
            px: 2,
            py: 2.5,
          }}
        />
      </Box>

      <Card elevation={0} sx={{ borderRadius: 4, border: '1px solid', borderColor: 'divider', overflow: 'hidden' }}>
        <Box sx={{ p: 3, backgroundColor: 'background.default' }}>
          <TextField
            fullWidth
            placeholder="Search products by name or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'name'}
                    direction={orderBy === 'name' ? order : 'asc'}
                    onClick={() => handleRequestSort('name')}
                  >
                    <strong>Product Name</strong>
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'description'}
                    direction={orderBy === 'description' ? order : 'asc'}
                    onClick={() => handleRequestSort('description')}
                  >
                    <strong>Description</strong>
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'vendors'}
                    direction={orderBy === 'vendors' ? order : 'asc'}
                    onClick={() => handleRequestSort('vendors')}
                  >
                    <strong>Vendors</strong>
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'price'}
                    direction={orderBy === 'price' ? order : 'asc'}
                    onClick={() => handleRequestSort('price')}
                  >
                    <strong>Default Price</strong>
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right"><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProducts.map((product) => {
                const defaultVendor = getDefaultVendor(product.vendors);
                const isExpanded = expandedRows[product.id] || false;

                return (
                  <React.Fragment key={product.id}>
                    <TableRow hover>
                      <TableCell>
                        <IconButton
                          size="small"
                          onClick={() => toggleRow(product.id)}
                          disabled={!product.vendors || product.vendors.length === 0}
                        >
                          {isExpanded ? (
                            <Iconify icon="eva:arrow-up-fill" width={20} />
                          ) : (
                            <Iconify icon="eva:arrow-down-fill" width={20} />
                          )}
                        </IconButton>
                      </TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.description || '-'}</TableCell>
                      <TableCell>
                        <Chip
                          label={`${product.vendors?.length || 0} vendors`}
                          size="small"
                          color={product.vendors?.length > 0 ? 'primary' : 'default'}
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        {defaultVendor ? formatPrice(defaultVendor.price) : '-'}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton size="small" color="primary" onClick={() => handleEdit(product)}>
                          <Iconify icon="eva:edit-fill" width={20} />
                        </IconButton>
                        <IconButton size="small" color="error" onClick={() => handleDelete(product.id)}>
                          <Iconify icon="eva:trash-2-fill" width={20} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                          <Box sx={{ margin: 2 }}>
                            <Typography variant="h6" gutterBottom component="div">
                              Vendor Details
                            </Typography>
                            <Table size="small" sx={{ backgroundColor: 'rgba(0, 0, 0, 0.02)' }}>
                              <TableHead>
                                <TableRow>
                                  <TableCell><strong>Vendor Name</strong></TableCell>
                                  <TableCell><strong>Price</strong></TableCell>
                                  <TableCell><strong>Weight</strong></TableCell>
                                  <TableCell><strong>Package Size</strong></TableCell>
                                  <TableCell><strong>Default</strong></TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {product.vendors?.map((vendor) => (
                                  <TableRow key={vendor.id}>
                                    <TableCell>{vendor.vendor_name}</TableCell>
                                    <TableCell>{formatPrice(vendor.price)}</TableCell>
                                    <TableCell>{vendor.weight}</TableCell>
                                    <TableCell>{vendor.package_size}</TableCell>
                                    <TableCell>
                                      {vendor.is_default ? (
                                        <Chip label="Default" size="small" color="success" />
                                      ) : (
                                        '-'
                                      )}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
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
    </Container>
  );
}

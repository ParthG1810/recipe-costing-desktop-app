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
  CircularProgress,
  Alert,
  AlertTitle,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
  Stack,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import Iconify from '../components/iconify/Iconify';
import api from '../services/api';
import { formatDate } from '../utils/helpers';

export default function RecipeManagement() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);

  useEffect(() => {
    loadRecipes();
  }, []);

  useEffect(() => {
    filterRecipes();
  }, [searchQuery, recipes]);

  const loadRecipes = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.get('/api/recipes');
      // Ensure data is an array
      const recipesArray = Array.isArray(data) ? data : [];
      setRecipes(recipesArray);
      setFilteredRecipes(recipesArray);
    } catch (err) {
      setError(err);
      setRecipes([]);
      setFilteredRecipes([]);
      enqueueSnackbar(err.message || 'Failed to load recipes', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const filterRecipes = () => {
    // Ensure recipes is an array
    if (!Array.isArray(recipes)) {
      setFilteredRecipes([]);
      return;
    }

    if (!searchQuery.trim()) {
      setFilteredRecipes(recipes);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = recipes.filter(recipe =>
      recipe.name?.toLowerCase().includes(query) ||
      recipe.description?.toLowerCase().includes(query)
    );
    setFilteredRecipes(filtered);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this recipe?')) {
      return;
    }

    try {
      await api.delete(`/api/recipes/${id}`);
      enqueueSnackbar('Recipe deleted successfully', { variant: 'success' });
      loadRecipes();
    } catch (err) {
      setError(err);
      enqueueSnackbar(err.message || 'Failed to delete recipe', { variant: 'error' });
    }
  };

  const handleViewDetails = async (recipe) => {
    try {
      const data = await api.get(`/api/recipes/${recipe.id}`);
      setSelectedRecipe(data);
      setDetailsDialogOpen(true);
    } catch (err) {
      enqueueSnackbar(err.message || 'Failed to load recipe details', { variant: 'error' });
    }
  };

  const handleEdit = (recipe) => {
    navigate(`/recipe-creation/${recipe.id}`);
  };

  const handleCloseDialog = () => {
    setDetailsDialogOpen(false);
    setSelectedRecipe(null);
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
            Recipe Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            View, search, and manage all your recipes
          </Typography>
        </Box>
        <Chip
          label={`${filteredRecipes.length} Recipes`}
          sx={{
            background: 'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)',
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
            placeholder="Search recipes by name or description..."
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
                <TableCell><strong>Recipe Name</strong></TableCell>
                <TableCell><strong>Description</strong></TableCell>
                <TableCell><strong>Ingredients</strong></TableCell>
                <TableCell><strong>Created</strong></TableCell>
                <TableCell align="right"><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(filteredRecipes) && filteredRecipes.map((recipe) => (
                <TableRow key={recipe.id} hover>
                  <TableCell>{recipe.name}</TableCell>
                  <TableCell>{recipe.description || '-'}</TableCell>
                  <TableCell>
                    <Chip label={`${recipe.ingredient_count || 0} ingredients`} size="small" />
                  </TableCell>
                  <TableCell>{formatDate(recipe.created_at)}</TableCell>
                  <TableCell align="right">
                    <IconButton size="small" color="info" onClick={() => handleViewDetails(recipe)}>
                      <Iconify icon="eva:eye-fill" width={20} />
                    </IconButton>
                    <IconButton size="small" color="primary" onClick={() => handleEdit(recipe)}>
                      <Iconify icon="eva:edit-fill" width={20} />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => handleDelete(recipe.id)}>
                      <Iconify icon="eva:trash-2-fill" width={20} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {Array.isArray(filteredRecipes) && filteredRecipes.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography color="text.secondary">
              {searchQuery ? 'No recipes found matching your search.' : 'No recipes created yet.'}
            </Typography>
          </Box>
        )}
      </Card>

      {/* Recipe Details Dialog */}
      <Dialog
        open={detailsDialogOpen}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Iconify icon="eva:file-text-fill" width={28} />
            <Typography variant="h5" component="span" sx={{ fontWeight: 700 }}>
              Recipe Details
            </Typography>
          </Box>
        </DialogTitle>
        <Divider />
        <DialogContent>
          {selectedRecipe && (
            <Stack spacing={3}>
              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Recipe Name
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {selectedRecipe.name}
                </Typography>
              </Box>

              {selectedRecipe.description && (
                <Box>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Description
                  </Typography>
                  <Typography variant="body1">
                    {selectedRecipe.description}
                  </Typography>
                </Box>
              )}

              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Created Date
                </Typography>
                <Typography variant="body1">
                  {formatDate(selectedRecipe.created_at)}
                </Typography>
              </Box>

              {selectedRecipe.ingredients && selectedRecipe.ingredients.length > 0 && (
                <Box>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ mb: 2 }}>
                    Ingredients ({selectedRecipe.ingredients.length})
                  </Typography>
                  <TableContainer component={Box} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell><strong>Product</strong></TableCell>
                          <TableCell align="right"><strong>Quantity</strong></TableCell>
                          <TableCell><strong>Unit</strong></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {selectedRecipe.ingredients.map((ingredient, index) => (
                          <TableRow key={index}>
                            <TableCell>{ingredient.product_name || ingredient.product_id}</TableCell>
                            <TableCell align="right">{ingredient.quantity}</TableCell>
                            <TableCell>{ingredient.unit || '-'}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              )}

              {selectedRecipe.total_cost && (
                <Box>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Total Cost
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main' }}>
                    ${Number(selectedRecipe.total_cost).toFixed(2)}
                  </Typography>
                </Box>
              )}
            </Stack>
          )}
        </DialogContent>
        <Divider />
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={handleCloseDialog} variant="outlined" startIcon={<Iconify icon="eva:close-fill" />}>
            Close
          </Button>
          <Button
            onClick={() => {
              handleCloseDialog();
              handleEdit(selectedRecipe);
            }}
            variant="contained"
            startIcon={<Iconify icon="eva:edit-fill" />}
          >
            Edit Recipe
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

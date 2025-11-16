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
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { recipesAPI } from '../services/api';
import { formatDate } from '../utils/helpers';
import Loading from '../components/Common/Loading';
import ErrorMessage from '../components/Common/ErrorMessage';

export default function RecipeManagement() {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadRecipes();
  }, []);

  useEffect(() => {
    filterRecipes();
  }, [searchQuery, recipes]);

  const loadRecipes = async () => {
    try {
      setLoading(true);
      const response = await recipesAPI.getAll();
      setRecipes(response.data || []);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const filterRecipes = () => {
    if (!searchQuery.trim()) {
      setFilteredRecipes(recipes);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const filtered = recipes.filter(recipe =>
      recipe.name.toLowerCase().includes(query) ||
      recipe.description?.toLowerCase().includes(query)
    );
    setFilteredRecipes(filtered);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this recipe?')) {
      return;
    }

    try {
      await recipesAPI.delete(id);
      loadRecipes();
    } catch (err) {
      setError(err);
    }
  };

  if (loading) {
    return <Loading message="Loading recipes..." />;
  }

  return (
    <Box>
      {error && <ErrorMessage error={error} onClose={() => setError(null)} />}

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
                  <SearchIcon sx={{ color: 'text.secondary' }} />
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
              {filteredRecipes.map((recipe) => (
                <TableRow key={recipe.id} hover>
                  <TableCell>{recipe.name}</TableCell>
                  <TableCell>{recipe.description || '-'}</TableCell>
                  <TableCell>
                    <Chip label={`${recipe.ingredient_count || 0} ingredients`} size="small" />
                  </TableCell>
                  <TableCell>{formatDate(recipe.created_at)}</TableCell>
                  <TableCell align="right">
                    <IconButton size="small" color="info">
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton size="small" color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => handleDelete(recipe.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {filteredRecipes.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography color="text.secondary">
              {searchQuery ? 'No recipes found matching your search.' : 'No recipes created yet.'}
            </Typography>
          </Box>
        )}
      </Card>
    </Box>
  );
}

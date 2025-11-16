import { config } from '../config';

/**
 * Format a price with currency symbol
 */
export const formatPrice = (price) => {
  if (price === null || price === undefined || isNaN(price)) {
    return `${config.features.defaultCurrency}0.00`;
  }
  return `${config.features.defaultCurrency}${parseFloat(price).toFixed(config.features.priceDecimalPlaces)}`;
};

/**
 * Format a number to specific decimal places
 */
export const formatNumber = (number, decimals = 2) => {
  if (number === null || number === undefined || isNaN(number)) {
    return '0.00';
  }
  return parseFloat(number).toFixed(decimals);
};

/**
 * Calculate cost per unit weight
 */
export const calculateUnitCost = (price, weight, packageSize = 'g') => {
  if (!price || !weight) return 0;
  
  // Convert everything to grams for consistency
  let weightInGrams = parseFloat(weight);
  
  switch (packageSize.toLowerCase()) {
    case 'kg':
      weightInGrams = parseFloat(weight) * 1000;
      break;
    case 'lb':
      weightInGrams = parseFloat(weight) * 453.592;
      break;
    case 'oz':
      weightInGrams = parseFloat(weight) * 28.3495;
      break;
    case 'l':
      weightInGrams = parseFloat(weight) * 1000; // Assuming 1L = 1kg for liquids
      break;
    case 'ml':
      weightInGrams = parseFloat(weight); // Assuming 1ml = 1g for liquids
      break;
    default:
      weightInGrams = parseFloat(weight);
  }
  
  return parseFloat(price) / weightInGrams;
};

/**
 * Calculate ingredient cost based on quantity and vendor pricing
 */
export const calculateIngredientCost = (quantity, unit, vendor) => {
  if (!vendor || !quantity) return 0;
  
  const unitCost = calculateUnitCost(vendor.price, vendor.weight, vendor.package_size);
  
  // Convert quantity to grams
  let quantityInGrams = parseFloat(quantity);
  
  switch (unit.toLowerCase()) {
    case 'kg':
      quantityInGrams = parseFloat(quantity) * 1000;
      break;
    case 'lb':
      quantityInGrams = parseFloat(quantity) * 453.592;
      break;
    case 'oz':
      quantityInGrams = parseFloat(quantity) * 28.3495;
      break;
    case 'l':
      quantityInGrams = parseFloat(quantity) * 1000;
      break;
    case 'ml':
      quantityInGrams = parseFloat(quantity);
      break;
    case 'tsp':
      quantityInGrams = parseFloat(quantity) * 5;
      break;
    case 'tbsp':
      quantityInGrams = parseFloat(quantity) * 15;
      break;
    case 'cup':
      quantityInGrams = parseFloat(quantity) * 240;
      break;
    default:
      quantityInGrams = parseFloat(quantity);
  }
  
  return unitCost * quantityInGrams;
};

/**
 * Format date to readable string
 */
export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Format date and time
 */
export const formatDateTime = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Validate email format
 */
export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/**
 * Debounce function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Get default vendor from list
 */
export const getDefaultVendor = (vendors) => {
  if (!vendors || vendors.length === 0) return null;
  const defaultVendor = vendors.find(v => v.is_default);
  return defaultVendor || vendors[0];
};

/**
 * Validate product data
 */
export const validateProductData = (data) => {
  const errors = {};
  
  if (!data.name || data.name.trim() === '') {
    errors.name = 'Product name is required';
  }
  
  if (!data.vendors || data.vendors.length === 0) {
    errors.vendors = 'At least one vendor is required';
  } else {
    data.vendors.forEach((vendor, index) => {
      if (!vendor.vendor_name || vendor.vendor_name.trim() === '') {
        errors[`vendor_${index}_name`] = 'Vendor name is required';
      }
      if (!vendor.price || parseFloat(vendor.price) <= 0) {
        errors[`vendor_${index}_price`] = 'Valid price is required';
      }
      if (!vendor.weight || parseFloat(vendor.weight) <= 0) {
        errors[`vendor_${index}_weight`] = 'Valid weight is required';
      }
    });
  }
  
  return errors;
};

/**
 * Validate recipe data
 */
export const validateRecipeData = (data) => {
  const errors = {};
  
  if (!data.name || data.name.trim() === '') {
    errors.name = 'Recipe name is required';
  }
  
  if (!data.ingredients || data.ingredients.length === 0) {
    errors.ingredients = 'At least one ingredient is required';
  } else {
    data.ingredients.forEach((ingredient, index) => {
      if (!ingredient.product_id) {
        errors[`ingredient_${index}_product`] = 'Product is required';
      }
      if (!ingredient.quantity || parseFloat(ingredient.quantity) <= 0) {
        errors[`ingredient_${index}_quantity`] = 'Valid quantity is required';
      }
      if (!ingredient.unit) {
        errors[`ingredient_${index}_unit`] = 'Unit is required';
      }
    });
  }
  
  return errors;
};

export default {
  formatPrice,
  formatNumber,
  calculateUnitCost,
  calculateIngredientCost,
  formatDate,
  formatDateTime,
  isValidEmail,
  debounce,
  getDefaultVendor,
  validateProductData,
  validateRecipeData,
};

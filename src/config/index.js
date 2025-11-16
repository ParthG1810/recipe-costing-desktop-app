// Application configuration loaded from environment variables
export const config = {
  api: {
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  },
  app: {
    name: import.meta.env.VITE_APP_NAME || 'Recipe Costing Application',
    version: import.meta.env.VITE_APP_VERSION || '2.0.0',
  },
  features: {
    maxVendorsPerProduct: 10,
    defaultCurrency: '$',
    priceDecimalPlaces: 2,
  },
  units: [
    { value: 'g', label: 'Grams (g)' },
    { value: 'kg', label: 'Kilograms (kg)' },
    { value: 'mg', label: 'Milligrams (mg)' },
    { value: 'oz', label: 'Ounces (oz)' },
    { value: 'lb', label: 'Pounds (lb)' },
    { value: 'ml', label: 'Milliliters (ml)' },
    { value: 'l', label: 'Liters (l)' },
    { value: 'tsp', label: 'Teaspoon (tsp)' },
    { value: 'tbsp', label: 'Tablespoon (tbsp)' },
    { value: 'cup', label: 'Cup' },
    { value: 'pcs', label: 'Pieces (pcs)' },
  ],
};

export default config;

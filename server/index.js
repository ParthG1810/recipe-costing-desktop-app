require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');

const app = express();

// Configuration from environment variables
const config = {
  server: {
    port: process.env.SERVER_PORT || 3001,
    env: process.env.NODE_ENV || 'development',
  },
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'recipe_costing_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  },
  app: {
    maxVendors: parseInt(process.env.MAX_VENDORS_PER_PRODUCT || '10'),
    currencySymbol: process.env.CURRENCY_SYMBOL || '$',
    priceDecimalPlaces: parseInt(process.env.PRICE_DECIMAL_PLACES || '2'),
    debugMode: process.env.DEBUG_MODE === 'true',
  }
};

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Request logging in debug mode
if (config.app.debugMode) {
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  });
}

let pool;

// ============================================
// DATABASE INITIALIZATION
// ============================================

async function initDatabase() {
  try {
    console.log('📊 Initializing database connection...');
    
    // Create connection pool without database first
    const tempPool = mysql.createPool({
      host: config.database.host,
      port: config.database.port,
      user: config.database.user,
      password: config.database.password,
      waitForConnections: config.database.waitForConnections,
      connectionLimit: config.database.connectionLimit,
      queueLimit: config.database.queueLimit,
    });

    // Create database if it doesn't exist
    await tempPool.query(`CREATE DATABASE IF NOT EXISTS ${config.database.database}`);
    console.log(`✅ Database "${config.database.database}" is ready`);
    await tempPool.end();

    // Create pool with database
    pool = mysql.createPool(config.database);

    // Test connection
    const connection = await pool.getConnection();
    console.log('✅ Database connection successful');
    connection.release();

    // Initialize schema
    await initializeSchema();
  } catch (error) {
    console.error('❌ Database initialization error:', error.message);
    if (config.app.debugMode) {
      console.error(error);
    }
    process.exit(1);
  }
}

async function initializeSchema() {
  try {
    // Create products table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_name (name),
        INDEX idx_created_at (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // Create product_vendors table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS product_vendors (
        id INT AUTO_INCREMENT PRIMARY KEY,
        product_id INT NOT NULL,
        vendor_name VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        weight DECIMAL(10, 2) NOT NULL,
        package_size VARCHAR(10) DEFAULT 'g',
        is_default BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
        INDEX idx_product_id (product_id),
        INDEX idx_vendor_name (vendor_name)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // Create recipes table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS recipes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_name (name),
        INDEX idx_created_at (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // Create recipe_ingredients table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS recipe_ingredients (
        id INT AUTO_INCREMENT PRIMARY KEY,
        recipe_id INT NOT NULL,
        product_id INT NOT NULL,
        quantity DECIMAL(10, 2) NOT NULL,
        unit VARCHAR(50) NOT NULL,
        FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
        INDEX idx_recipe_id (recipe_id),
        INDEX idx_product_id (product_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    console.log('✅ Database schema initialized');
  } catch (error) {
    console.error('❌ Schema initialization error:', error.message);
    throw error;
  }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function handleError(res, error, statusCode = 500) {
  console.error('Error:', error.message);
  if (config.app.debugMode) {
    console.error(error);
  }
  res.status(statusCode).json({
    success: false,
    error: error.message,
    ...(config.app.debugMode && { stack: error.stack })
  });
}

// ============================================
// API ROUTES
// ============================================

// Health check
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Recipe Costing API v2.0.0',
    status: 'running',
    environment: config.server.env,
  });
});

// Get app configuration
app.get('/api/config', (req, res) => {
  res.json({
    success: true,
    data: {
      maxVendors: config.app.maxVendors,
      currencySymbol: config.app.currencySymbol,
      priceDecimalPlaces: config.app.priceDecimalPlaces,
    }
  });
});

// ============================================
// PRODUCTS API
// ============================================

// Get all products with their vendors
app.get('/api/products', async (req, res) => {
  try {
    const [products] = await pool.query(
      'SELECT * FROM products ORDER BY created_at DESC'
    );
    
    // Get vendors for each product
    for (let product of products) {
      const [vendors] = await pool.query(
        'SELECT * FROM product_vendors WHERE product_id = ? ORDER BY is_default DESC, id ASC',
        [product.id]
      );
      product.vendors = vendors;
    }
    
    res.json({ success: true, data: products });
  } catch (error) {
    handleError(res, error);
  }
});

// Get single product with vendors
app.get('/api/products/:id', async (req, res) => {
  try {
    const [products] = await pool.query(
      'SELECT * FROM products WHERE id = ?',
      [req.params.id]
    );
    
    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }
    
    const product = products[0];
    const [vendors] = await pool.query(
      'SELECT * FROM product_vendors WHERE product_id = ? ORDER BY is_default DESC, id ASC',
      [product.id]
    );
    product.vendors = vendors;
    
    res.json({ success: true, data: product });
  } catch (error) {
    handleError(res, error);
  }
});

// Create product with vendors
app.post('/api/products', async (req, res) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    
    const { name, description, vendors } = req.body;
    
    // Validation
    if (!name || !name.trim()) {
      throw new Error('Product name is required');
    }
    
    if (vendors && vendors.length > config.app.maxVendors) {
      throw new Error(`Maximum ${config.app.maxVendors} vendors allowed per product`);
    }
    
    // Insert product
    const [result] = await connection.query(
      'INSERT INTO products (name, description) VALUES (?, ?)',
      [name.trim(), description?.trim() || null]
    );
    
    const productId = result.insertId;
    
    // Insert vendors
    if (vendors && vendors.length > 0) {
      for (let vendor of vendors) {
        if (!vendor.vendor_name || !vendor.price || !vendor.weight) {
          throw new Error('Vendor name, price, and weight are required');
        }
        
        await connection.query(
          `INSERT INTO product_vendors 
           (product_id, vendor_name, price, weight, package_size, is_default) 
           VALUES (?, ?, ?, ?, ?, ?)`,
          [
            productId,
            vendor.vendor_name.trim(),
            parseFloat(vendor.price),
            parseFloat(vendor.weight),
            vendor.package_size || 'g',
            vendor.is_default || false
          ]
        );
      }
    }
    
    await connection.commit();
    res.status(201).json({
      success: true,
      id: productId,
      message: 'Product created successfully'
    });
  } catch (error) {
    await connection.rollback();
    handleError(res, error, 400);
  } finally {
    connection.release();
  }
});

// Update product with vendors
app.put('/api/products/:id', async (req, res) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    
    const { name, description, vendors } = req.body;
    
    // Validation
    if (!name || !name.trim()) {
      throw new Error('Product name is required');
    }
    
    if (vendors && vendors.length > config.app.maxVendors) {
      throw new Error(`Maximum ${config.app.maxVendors} vendors allowed per product`);
    }
    
    // Check if product exists
    const [existing] = await connection.query(
      'SELECT id FROM products WHERE id = ?',
      [req.params.id]
    );
    
    if (existing.length === 0) {
      throw new Error('Product not found');
    }
    
    // Update product
    await connection.query(
      'UPDATE products SET name = ?, description = ? WHERE id = ?',
      [name.trim(), description?.trim() || null, req.params.id]
    );
    
    // Delete existing vendors
    await connection.query(
      'DELETE FROM product_vendors WHERE product_id = ?',
      [req.params.id]
    );
    
    // Insert new vendors
    if (vendors && vendors.length > 0) {
      for (let vendor of vendors) {
        if (!vendor.vendor_name || !vendor.price || !vendor.weight) {
          throw new Error('Vendor name, price, and weight are required');
        }
        
        await connection.query(
          `INSERT INTO product_vendors 
           (product_id, vendor_name, price, weight, package_size, is_default) 
           VALUES (?, ?, ?, ?, ?, ?)`,
          [
            req.params.id,
            vendor.vendor_name.trim(),
            parseFloat(vendor.price),
            parseFloat(vendor.weight),
            vendor.package_size || 'g',
            vendor.is_default || false
          ]
        );
      }
    }
    
    await connection.commit();
    res.json({
      success: true,
      message: 'Product updated successfully'
    });
  } catch (error) {
    await connection.rollback();
    handleError(res, error, 400);
  } finally {
    connection.release();
  }
});

// Delete product
app.delete('/api/products/:id', async (req, res) => {
  try {
    const [result] = await pool.query(
      'DELETE FROM products WHERE id = ?',
      [req.params.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    handleError(res, error);
  }
});

// ============================================
// RECIPES API
// ============================================

// Get all recipes
app.get('/api/recipes', async (req, res) => {
  try {
    const [recipes] = await pool.query(
      'SELECT * FROM recipes ORDER BY created_at DESC'
    );
    
    // Add ingredient count to each recipe
    for (let recipe of recipes) {
      const [ingredients] = await pool.query(
        'SELECT COUNT(*) as count FROM recipe_ingredients WHERE recipe_id = ?',
        [recipe.id]
      );
      recipe.ingredient_count = ingredients[0].count;
    }
    
    res.json({ success: true, data: recipes });
  } catch (error) {
    handleError(res, error);
  }
});

// Get single recipe with ingredients
app.get('/api/recipes/:id', async (req, res) => {
  try {
    const [recipes] = await pool.query(
      'SELECT * FROM recipes WHERE id = ?',
      [req.params.id]
    );
    
    if (recipes.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Recipe not found'
      });
    }
    
    const recipe = recipes[0];
    
    // Get ingredients with product details
    const [ingredients] = await pool.query(
      `SELECT ri.*, p.name as product_name, p.description as product_description
       FROM recipe_ingredients ri
       JOIN products p ON ri.product_id = p.id
       WHERE ri.recipe_id = ?
       ORDER BY ri.id`,
      [recipe.id]
    );
    
    // Get vendors for each ingredient
    for (let ingredient of ingredients) {
      const [vendors] = await pool.query(
        'SELECT * FROM product_vendors WHERE product_id = ? ORDER BY is_default DESC, id ASC',
        [ingredient.product_id]
      );
      ingredient.vendors = vendors;
    }
    
    recipe.ingredients = ingredients;
    res.json({ success: true, data: recipe });
  } catch (error) {
    handleError(res, error);
  }
});

// Create recipe
app.post('/api/recipes', async (req, res) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    
    const { name, description, ingredients } = req.body;
    
    // Validation
    if (!name || !name.trim()) {
      throw new Error('Recipe name is required');
    }
    
    if (!ingredients || ingredients.length === 0) {
      throw new Error('At least one ingredient is required');
    }
    
    // Insert recipe
    const [result] = await connection.query(
      'INSERT INTO recipes (name, description) VALUES (?, ?)',
      [name.trim(), description?.trim() || null]
    );
    
    const recipeId = result.insertId;
    
    // Insert ingredients
    for (let ingredient of ingredients) {
      if (!ingredient.product_id || !ingredient.quantity || !ingredient.unit) {
        throw new Error('Product ID, quantity, and unit are required for each ingredient');
      }
      
      await connection.query(
        'INSERT INTO recipe_ingredients (recipe_id, product_id, quantity, unit) VALUES (?, ?, ?, ?)',
        [recipeId, ingredient.product_id, parseFloat(ingredient.quantity), ingredient.unit]
      );
    }
    
    await connection.commit();
    res.status(201).json({
      success: true,
      id: recipeId,
      message: 'Recipe created successfully'
    });
  } catch (error) {
    await connection.rollback();
    handleError(res, error, 400);
  } finally {
    connection.release();
  }
});

// Update recipe
app.put('/api/recipes/:id', async (req, res) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    
    const { name, description, ingredients } = req.body;
    
    // Validation
    if (!name || !name.trim()) {
      throw new Error('Recipe name is required');
    }
    
    if (!ingredients || ingredients.length === 0) {
      throw new Error('At least one ingredient is required');
    }
    
    // Check if recipe exists
    const [existing] = await connection.query(
      'SELECT id FROM recipes WHERE id = ?',
      [req.params.id]
    );
    
    if (existing.length === 0) {
      throw new Error('Recipe not found');
    }
    
    // Update recipe
    await connection.query(
      'UPDATE recipes SET name = ?, description = ? WHERE id = ?',
      [name.trim(), description?.trim() || null, req.params.id]
    );
    
    // Delete existing ingredients
    await connection.query(
      'DELETE FROM recipe_ingredients WHERE recipe_id = ?',
      [req.params.id]
    );
    
    // Insert new ingredients
    for (let ingredient of ingredients) {
      if (!ingredient.product_id || !ingredient.quantity || !ingredient.unit) {
        throw new Error('Product ID, quantity, and unit are required for each ingredient');
      }
      
      await connection.query(
        'INSERT INTO recipe_ingredients (recipe_id, product_id, quantity, unit) VALUES (?, ?, ?, ?)',
        [req.params.id, ingredient.product_id, parseFloat(ingredient.quantity), ingredient.unit]
      );
    }
    
    await connection.commit();
    res.json({
      success: true,
      message: 'Recipe updated successfully'
    });
  } catch (error) {
    await connection.rollback();
    handleError(res, error, 400);
  } finally {
    connection.release();
  }
});

// Delete recipe
app.delete('/api/recipes/:id', async (req, res) => {
  try {
    const [result] = await pool.query(
      'DELETE FROM recipes WHERE id = ?',
      [req.params.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        error: 'Recipe not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Recipe deleted successfully'
    });
  } catch (error) {
    handleError(res, error);
  }
});

// ============================================
// ERROR HANDLING
// ============================================

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  handleError(res, err);
});

// ============================================
// START SERVER
// ============================================

initDatabase().then(() => {
  app.listen(config.server.port, () => {
    console.log('╔════════════════════════════════════════╗');
    console.log('║  Recipe Costing API v2.0.0             ║');
    console.log('╠════════════════════════════════════════╣');
    console.log(`║  Server: http://localhost:${config.server.port}       ║`);
    console.log(`║  Environment: ${config.server.env.padEnd(23)}║`);
    console.log(`║  Database: ${config.database.database.padEnd(25)}║`);
    console.log('╚════════════════════════════════════════╝');
  });
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('\n🛑 SIGTERM signal received: closing HTTP server');
  if (pool) {
    await pool.end();
    console.log('✅ Database connection pool closed');
  }
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('\n🛑 SIGINT signal received: closing HTTP server');
  if (pool) {
    await pool.end();
    console.log('✅ Database connection pool closed');
  }
  process.exit(0);
});

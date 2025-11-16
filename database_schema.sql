-- ============================================
-- Recipe Costing Application - Database Schema
-- Version 2.0.0
-- ============================================
-- This schema is automatically created by the application
-- Use this file only if you need to manually set up the database
-- ============================================

-- Create database
CREATE DATABASE IF NOT EXISTS recipe_costing_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE recipe_costing_db;

-- ============================================
-- DROP EXISTING TABLES (if they exist)
-- ============================================
DROP TABLE IF EXISTS recipe_ingredients;
DROP TABLE IF EXISTS recipes;
DROP TABLE IF EXISTS product_vendors;
DROP TABLE IF EXISTS products;

-- ============================================
-- CREATE PRODUCTS TABLE
-- ============================================
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_name (name),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- CREATE PRODUCT_VENDORS TABLE
-- ============================================
-- Allows unlimited vendors per product
CREATE TABLE product_vendors (
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
  INDEX idx_vendor_name (vendor_name),
  INDEX idx_is_default (is_default)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- CREATE RECIPES TABLE
-- ============================================
CREATE TABLE recipes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_name (name),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- CREATE RECIPE_INGREDIENTS TABLE
-- ============================================
CREATE TABLE recipe_ingredients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  recipe_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity DECIMAL(10, 2) NOT NULL,
  unit VARCHAR(50) NOT NULL,
  
  FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  INDEX idx_recipe_id (recipe_id),
  INDEX idx_product_id (product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- INSERT SAMPLE DATA (Optional - for testing)
-- ============================================

-- Sample Products
INSERT INTO products (name, description) VALUES
('All-Purpose Flour', 'High-quality all-purpose flour for baking'),
('Granulated Sugar', 'Pure white granulated sugar'),
('Butter (Unsalted)', 'Premium unsalted butter'),
('Eggs', 'Large Grade A eggs'),
('Vanilla Extract', 'Pure vanilla extract'),
('Chocolate Chips', 'Semi-sweet chocolate chips'),
('Baking Soda', 'Pure baking soda'),
('Salt', 'Fine table salt');

-- Sample Product Vendors
-- All-Purpose Flour vendors
INSERT INTO product_vendors (product_id, vendor_name, price, weight, package_size, is_default) VALUES
(1, 'Sysco', 15.99, 5, 'kg', TRUE),
(1, 'Gordon Food Service', 14.50, 5, 'kg', FALSE),
(1, 'US Foods', 16.25, 5, 'kg', FALSE);

-- Granulated Sugar vendors
INSERT INTO product_vendors (product_id, vendor_name, price, weight, package_size, is_default) VALUES
(2, 'Sysco', 12.99, 2, 'kg', TRUE),
(2, 'Gordon Food Service', 12.50, 2, 'kg', FALSE);

-- Butter vendors
INSERT INTO product_vendors (product_id, vendor_name, price, weight, package_size, is_default) VALUES
(3, 'Sysco', 8.99, 454, 'g', TRUE),
(3, 'Gordon Food Service', 8.50, 454, 'g', FALSE);

-- Eggs vendors
INSERT INTO product_vendors (product_id, vendor_name, price, weight, package_size, is_default) VALUES
(4, 'Sysco', 3.99, 12, 'pcs', TRUE),
(4, 'Local Farm', 4.50, 12, 'pcs', FALSE);

-- Vanilla Extract vendors
INSERT INTO product_vendors (product_id, vendor_name, price, weight, package_size, is_default) VALUES
(5, 'Sysco', 12.99, 100, 'ml', TRUE);

-- Chocolate Chips vendors
INSERT INTO product_vendors (product_id, vendor_name, price, weight, package_size, is_default) VALUES
(6, 'Sysco', 9.99, 500, 'g', TRUE),
(6, 'Gordon Food Service', 9.50, 500, 'g', FALSE);

-- Baking Soda vendors
INSERT INTO product_vendors (product_id, vendor_name, price, weight, package_size, is_default) VALUES
(7, 'Sysco', 4.99, 500, 'g', TRUE);

-- Salt vendors
INSERT INTO product_vendors (product_id, vendor_name, price, weight, package_size, is_default) VALUES
(8, 'Sysco', 2.99, 1, 'kg', TRUE);

-- Sample Recipes
INSERT INTO recipes (name, description) VALUES
('Chocolate Chip Cookies', 'Classic homemade chocolate chip cookies'),
('Vanilla Cake', 'Simple and delicious vanilla cake'),
('Sugar Cookies', 'Traditional sugar cookies for decorating');

-- Sample Recipe Ingredients
-- Chocolate Chip Cookies
INSERT INTO recipe_ingredients (recipe_id, product_id, quantity, unit) VALUES
(1, 1, 250, 'g'),    -- Flour
(1, 2, 200, 'g'),    -- Sugar
(1, 3, 125, 'g'),    -- Butter
(1, 4, 2, 'pcs'),    -- Eggs
(1, 5, 5, 'ml'),     -- Vanilla
(1, 6, 200, 'g'),    -- Chocolate Chips
(1, 7, 5, 'g'),      -- Baking Soda
(1, 8, 3, 'g');      -- Salt

-- Vanilla Cake
INSERT INTO recipe_ingredients (recipe_id, product_id, quantity, unit) VALUES
(2, 1, 300, 'g'),    -- Flour
(2, 2, 250, 'g'),    -- Sugar
(2, 3, 150, 'g'),    -- Butter
(2, 4, 3, 'pcs'),    -- Eggs
(2, 5, 10, 'ml');    -- Vanilla

-- Sugar Cookies
INSERT INTO recipe_ingredients (recipe_id, product_id, quantity, unit) VALUES
(3, 1, 400, 'g'),    -- Flour
(3, 2, 200, 'g'),    -- Sugar
(3, 3, 200, 'g'),    -- Butter
(3, 4, 2, 'pcs');    -- Eggs

-- ============================================
-- VERIFICATION QUERIES
-- ============================================
SELECT 'Database Setup Complete!' as Status;

SELECT 'Products' as Table_Name, COUNT(*) as Row_Count FROM products
UNION ALL
SELECT 'Product Vendors', COUNT(*) FROM product_vendors
UNION ALL
SELECT 'Recipes', COUNT(*) FROM recipes
UNION ALL
SELECT 'Recipe Ingredients', COUNT(*) FROM recipe_ingredients;

-- ============================================
-- NOTES
-- ============================================
-- The application automatically creates these tables on first run
-- This file is provided for reference and manual setup if needed
-- 
-- Features:
-- - Unlimited vendors per product
-- - Automatic CASCADE delete for related records
-- - Timestamp tracking for all records
-- - Optimized indexes for better performance
-- ============================================

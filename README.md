# Recipe Costing Desktop Application v2.0

A professional desktop application for managing ingredient pricing from multiple vendors and calculating recipe costs automatically. Built with React, Electron, and MySQL.

## ✨ Features

- 🎯 **Modern Dashboard** - User-friendly interface designed for non-technical users
- 💰 **Multi-Vendor Pricing** - Track unlimited vendors per product
- 📊 **Automatic Cost Calculation** - Real-time recipe cost calculations
- 🔄 **Unit Conversion** - Automatic conversion between different units
- 💾 **Local MySQL Database** - Secure local data storage
- 🖥️ **Desktop Application** - Native Windows/Mac/Linux application using Electron
- 🎨 **Material-UI Design** - Modern, responsive interface
- ⚙️ **Environment Variables** - All configurations moved to .env file
- 🔐 **Best Practices** - Following React and JavaScript industry standards

## 📋 Prerequisites

Before installation, ensure you have:

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **MySQL Server** 8.0+ ([Download](https://dev.mysql.com/downloads/mysql/))
- **Windows/Mac/Linux** Operating System

## 🚀 Installation

### Step 1: Install MySQL

1. Download MySQL Server from [https://dev.mysql.com/downloads/mysql/](https://dev.mysql.com/downloads/mysql/)
2. Install MySQL and remember your root password
3. Ensure MySQL service is running

### Step 2: Clone or Download the Application

```bash
cd recipe-costing-desktop-app
```

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Configure Environment Variables

Create a `.env` file in the project root by copying the template:

```bash
cp .env.example .env
```

Edit `.env` and configure your settings:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password_here
DB_NAME=recipe_costing_db

# Server Configuration
SERVER_PORT=3001
NODE_ENV=development

# Frontend Configuration
VITE_API_URL=http://localhost:3001
VITE_APP_NAME=Recipe Costing Application
VITE_APP_VERSION=2.0.0
```

**Important:** Replace `your_mysql_password_here` with your actual MySQL root password.

## 🎮 Running the Application

### Development Mode (Web Browser)

Run frontend and backend separately:

```bash
# Terminal 1: Start the backend server
npm run dev:backend

# Terminal 2: Start the frontend
npm run dev:frontend
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

**OR** run both together:

```bash
npm run dev
```

### Development Mode (Electron Desktop App)

```bash
npm run electron:dev
```

This will start the backend, frontend, and launch the Electron window automatically.

### Production Build

Build the application for production:

```bash
# Build frontend
npm run build

# Package as desktop app for your platform
npm run package:win    # Windows
npm run package:mac    # macOS
npm run package:linux  # Linux
```

The packaged application will be in the `dist-electron` folder.

## 📁 Project Structure

```
recipe-costing-desktop-app/
├── electron/                  # Electron main process
│   ├── main.js               # Main Electron configuration
│   └── preload.js            # Preload script
├── server/                    # Express backend
│   └── index.js              # API server with MySQL
├── src/                       # React frontend
│   ├── components/           # Reusable components
│   │   ├── Common/          # Common UI components
│   │   └── Layout/          # Layout components
│   ├── pages/               # Application pages
│   │   ├── Dashboard.jsx
│   │   ├── ProductEntry.jsx
│   │   ├── ProductManagement.jsx
│   │   ├── RecipeCreation.jsx
│   │   └── RecipeManagement.jsx
│   ├── services/            # API services
│   │   └── api.js          # HTTP client
│   ├── utils/              # Utility functions
│   │   └── helpers.js      # Helper functions
│   ├── config/             # Configuration
│   │   └── index.js       # App configuration
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # React entry point
│   ├── theme.js           # Material-UI theme
│   └── index.css          # Global styles
├── public/                 # Static assets
├── .env.example           # Environment variables template
├── .env                   # Your environment variables (not in git)
├── .gitignore            # Git ignore file
├── package.json          # Dependencies and scripts
├── vite.config.js        # Vite configuration
└── README.md            # This file
```

## 🗄️ Database Schema

The application automatically creates the following tables:

### `products` Table
- `id` - Primary key
- `name` - Product name
- `description` - Product description
- `created_at` - Creation timestamp
- `updated_at` - Update timestamp

### `product_vendors` Table
- `id` - Primary key
- `product_id` - Foreign key to products
- `vendor_name` - Vendor name
- `price` - Vendor price
- `weight` - Package weight
- `package_size` - Unit (g, kg, lb, etc.)
- `is_default` - Default vendor flag
- `created_at` - Creation timestamp
- `updated_at` - Update timestamp

### `recipes` Table
- `id` - Primary key
- `name` - Recipe name
- `description` - Recipe description
- `created_at` - Creation timestamp
- `updated_at` - Update timestamp

### `recipe_ingredients` Table
- `id` - Primary key
- `recipe_id` - Foreign key to recipes
- `product_id` - Foreign key to products
- `quantity` - Ingredient quantity
- `unit` - Measurement unit

## 📖 User Guide

### Adding a Product

1. Click **"Add New Product"** from the dashboard or navigate to **"Add Product"**
2. Enter the product name and optional description
3. Add vendor details:
   - Vendor name
   - Price
   - Package weight
   - Unit (g, kg, lb, etc.)
4. Mark one vendor as default for calculations
5. Click **"Add Product"** to save

### Managing Products

1. Navigate to **"Manage Products"**
2. View all products in a sortable table
3. Click **Edit** icon to modify product details
4. Click **Delete** icon to remove a product
5. Use the search bar to find specific products

### Creating a Recipe

1. Navigate to **"Create Recipe"**
2. Enter recipe name and optional description
3. Add ingredients:
   - Select product from dropdown
   - Enter quantity
   - Select unit of measurement
4. View the automatically calculated total cost
5. Click **"Create Recipe"** to save

### Managing Recipes

1. Navigate to **"Manage Recipes"**
2. View all recipes with their costs
3. Click **View** to see recipe details
4. Click **Edit** to modify ingredients
5. Click **Delete** to remove a recipe

## 🔧 Configuration

All configuration is done through environment variables in the `.env` file:

| Variable | Description | Default |
|----------|-------------|---------|
| `DB_HOST` | MySQL host | localhost |
| `DB_PORT` | MySQL port | 3306 |
| `DB_USER` | MySQL username | root |
| `DB_PASSWORD` | MySQL password | (required) |
| `DB_NAME` | Database name | recipe_costing_db |
| `SERVER_PORT` | Backend server port | 3001 |
| `NODE_ENV` | Environment | development |
| `VITE_API_URL` | API endpoint URL | http://localhost:3001 |
| `MAX_VENDORS_PER_PRODUCT` | Max vendors allowed | 10 |
| `CURRENCY_SYMBOL` | Currency symbol | $ |
| `PRICE_DECIMAL_PLACES` | Price precision | 2 |

## 🛠️ Development

### Available Scripts

- `npm run dev` - Run both frontend and backend in development mode
- `npm run dev:frontend` - Run only the frontend (Vite)
- `npm run dev:backend` - Run only the backend (Express)
- `npm run electron:dev` - Run Electron app in development mode
- `npm run build` - Build frontend for production
- `npm run electron:build` - Build Electron app for production
- `npm run package:win` - Package for Windows
- `npm run package:mac` - Package for macOS
- `npm run package:linux` - Package for Linux

### Tech Stack

**Frontend:**
- React 18
- Material-UI 5
- React Router 6
- Axios
- Vite

**Backend:**
- Node.js
- Express
- MySQL2
- dotenv

**Desktop:**
- Electron

## 🐛 Troubleshooting

### Database Connection Issues

**Problem:** Cannot connect to MySQL database

**Solutions:**
1. Ensure MySQL Server is running
2. Verify password in `.env` file is correct
3. Check MySQL is running on port 3306
4. Ensure database user has proper permissions

### Port Already in Use

**Problem:** Port 3001 or 5173 already in use

**Solutions:**
1. Change `SERVER_PORT` in `.env` file
2. Change `server.port` in `vite.config.js`
3. Close other applications using these ports

### Application Won't Start

**Solutions:**
1. Delete `node_modules` folder
2. Run `npm install` again
3. Check `.env` file exists and is configured correctly
4. Check Node.js version (should be 18+)

## 📝 API Endpoints

### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Recipes

- `GET /api/recipes` - Get all recipes
- `GET /api/recipes/:id` - Get single recipe
- `POST /api/recipes` - Create recipe
- `PUT /api/recipes/:id` - Update recipe
- `DELETE /api/recipes/:id` - Delete recipe

### Configuration

- `GET /api/config` - Get app configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - See LICENSE file for details

## 👨‍💻 Support

For issues and questions:
1. Check the Troubleshooting section
2. Review the User Guide
3. Open an issue on GitHub

## 🎯 Future Enhancements

- [ ] Recipe export to PDF
- [ ] Bulk product import from CSV
- [ ] Multi-language support
- [ ] Recipe categorization
- [ ] Inventory management
- [ ] Cost history tracking
- [ ] Mobile responsive web version
- [ ] Cloud backup option

## 📊 Version History

### v2.0.0 (Current)
- Complete rebuild with modern React and Vite
- Improved UI/UX with Material-UI
- Environment variable configuration
- Better error handling
- Unlimited vendors per product
- Enhanced code organization
- Professional documentation

---

**Built with ❤️ using React, Electron, and MySQL**

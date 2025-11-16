# Quick Installation Guide

## Prerequisites

1. **Node.js 18+** - [Download here](https://nodejs.org/)
2. **MySQL 8.0+** - [Download here](https://dev.mysql.com/downloads/mysql/)

## Installation Steps

### 1. Install MySQL

- Download and install MySQL Server
- Set a root password during installation (remember this!)
- Ensure MySQL service is running

### 2. Set Up the Application

```bash
# Navigate to the project directory
cd recipe-costing-desktop-app

# Install all dependencies
npm install
```

### 3. Configure Environment

```bash
# Copy the environment template
cp .env.example .env
```

Edit the `.env` file and set your MySQL password:

```env
DB_PASSWORD=your_mysql_password_here
```

### 4. Run the Application

**Option A: Web Browser (Development)**
```bash
npm run dev
```
Then open http://localhost:5173

**Option B: Desktop App (Recommended)**
```bash
npm run electron:dev
```

### 5. Build for Production (Optional)

```bash
# Build the application
npm run build

# Package as desktop app
npm run package:win   # For Windows
npm run package:mac   # For macOS
npm run package:linux # For Linux
```

## Troubleshooting

### MySQL Connection Error
- Make sure MySQL is running
- Check your password in `.env` is correct
- Ensure MySQL is on port 3306

### Port Already in Use
- Change `SERVER_PORT=3001` to another port in `.env`
- Or stop other applications using port 3001

### Dependencies Won't Install
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

## Need Help?

Check the full README.md for detailed documentation, or contact support.

---

**You're all set!** The application will automatically create the database and tables on first run.

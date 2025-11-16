@echo off
echo ========================================
echo GitHub Upload Script
echo Recipe Costing Desktop App
echo ========================================
echo.

echo This script will help you upload this project to GitHub.
echo.
echo PREREQUISITES:
echo 1. You must have Git installed (download from https://git-scm.com/)
echo 2. You must have a GitHub account
echo 3. You should have created a new repository on GitHub.com
echo.
echo Press any key when you're ready to continue...
pause >nul

echo.
echo ========================================
echo Step 1: Checking Git Installation
echo ========================================
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Git is not installed!
    echo Please download and install Git from: https://git-scm.com/
    pause
    exit /b 1
)
echo Git is installed! ✓
echo.

echo ========================================
echo Step 2: Initialize Git Repository
echo ========================================
if exist .git (
    echo Git repository already initialized
) else (
    git init
    echo Git repository initialized ✓
)
echo.

echo ========================================
echo Step 3: Configure Git (if needed)
echo ========================================
git config user.name >nul 2>&1
if %errorlevel% neq 0 (
    echo Please enter your name for Git commits:
    set /p gitname="Your Name: "
    git config --global user.name "%gitname%"
)

git config user.email >nul 2>&1
if %errorlevel% neq 0 (
    echo Please enter your email for Git commits:
    set /p gitemail="Your Email: "
    git config --global user.email "%gitemail%"
)
echo Git configured ✓
echo.

echo ========================================
echo Step 4: Stage All Files
echo ========================================
git add .
if %errorlevel% neq 0 (
    echo ERROR: Failed to add files
    pause
    exit /b 1
)
echo All files staged ✓
echo.

echo ========================================
echo Step 5: Create Initial Commit
echo ========================================
git commit -m "Initial commit: Recipe Costing Desktop App v2.0 - Professional React + Electron application with MySQL backend"
if %errorlevel% neq 0 (
    echo ERROR: Failed to commit
    pause
    exit /b 1
)
echo Initial commit created ✓
echo.

echo ========================================
echo Step 6: Connect to GitHub Repository
echo ========================================
echo.
echo Please enter your GitHub repository URL.
echo It should look like: https://github.com/YOUR_USERNAME/recipe-costing-desktop-app.git
echo.
set /p repourl="Repository URL: "

git remote add origin %repourl%
if %errorlevel% neq 0 (
    echo Remote already exists, updating URL...
    git remote set-url origin %repourl%
)
echo Remote repository configured ✓
echo.

echo ========================================
echo Step 7: Push to GitHub
echo ========================================
echo.
echo This will upload your code to GitHub.
echo You may be prompted for your GitHub credentials.
echo.
echo Press any key to continue...
pause >nul

git branch -M main
git push -u origin main

if %errorlevel% neq 0 (
    echo.
    echo ========================================
    echo Push failed! Common solutions:
    echo ========================================
    echo 1. Make sure you created the repository on GitHub.com
    echo 2. Check your GitHub username and password
    echo 3. If using 2FA, you need a Personal Access Token instead of password
    echo    Get one at: https://github.com/settings/tokens
    echo 4. Make sure the repository URL is correct
    echo.
    echo You can try again by running this script again.
    pause
    exit /b 1
)

echo.
echo ========================================
echo SUCCESS! ✓
echo ========================================
echo Your code has been uploaded to GitHub!
echo.
echo Repository URL: %repourl%
echo.
echo Next steps:
echo 1. Visit your repository on GitHub
echo 2. Add topics/tags for discoverability
echo 3. Add a screenshot (optional)
echo 4. Share with others!
echo.
echo ========================================
pause

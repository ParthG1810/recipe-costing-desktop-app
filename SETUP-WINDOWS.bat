@echo off
echo ========================================
echo Recipe Costing App - Windows Setup
echo ========================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo Please download and install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo [1/4] Node.js found
echo.

REM Check if .env file exists
if not exist .env (
    echo [2/4] Creating .env file from template...
    copy .env.example .env
    echo.
    echo IMPORTANT: Please edit .env file and set your MySQL password!
    echo Press any key after you've edited .env file...
    pause >nul
) else (
    echo [2/4] .env file already exists
)

echo.
echo [3/4] Installing dependencies...
call npm install

if %errorlevel% neq 0 (
    echo.
    echo ERROR: Failed to install dependencies!
    pause
    exit /b 1
)

echo.
echo [4/4] Setup complete!
echo.
echo ========================================
echo Next Steps:
echo ========================================
echo 1. Make sure MySQL is running
echo 2. Verify .env file has your MySQL password
echo 3. Run one of these commands:
echo.
echo    npm run dev           - Web version
echo    npm run electron:dev  - Desktop app
echo.
echo ========================================
pause

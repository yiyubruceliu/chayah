@echo off
echo 🚀 Starting Chayah Kalahari Project Build Process...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js from https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo ✅ Node.js found
echo.

REM Run the build script
node build.js

echo.
echo 🎉 Build process completed!
echo 📁 Check the 'dist' folder for the optimized files
echo.
pause 
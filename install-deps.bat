@echo off
echo 📦 Installing Chayah Kalahari Project Dependencies...
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

REM Check if npm is available
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not available. Please check your Node.js installation.
    echo.
    pause
    exit /b 1
)

echo ✅ npm found
echo.

REM Install dependencies
echo 📥 Installing dependencies...
npm install

echo.
echo 🎉 Dependencies installed successfully!
echo.
echo 💡 You can now run the build process with:
echo    node build.js
echo    or
echo    build.bat
echo.
pause 
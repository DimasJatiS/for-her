@echo off
echo.
echo ========================================
echo    FOR HER - Opening Documentation
echo ========================================
echo.
echo Opening PROJECT_SUMMARY.md...
start PROJECT_SUMMARY.md
timeout /t 2 /nobreak >nul

echo Opening QUICK_START.md...
start QUICK_START.md
timeout /t 1 /nobreak >nul

echo.
echo Documentation opened in your default editor!
echo.
echo Next steps:
echo 1. Read PROJECT_SUMMARY.md for overview
echo 2. Follow QUICK_START.md for setup
echo.
pause

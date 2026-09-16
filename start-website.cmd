@echo off
echo Starting SANA Architects Portfolio Website...
cd /d "%~dp0"
call npm run preview -- --port 3000
pause

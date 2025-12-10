@echo off
REM Helper: Run the app locally using an existing PostgreSQL installation.
REM Make sure you have PostgreSQL installed and a DB/user ready.

cd /d "%~dp0"

if not exist .env (
  copy .env.example .env >nul
  echo Created .env from .env.example. Please edit .env with your DB credentials and save.
  echo Press any key to continue after editing .env...
  pause >nul
)

echo Installing npm dependencies (this may take a moment)...
npm install
if errorlevel 1 (
  echo npm install failed. Fix errors above then re-run this script.
  pause
  exit /b 1
)

echo Running DB migration...
npm run migrate
if errorlevel 1 (
  echo Migration failed. Check error output above.
  pause
  exit /b 1
)

echo Starting the server...
npm start

@echo off
REM Helper: Start the app and Postgres using Docker Compose.
REM Requirements: Docker Desktop (and Docker Compose) must be installed.

docker --version >nul 2>&1
if errorlevel 1 (
  echo Docker not found. Please install Docker Desktop: https://www.docker.com/get-started
  pause
  exit /b 1
)

echo Starting services with Docker Compose (build if needed)...
docker compose up --build

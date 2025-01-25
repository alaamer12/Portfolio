@echo off
echo [DEPLOY] Starting deployment process...

REM Check if we're on main branch
for /f "tokens=*" %%a in ('git rev-parse --abbrev-ref HEAD') do set BRANCH=%%a
if not "%BRANCH%"=="main" (
    echo Error: You must be on main branch to deploy
    exit /b 1
)

REM Check for uncommitted changes
git diff-index --quiet HEAD --
if errorlevel 1 (
    echo Error: You have uncommitted changes. Please commit or stash them first.
    exit /b 1
)

echo [DEPLOY] Installing dependencies...
call bun install

REM Run tests if they exist
findstr /C:"\"test\":" package.json >nul
if not errorlevel 1 (
    echo [DEPLOY] Running tests...
    call bun test
)

echo [DEPLOY] Cleaning dist directory...
if exist dist rmdir /s /q dist

echo [DEPLOY] Building project...
call bun run build
if errorlevel 1 (
    echo Error: Build failed
    exit /b 1
)

echo [DEPLOY] Deploying to Vercel...
call vercel --prod

if errorlevel 1 (
    echo Error: Deployment failed
    exit /b 1
) else (
    echo [DEPLOY] Deployment completed successfully!
    echo Your site is now live!
    
    REM Get the deployment URL
    for /f "tokens=*" %%a in ('vercel --prod --confirm') do set DEPLOY_URL=%%a
    echo Deployment URL: %DEPLOY_URL%
)

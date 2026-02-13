# Setup & Test Script

Write-Host "🤍 For Her - Quick Setup Check" -ForegroundColor Magenta
Write-Host "================================" -ForegroundColor Magenta
Write-Host ""

# Check if in correct directory
if (-Not (Test-Path "package.json")) {
    Write-Host "❌ Error: Run this from project root (for-her/)" -ForegroundColor Red
    exit 1
}

Write-Host "✓ In correct directory" -ForegroundColor Green

# Check dependencies
Write-Host ""
Write-Host "Checking dependencies..." -ForegroundColor Yellow
if (-Not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install
} else {
    Write-Host "✓ Dependencies installed" -ForegroundColor Green
}

# Check environment file
Write-Host ""
Write-Host "Checking environment..." -ForegroundColor Yellow
if (Test-Path ".env.local") {
    Write-Host "✓ .env.local exists" -ForegroundColor Green
    
    $envContent = Get-Content ".env.local" -Raw
    if ($envContent -match "placeholder") {
        Write-Host "⚠️  Using placeholder Supabase credentials" -ForegroundColor Yellow
        Write-Host "   > See SUPABASE_SETUP.md to configure database" -ForegroundColor Cyan
    } else {
        Write-Host "✓ Supabase configured" -ForegroundColor Green
    }
} else {
    Write-Host "❌ .env.local missing" -ForegroundColor Red
}

# Check content files
Write-Host ""
Write-Host "Checking content..." -ForegroundColor Yellow

# Images
$imageCount = 0
@("memory-1.jpg", "memory-2.jpg", "memory-3.jpg", "memory-4.jpg") | ForEach-Object {
    if (Test-Path "public\images\$_") {
        $imageCount++
    }
}

if ($imageCount -eq 4) {
    Write-Host "✓ All 4 memory images present" -ForegroundColor Green
} else {
    Write-Host "⚠️  $imageCount/4 images added" -ForegroundColor Yellow
    Write-Host "   > Add photos to public/images/" -ForegroundColor Cyan
    Write-Host "   > See IMAGE_INSTRUCTIONS.md" -ForegroundColor Cyan
}

# Music
if (Test-Path "public\audio\background-music.mp3") {
    $musicSize = (Get-Item "public\audio\background-music.mp3").Length / 1MB
    Write-Host "✓ Music file present ($([math]::Round($musicSize, 1)) MB)" -ForegroundColor Green
    
    if ($musicSize -gt 8) {
        Write-Host "⚠️  Music file is large (>8MB) - may slow loading" -ForegroundColor Yellow
    }
} else {
    Write-Host "⚠️  Background music missing" -ForegroundColor Yellow
    Write-Host "   > Add to public/audio/background-music.mp3" -ForegroundColor Cyan
    Write-Host "   > See MUSIC_SETUP.md" -ForegroundColor Cyan
}

# Test build
Write-Host ""
Write-Host "Testing build..." -ForegroundColor Yellow
$buildResult = npm run build 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Build successful" -ForegroundColor Green
} else {
    Write-Host "❌ Build failed" -ForegroundColor Red
    Write-Host "   Check error messages above" -ForegroundColor Cyan
}

# Summary
Write-Host ""
Write-Host "================================" -ForegroundColor Magenta
Write-Host "Summary" -ForegroundColor Magenta
Write-Host "================================" -ForegroundColor Magenta
Write-Host ""

if ($imageCount -eq 4 -and (Test-Path "public\audio\background-music.mp3")) {
    Write-Host "🎉 Ready to deploy!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Yellow
    Write-Host "1. npm run dev  (test locally)" -ForegroundColor Cyan
    Write-Host "2. Follow DEPLOYMENT.md to go live" -ForegroundColor Cyan
} else {
    Write-Host "📝 Setup incomplete" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "To do:" -ForegroundColor Yellow
    if ($imageCount -lt 4) {
        Write-Host "- Add memory photos to public/images/" -ForegroundColor Cyan
    }
    if (-Not (Test-Path "public\audio\background-music.mp3")) {
        Write-Host "- Add music to public/audio/" -ForegroundColor Cyan
    }
    Write-Host ""
    Write-Host "See QUICK_START.md for details" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "Documentation:" -ForegroundColor Yellow
Write-Host "- PROJECT_SUMMARY.md  (overview)" -ForegroundColor Cyan
Write-Host "- QUICK_START.md      (setup checklist)" -ForegroundColor Cyan
Write-Host "- SUPABASE_SETUP.md   (database)" -ForegroundColor Cyan
Write-Host "- DEPLOYMENT.md       (go live)" -ForegroundColor Cyan
Write-Host ""

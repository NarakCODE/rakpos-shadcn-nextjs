$ErrorActionPreference = "Stop"

$fontUrl = "https://mishanaer.com/ui/geist-rounded/fonts/GeistRounded.woff2"
$targets = @(
    "src/app/fonts/GeistRounded.woff2",
    "public/fonts/GeistRounded.woff2"
)

foreach ($target in $targets) {
    $dir = Split-Path -Parent $target
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
    }
    Invoke-WebRequest -Uri $fontUrl -OutFile $target
    Write-Host "Saved $target"
}

#!/usr/bin/env bash
set -euo pipefail

FONT_URL="https://mishanaer.com/ui/geist-rounded/fonts/GeistRounded.woff2"

mkdir -p app/fonts public/fonts
curl -fSL "$FONT_URL" -o app/fonts/GeistRounded.woff2
cp app/fonts/GeistRounded.woff2 public/fonts/GeistRounded.woff2
echo "Saved GeistRounded.woff2 to app/fonts/ and public/fonts/"

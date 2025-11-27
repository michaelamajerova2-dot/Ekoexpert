#!/bin/bash

# Receptár - Installation Script
# Tento skript nainštaluje všetky závislosti

echo "Receptár - Inštalácia závislostí"
echo "====================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "[ERROR] Node.js nie je nainštalovaný!"
    echo "Stiahni Node.js z: https://nodejs.org/"
    exit 1
fi

echo "[OK] Node.js $(node --version)"
echo "[OK] npm $(npm --version)"
echo ""

# Root directory
echo "Inštalujem root závislosti..."
npm install
echo ""

# Backend
echo "Inštalujem backend závislosti..."
cd backend
npm install
cd ..
echo ""

# Frontend
echo "Inštalujem frontend závislosti..."
cd frontend
npm install
cd ..
echo ""

echo "Inštalácia dokončená!"
echo ""
echo "Spusti aplikáciu:"
echo "   npm run dev"
echo ""
echo "Otvor v prehliadači:"
echo "   http://localhost:5173"
echo ""

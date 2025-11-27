#!/bin/bash

# Start Backend Server with proper PATH
cd "$(dirname "$0")/../backend"

echo "Spúšťam Backend server..."
echo "Port: 3000"
echo ""

# Nastaviť PATH pre node a npm
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"

# Spustiť npm dev
npm run dev

#!/bin/bash

# Start Frontend Server with proper PATH
cd "$(dirname "$0")/../frontend"

echo "Spúšťam Frontend server..."
echo "Port: 5173"
echo ""

# Nastaviť PATH pre node a npm
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"

# Spustiť npm dev
npm run dev

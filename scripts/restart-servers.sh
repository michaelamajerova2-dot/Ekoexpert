#!/bin/bash

# Restart all servers

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "Reštartujem servery..."
echo ""

# Zastaviť
"$SCRIPT_DIR/stop-servers.sh"

echo ""
echo "Čakám 2 sekundy..."
sleep 2
echo ""

# Spustiť
"$SCRIPT_DIR/start-all.sh"

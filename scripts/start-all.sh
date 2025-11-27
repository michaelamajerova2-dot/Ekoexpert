#!/bin/bash

# Start both Backend and Frontend servers

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "Receptár - Spúšťam všetky servery"
echo "===================================="
echo ""

# Zastaviť staré procesy (ak bežia)
"$SCRIPT_DIR/stop-servers.sh" 2>/dev/null
echo ""
sleep 1

# Spustiť backend na pozadí
echo "Spúšťam Backend..."
"$SCRIPT_DIR/start-backend.sh" > /tmp/receptar-backend.log 2>&1 &
BACKEND_PID=$!
echo "[OK] Backend PID: $BACKEND_PID"

# Počkať kým backend naštartuje
sleep 3

# Spustiť frontend na pozadí
echo ""
echo "Spúšťam Frontend..."
"$SCRIPT_DIR/start-frontend.sh" > /tmp/receptar-frontend.log 2>&1 &
FRONTEND_PID=$!
echo "[OK] Frontend PID: $FRONTEND_PID"

echo ""
echo "===================================="
echo "Servery bežia!"
echo ""
echo "Backend:  http://localhost:3000"
echo "Frontend: http://localhost:5173"
echo ""
echo "Logy:"
echo "   Backend:  tail -f /tmp/receptar-backend.log"
echo "   Frontend: tail -f /tmp/receptar-frontend.log"
echo ""
echo "Pre zastavenie: ./scripts/stop-servers.sh"
echo "===================================="

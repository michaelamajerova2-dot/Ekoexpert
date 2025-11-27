#!/bin/bash

# Check server status

echo "Stav serverov"
echo "==============="
echo ""

# Check backend
BACKEND_PID=$(lsof -ti:3000 2>/dev/null)
if [ ! -z "$BACKEND_PID" ]; then
    echo "[OK] Backend:  BEŽÍ (PID: $BACKEND_PID, Port: 3000)"
else
    echo "[ERROR] Backend:  NEBEŽÍ"
fi

# Check frontend
FRONTEND_PID=$(lsof -ti:5173 2>/dev/null)
if [ ! -z "$FRONTEND_PID" ]; then
    echo "[OK] Frontend: BEŽÍ (PID: $FRONTEND_PID, Port: 5173)"
else
    echo "[ERROR] Frontend: NEBEŽÍ"
fi

echo ""

# Check if both are running
if [ ! -z "$BACKEND_PID" ] && [ ! -z "$FRONTEND_PID" ]; then
    echo "Všetko beží! Otvor: http://localhost:5173"
elif [ ! -z "$BACKEND_PID" ] || [ ! -z "$FRONTEND_PID" ]; then
    echo "[WARNING] Beží len jeden server"
else
    echo "Žiadne servery nebežia"
    echo "Spusti: ./scripts/start-all.sh"
fi

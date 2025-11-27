#!/bin/bash

# Stop all servers

echo "Zastavujem servery..."
echo ""

# Zastaviť backend (port 3000)
BACKEND_PID=$(lsof -ti:3000 2>/dev/null)
if [ ! -z "$BACKEND_PID" ]; then
    echo "Zastavujem Backend (PID: $BACKEND_PID)"
    kill -9 $BACKEND_PID 2>/dev/null
    echo "[OK] Backend zastavený"
else
    echo "[INFO] Backend nebeží"
fi

echo ""

# Zastaviť frontend (port 5173)
FRONTEND_PID=$(lsof -ti:5173 2>/dev/null)
if [ ! -z "$FRONTEND_PID" ]; then
    echo "Zastavujem Frontend (PID: $FRONTEND_PID)"
    kill -9 $FRONTEND_PID 2>/dev/null
    echo "[OK] Frontend zastavený"
else
    echo "[INFO] Frontend nebeží"
fi

echo ""
echo "Hotovo!"

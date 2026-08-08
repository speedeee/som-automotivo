#!/bin/bash
clear
echo "=========================================="
echo "      ⚡ SPEED RÁDIO - INICIALIZADOR     "
echo "=========================================="
echo ""
echo "[1] Subindo servidor local..."
cd ~/minha-radio && node server.js &
PID_SERVER=$!

sleep 2
echo ""
echo "[2] Gerando link público de internet..."
echo "=========================================="
cloudflared tunnel --url http://localhost:3000
kill $PID_SERVER

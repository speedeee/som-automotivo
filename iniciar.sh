#!/bin/bash
clear
pkill -f node > /dev/null 2>&1
pkill -f cloudflared > /dev/null 2>&1
sleep 1

echo "=========================================="
echo "      ⚡ SPEED RÁDIO - LIGANDO...        "
echo "=========================================="
echo ""

# Inicia o servidor
cd ~/minha-radio && node server.js > /dev/null 2>&1 &

# Gera o link mostrando direto na tela sem travar
cloudflared tunnel --url http://127.0.0.1:3000 2>&1 | grep --line-buffered -o 'https://[a-zA-Z0-9-]*\.trycloudflare\.com' | head -n 1

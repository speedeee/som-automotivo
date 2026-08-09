#!/bin/bash
PASTA_JOGO="./meu_jogo"
PORTA=8085

# Limpa processos antigos
killall node serve 2>/dev/null

echo "Iniciando servidor local na porta $PORTA..."
npx serve -s "$PASTA_JOGO" -p $PORTA > /dev/null 2>&1 &

sleep 3

echo "=========================================="
echo "Servidor local: http://localhost:$PORTA"
echo "=========================================="
echo "Gerando link publico via Serveo..."
echo "=========================================="

ssh -o StrictHostKeyChecking=no -R 80:localhost:$PORTA serveo.net

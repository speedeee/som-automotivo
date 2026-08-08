#!/bin/bash
# Inicia o servidor Node em segundo plano
node server.js &
# Dá um tempo para o servidor subir
sleep 2
# Inicia o túnel do Serveo apontando para a porta 3000
ssh -R 80:localhost:3000 serveo.net

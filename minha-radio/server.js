import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let fila = [];
let musicaAtual = null;

// Rota de Login do ADM
app.post('/api/login', (req, res) => {
    const { email, pass, password } = req.body;
    const senhaDigitada = pass || password;
    
    if (email === 'admin@speed.com' && senhaDigitada === '123456') {
        return res.json({ success: true, token: 'token-adm-speed' });
    }
    return res.json({ success: false, message: 'E-mail ou senha incorretos!' });
});

// Comunicação em Tempo Real
io.on('connection', (socket) => {
    socket.emit('novaMusica', { musica: musicaAtual });
    socket.emit('atualizarFila', fila);

    socket.on('adicionarMusica', (link) => {
        if (!musicaAtual) {
            musicaAtual = link;
            io.emit('novaMusica', { musica: musicaAtual });
        } else {
            fila.push(link);
            io.emit('atualizarFila', fila);
        }
    });

    socket.on('proximaMusicaAuto', () => {
        if (fila.length > 0) {
            musicaAtual = fila.shift();
            io.emit('novaMusica', { musica: musicaAtual });
            io.emit('atualizarFila', fila);
        } else {
            musicaAtual = null;
            io.emit('novaMusica', { musica: null });
        }
    });

    socket.on('comandoDJ', (cmd) => {
        if (cmd === 'skip') {
            if (fila.length > 0) {
                musicaAtual = fila.shift();
                io.emit('novaMusica', { musica: musicaAtual });
                io.emit('atualizarFila', fila);
            } else {
                musicaAtual = null;
                io.emit('novaMusica', { musica: null });
            }
        } else {
            io.emit('executarComandoDJ', cmd);
        }
    });

    socket.on('limparFila', () => {
        fila = [];
        io.emit('atualizarFila', fila);
    });
});

const PORT = 3000;
server.listen(PORT, () => console.log(`🚀 SERVIDOR SPEED RÁDIO RODANDO NA PORTA ${PORT}`));

let audioCtx;
let isXtreme = false;

function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
}

function trocarAba(screenId, btn) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  
  document.getElementById(screenId).classList.add('active');
  btn.classList.add('active');
}

function atualizarPalco() {
  const wooferQty = parseInt(document.getElementById('wooferQty').value) || 2;
  const driverQty = parseInt(document.getElementById('driverQty').value) || 2;
  const dutoType = document.getElementById('dutoType').value;
  const wooferBrand = document.getElementById('wooferBrand').value;
  const hornFormat = document.getElementById('hornFormat').value;

  const painelWoofers = document.getElementById('painelWoofers');
  const painelCornetas = document.getElementById('painelCornetas');
  const painelDutos = document.getElementById('painelDutos');

  painelWoofers.innerHTML = '';
  painelCornetas.innerHTML = '';
  painelDutos.innerHTML = '';

  let hornClass = 'real-driver';
  if (hornFormat === 'round') hornClass += ' round';
  if (hornFormat === 'guia') hornClass += ' guia';

  for(let i=0; i<driverQty; i++) {
    painelCornetas.innerHTML += `<div class="${hornClass}"><div class="real-driver-led-throat"></div>DRIVER</div>`;
  }

  for(let i=0; i<wooferQty; i++) {
    painelWoofers.innerHTML += `<div class="real-woofer">${wooferBrand}</div>`;
  }

  if (dutoType === 'redondo') {
    painelDutos.innerHTML = `<div class="duto-redondo"></div><div class="duto-redondo"></div>`;
  } else if (dutoType === 'triangular') {
    painelDutos.innerHTML = `<div class="duto-triangular"></div><div class="duto-triangular"></div>`;
  } else {
    painelDutos.innerHTML = `<div class="duto-quadrado"></div>`;
  }
}

function trocarPlayerPeloMenu(tipo) {
  const container = document.getElementById('playerHardwareContainer');
  if (tipo === 'pioneer') {
    container.innerHTML = `
      <div class="pioneer-face">
        <div class="pioneer-top-row">
          <div class="pioneer-knob-btn" onclick="tocarEfeito('grave')">VOL</div>
          <div class="pioneer-screen-blue">PIONEER - 12.6V<br><span>READY TO BASS</span></div>
        </div>
      </div>`;
  } else if (tipo === 'reddvd') {
    container.innerHTML = `
      <div class="pioneer-face">
        <div class="pioneer-top-row">
          <div class="pioneer-knob-btn" style="border-color:#ff0055; color:#ff0055;" onclick="tocarEfeito('grave')">PWR</div>
          <div class="pioneer-screen-blue" style="border-color:#ff0055; color:#ff0055; text-shadow:0 0 5px #ff0055;">DVD RED PLAYER<br><span>DVD-ROM / MP3</span></div>
        </div>
      </div>`;
  } else {
    container.innerHTML = `
      <div class="android-screen-container">
        <div class="android-display-hdr">
          <div class="android-album-art">🎵</div>
          <div style="font-size:10px;"><b>Central Android</b><br>Bluetooth Conectado</div>
        </div>
      </div>`;
  }
}

function alternarXtreme() {
  isXtreme = !isXtreme;
  const btn = document.getElementById('btnXtreme');
  if (isXtreme) {
    btn.classList.add('active');
    btn.innerText = "⚡ BASS BOOST XTREME (LIGADO)";
    document.getElementById('voltsEmbutido').innerText = "14.4V";
  } else {
    btn.classList.remove('active');
    btn.innerText = "⚡ BASS BOOST XTREME (DESLIGADO)";
    document.getElementById('voltsEmbutido').innerText = "12.6V";
  }
}

function alterarMaterialCaixa() {
  const mat = document.getElementById('boxMaterial').value;
  const caixa = document.getElementById('caixaAcustica');
  if (mat === 'couro') caixa.style.borderColor = '#111';
  else if (mat === 'carbono') caixa.style.borderColor = '#00f0ff';
  else if (mat === 'mdf') caixa.style.borderColor = '#a16207';
  else caixa.style.borderColor = '#27272a';
}

function alterarCorCaixa() {
  const cor = document.getElementById('caixaBgColor').value;
  document.documentElement.style.setProperty('--caixa-bg-color', cor);
}

function alterarFotoCaixa(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById('caixaAcustica').style.backgroundImage = `url('${e.target.result}')`;
    };
    reader.readAsDataURL(file);
  }
}

function alterarFundoApp(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      document.body.style.backgroundImage = `url('${e.target.result}')`;
    };
    reader.readAsDataURL(file);
  }
}

function alterarCorPlayerLed(cor) {
  document.documentElement.style.setProperty('--player-led-color', cor);
}

function atualizarLeds() {
  const c1 = document.getElementById('ledColor1').value;
  const c2 = document.getElementById('ledColor2').value;
  const mode = document.getElementById('ledMode').value;
  const palco = document.getElementById('palcoVirtual');

  document.documentElement.style.setProperty('--led-color1', c1);
  document.documentElement.style.setProperty('--led-color2', c2);

  palco.classList.remove('led-giratorio', 'led-pisca');
  if (mode === 'giratorio') palco.classList.add('led-giratorio');
  if (mode === 'pisca') palco.classList.add('led-pisca');
}

function tocarEfeito(tipo) {
  initAudio();
  if (audioCtx.state === 'suspended') audioCtx.resume();

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  const agora = audioCtx.currentTime;

  if (tipo === 'airhorn') {
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(400, agora);
    osc.frequency.exponentialRampToValueAtTime(700, agora + 0.3);
    gain.gain.setValueAtTime(0.3, agora);
    gain.gain.exponentialRampToValueAtTime(0.01, agora + 0.4);
    osc.start(agora);
    osc.stop(agora + 0.4);
  } else if (tipo === 'grave') {
    osc.type = 'sine';
    osc.frequency.setValueAtTime(isXtreme ? 220 : 160, agora);
    osc.frequency.exponentialRampToValueAtTime(25, agora + 0.8);
    gain.gain.setValueAtTime(0.7, agora);
    gain.gain.exponentialRampToValueAtTime(0.01, agora + 0.8);
    osc.start(agora);
    osc.stop(agora + 0.8);
    if (navigator.vibrate) navigator.vibrate(300);
  } else if (tipo === 'sirene') {
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(600, agora);
    osc.frequency.linearRampToValueAtTime(1200, agora + 0.2);
    gain.gain.setValueAtTime(0.3, agora);
    gain.gain.exponentialRampToValueAtTime(0.01, agora + 0.5);
    osc.start(agora);
    osc.stop(agora + 0.5);
  } else if (tipo === 'laser') {
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(1500, agora);
    osc.frequency.exponentialRampToValueAtTime(200, agora + 0.25);
    gain.gain.setValueAtTime(0.3, agora);
    gain.gain.exponentialRampToValueAtTime(0.01, agora + 0.25);
    osc.start(agora);
    osc.stop(agora + 0.25);
  } else if (tipo === 'paredao' || tipo === 'maritima') {
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(250, agora);
    osc.frequency.exponentialRampToValueAtTime(500, agora + 0.5);
    gain.gain.setValueAtTime(0.4, agora);
    gain.gain.exponentialRampToValueAtTime(0.01, agora + 0.6);
    osc.start(agora);
    osc.stop(agora + 0.6);
  }
}

function carregarPlaylist(event) {
  const files = event.target.files;
  const container = document.getElementById('playlistContainer');
  const player = document.getElementById('audioPlayer');

  if (files.length > 0) {
    container.innerHTML = '';
    Array.from(files).forEach((file, idx) => {
      const item = document.createElement('div');
      item.className = 'playlist-item';
      item.innerText = `${idx + 1}. ${file.name}`;
      item.onclick = function() {
        player.src = URL.createObjectURL(file);
        player.play();
        document.querySelectorAll('.playlist-item').forEach(i => i.classList.remove('ativo'));
        item.classList.add('ativo');
      };
      container.appendChild(item);
    });
  }
}

window.onload = function() {
  atualizarPalco();
  trocarPlayerPeloMenu('pioneer');
};

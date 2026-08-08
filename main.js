let audioCtx;

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

  const painelWoofers = document.getElementById('painelWoofers');
  const painelCornetas = document.getElementById('painelCornetas');
  const painelDutos = document.getElementById('painelDutos');

  painelWoofers.innerHTML = '';
  painelCornetas.innerHTML = '';
  painelDutos.innerHTML = '';

  for(let i=0; i<driverQty; i++) {
    painelCornetas.innerHTML += `<div class="real-driver"><div class="real-driver-led-throat"></div>DRIVER</div>`;
  }

  for(let i=0; i<wooferQty; i++) {
    painelWoofers.innerHTML += `<div class="real-woofer">${wooferBrand}</div>`;
  }

  if (dutoType === 'redondo') {
    painelDutos.innerHTML = `<div class="duto-redondo"></div><div class="duto-redondo"></div>`;
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
  } else {
    container.innerHTML = `
      <div class="android-screen-container">
        <div class="android-display-hdr">
          <div class="android-album-art">🎵</div>
          <div style="font-size:10px;"><b>Central Android</b><br>Bluetooth conectado</div>
        </div>
      </div>`;
  }
}

function atualizarLeds() {
  const c1 = document.getElementById('ledColor1').value;
  const c2 = document.getElementById('ledColor2').value;
  document.documentElement.style.setProperty('--led-color1', c1);
  document.documentElement.style.setProperty('--led-color2', c2);
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
    osc.frequency.setValueAtTime(160, agora);
    osc.frequency.exponentialRampToValueAtTime(30, agora + 0.7);
    gain.gain.setValueAtTime(0.6, agora);
    gain.gain.exponentialRampToValueAtTime(0.01, agora + 0.7);
    osc.start(agora);
    osc.stop(agora + 0.7);
    if (navigator.vibrate) navigator.vibrate(250);
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
  }
}

window.onload = function() {
  atualizarPalco();
  trocarPlayerPeloMenu('pioneer');
};

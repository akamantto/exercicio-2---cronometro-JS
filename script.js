let tempoDecorrido = 0;
let intervalo;
let emExecucao = false;
let pausas = [];

const tempoDisplay = document.getElementById('time');
const botaoIniciarPausar = document.getElementById('startPauseBtn');
const botaoParar = document.getElementById('stopBtn');
const listaDePausas = document.getElementById('pauseList');


function atualizarListaDePausas() {
  listaDePausas.innerHTML = '';
  pausas.forEach(pausa => {
    const item = document.createElement('li');
    item.classList.add('list-group-item');
    item.textContent = `Pausa em: ${pausa}`;
    listaDePausas.appendChild(item);
  });
}

function formatarTempo(ms) {
  let segundos = Math.floor(ms / 1000);
  let minutos = Math.floor(segundos / 60);
  segundos = segundos % 60;
  let horas = Math.floor(minutos / 60);
  minutos = minutos % 60;
  
  return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
}


function alternarIniciarPausar() {
  if (emExecucao) {
    clearInterval(intervalo); 
    pausas.push(formatarTempo(tempoDecorrido)); 
    atualizarListaDePausas();
  } else {
    intervalo = setInterval(() => {
      tempoDecorrido += 1000;
      tempoDisplay.textContent = formatarTempo(tempoDecorrido);
    }, 1000);
  }
  emExecucao = !emExecucao;
  botaoIniciarPausar.textContent = emExecucao ? 'Pausar' : 'Iniciar';
}


function parar() {
  clearInterval(intervalo);
  tempoDecorrido = 0;
  tempoDisplay.textContent = '00:00:00';
  pausas = []; 
  atualizarListaDePausas();
  emExecucao = false;
  botaoIniciarPausar.textContent = 'Iniciar';
}




botaoIniciarPausar.addEventListener('click', alternarIniciarPausar);
botaoParar.addEventListener('click', parar);

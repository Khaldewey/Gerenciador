//let estoque = 10;
const dados = {
  retirada: [0],
  devolucao: [0],
  matricula: [0],
  estoque: [10, 9],
};

function start() {
  lerLs();
  acionar();

  var buttonEstoqueR = document.querySelector('#botaor');
  buttonEstoqueR.addEventListener('click', actionButtonr);

  var buttonEstoqueD = document.querySelector('#botaod');
  buttonEstoqueD.addEventListener('click', actionButtond);

  //var buttonMatricula = document.querySelector('#botaom');
  //buttonMatricula.addEventListener('click', actionButtonm);
}

function acionar() {
  tabelaAutomaticaD();
  tabelaAutomaticaR();
}

function lerLs() {
  if (!window.localStorage) {
    return;
  }
  var estoque = window.localStorage.getItem('est');
  var matr = window.localStorage.getItem('mat');
  var dev = window.localStorage.getItem('dev');
  var ret = window.localStorage.getItem('ret');
  if (estoque) {
    dados.estoque = JSON.parse(estoque);
  }
  if (matr) {
    dados.matricula = JSON.parse(matr);
  }
  if (dev) {
    dados.devolucao = JSON.parse(dev);
  }
  if (ret) {
    dados.retirada = JSON.parse(ret);
  }
}
function escreverLs() {
  window.localStorage.setItem('est', JSON.stringify(dados.estoque));
  window.localStorage.setItem('dev', JSON.stringify(dados.devolucao));
  window.localStorage.setItem('mat', JSON.stringify(dados.matricula));
  window.localStorage.setItem('ret', JSON.stringify(dados.retirada));
}

function retirarCartoes() {
  if (dados.estoque[0] == 0) {
    alert('Estoque insuficiente');
    return;
  } else var inputRetirada = document.querySelector('#retirarcartoes');

  if (Number(inputRetirada.value) < 0 || Number(inputRetirada.value) > 10) {
    alert('Imbecil coloque um número entre o intervalo de 0 a 10');
    return;
  }
  if (dados.estoque[0] - Number(inputRetirada) < 0) {
    alert('Estoque insuficiente');
    return;
  } else dados.retirada.unshift(Number(inputRetirada.value));
  tabelar();
  calcularEstoqueR(inputRetirada.value);
  escreverLs();
  document.getElementById('matricula').value = '';
  return (document.getElementById('respostaqtd').innerHTML = dados.estoque[0]);
}

function devolverCartoes() {
  var inputDevolver = document.querySelector('#devolvercartoes');
  if (dados.estoque[0] == 10) {
    alert('Estoque já está cheio');
    return;
  } else if (dados.estoque[0] + Number(inputDevolver.value) > 10) {
    alert('Estoque já está cheio');
    return;
  } else if (
    Number(inputDevolver.value) < 1 ||
    Number(inputDevolver.value) > 10
  ) {
    alert('Imbecil coloque um número entre o intervalo de 1 a 10');
    return;
  } else dados.devolucao.unshift(Number(inputDevolver.value));
  tabelad();
  calcularEstoqueD(inputDevolver.value);
  escreverLs();
  document.getElementById('matricula').value = '';
  return (document.getElementById('respostaqtd').innerHTML = dados.estoque[0]);
}

function calcularEstoqueR(valor) {
  x = dados.estoque[0] - Number(valor);
  dados.estoque.unshift(x);
  return x;
}

function calcularEstoqueD(valor) {
  x = dados.estoque[0] + Number(valor);
  dados.estoque.unshift(x);
  return x;
}

function actionButtonr() {
  retirarCartoes();
  document.getElementById('retirarcartoes').value = '';
}

function actionButtond() {
  devolverCartoes();
  document.getElementById('devolvercartoes').value = '';
}

function tabelar() {
  var table = document.querySelector('#tabela');
  var inputRetirada = document.querySelector('#retirarcartoes');
  var inputMatricula = document.querySelector('#matricula');
  dados.matricula.unshift(Number(inputMatricula.value));
  var trMofiu = document.createElement('tr');
  var tdTrretirada = document.createElement('td');
  tdTrretirada.textContent =
    'Matrícula :' + dados.matricula[0] + ' Retirou :' + dados.retirada[0];

  table.appendChild(trMofiu);
  trMofiu.appendChild(tdTrretirada);
}

function tabelad() {
  var table = document.querySelector('#tabela');
  var inputDevolver = document.querySelector('#devolvercartoes');
  var inputMatricula = document.querySelector('#matricula');
  dados.matricula.unshift(Number(inputMatricula.value));
  var trMofiu = document.createElement('tr');
  var tdTrdevolver = document.createElement('td');
  tdTrdevolver.textContent =
    'Matrícula :' + dados.matricula[0] + ' Devolveu :' + dados.devolucao[0];

  table.appendChild(trMofiu);
  trMofiu.appendChild(tdTrdevolver);
}

function tabelaAutomaticaD() {
  var table = document.querySelector('#tabela');
  var trMofiu = document.createElement('tr');
  var tdTrdevolver = document.createElement('td');
  tdTrdevolver.textContent =
    'Matrícula :' + dados.matricula[0] + ' Devolveu :' + dados.devolucao[0];
  document.getElementById('respostaqtd').innerHTML = dados.estoque[0];
  table.appendChild(trMofiu);
  trMofiu.appendChild(tdTrdevolver);
}

function tabelaAutomaticaR() {
  var table = document.querySelector('#tabela');
  var trMofiu = document.createElement('tr');
  var tdTrretirada = document.createElement('td');
  tdTrretirada.textContent =
    'Matrícula :' + dados.matricula[0] + ' Retirou :' + dados.retirada[0];
  document.getElementById('respostaqtd').innerHTML = dados.estoque[0];
  table.appendChild(trMofiu);
  trMofiu.appendChild(tdTrretirada);
}

function puxaEstoque() {}

/*function actionButtonm() {
  var inputMatricula = document.querySelector('#matricula');
  if (matriculas.includes(Number(inputMatricula.value)) === true) {
    alert('Matrícula Encontrada');
  } else {
    alert('Matrícula Inválida');
  }

  document.getElementById('matricula').value = '';
}*/

start();

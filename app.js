// Renomeando o título e o parágrafo via JavaScript
const titulo = document.querySelector('h1');
titulo.innerHTML = 'Jogo do número secreto';

const paragrafo = document.querySelector('#paragrafo');
paragrafo.innerHTML = 'Digite um número entre <strong>1 e 10<strong/> e descubra o número secreto!'

// Validando o input para aceitar apenas números entre 1 e 10
const input = document.querySelector('#input__chute');
const erro = document.querySelector('#erro')
const teclasProibidas = ['e','E', '+', '-', '.', ',','0'];
const valorMinimo = 1;
const valorMaximo = 10;

input.addEventListener('keydown', function(event) {

    let valorFuturo = input.value + event.key; //Valor que o input terá se a tecla pressionada for permitida

    if (teclasProibidas.includes(event.key) || 
        parseInt(valorFuturo) > valorMaximo) 
    {
        erro.innerHTML = `O valor "${valorFuturo}" não é permitido! Por favor, digite apenas um valor entre ${valorMinimo} e ${valorMaximo}.`;
        event.preventDefault();
    }

});

// Validando o chute do usuário
function verificarChute() {
    const numeroSecreto = Math.floor(Math.random() * 10) + 1;
    const chute = parseInt(input.value);
    const botaoReiniciar = document.querySelector('#reiniciar');

    
}
/**
 * @file Script único para o Jogo do Número Secreto.
 * @author LaylsondeAlbuquerque
 * @version 1.0
 *
 * @description
 * Este arquivo contém toda a lógica para o funcionamento do jogo, incluindo:
 * - Seleção de elementos do DOM.
 * - Gerenciamento do estado do jogo (número secreto, tentativas).
 * - Validação de entrada do usuário em tempo real.
 * - Funções para verificar o chute, reiniciar a partida e controlar a interface.
 * - Registro dos ouvintes de eventos (event listeners).
 */


// =======================================================
// SELEÇÃO DE ELEMENTOS DO DOM E ESTADO INICIAL DO JOGO
// =======================================================

// --- Seleção dos Elementos HTML ---
// Armazena as referências aos elementos do DOM em constantes para melhor performance e organização.
const titulo = document.querySelector('h1');
const paragrafo = document.querySelector('#paragrafo');
const input = document.querySelector('#input__chute');
const erro = document.querySelector('#erro');
const botaoNovoJogo = document.querySelector('#novo-jogo');
const botaoChutar = document.querySelector('#chutar');

// --- Estado (State) do Jogo ---
// Variáveis que controlam o estado atual da partida.
// São declaradas com 'let' para que seus valores possam ser atualizados.
let numeroSecreto = gerarNumeroAleatorio();
let tentativasRestantes = 5;

// --- Configuração Inicial da Interface (UI) ---
// Define os textos e estados iniciais dos elementos na tela ao carregar a página.
titulo.innerHTML = 'Jogo do número secreto';
paragrafo.innerHTML = 'Digite um número entre <strong>1 e 10</strong> e descubra o número secreto!';
botaoNovoJogo.disabled = true;


// =======================================================
// VALIDAÇÃO DE ENTRADA DO USUÁRIO (INPUT)
// =======================================================

// Adiciona um "ouvinte" ao evento 'keydown' para validar a entrada em tempo real,
// antes mesmo que o caractere apareça na tela, melhorando a experiência do usuário.
input.addEventListener('keydown', function(event) {
    // Lista de caracteres que são inválidos para um input numérico neste contexto.
    const teclasProibidas = ['e', 'E', '+', '-', '.', ','];
    const valorMinimo = 1;
    const valorMaximo = 10;

    // Lista de exceções: teclas de controle que são essenciais para a usabilidade
    // e devem ser sempre permitidas (ex: apagar, navegar com as setas).
    const teclasPermitidas = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab', 'Delete'];
    if (teclasPermitidas.includes(event.key)) {
        erro.innerHTML = ''; // Limpa a mensagem de erro ao usar uma tecla de controle.
        return; // Interrompe a função e permite a ação da tecla.
    }

    // Lógica "preditiva": calcula qual seria o valor do input se a tecla fosse permitida.
    let valorFuturo = input.value + event.key;
    let numeroFuturo = parseInt(valorFuturo);

    // Condição de bloqueio: impede a digitação se a tecla for proibida
    // ou se o número resultante estiver fora do intervalo de 1 a 10.
    if (teclasProibidas.includes(event.key) || numeroFuturo < valorMinimo || numeroFuturo > valorMaximo) {
        erro.innerHTML = `Apenas números entre ${valorMinimo} e ${valorMaximo} são permitidos.`;
        event.preventDefault(); // Cancela a ação padrão da tecla (impede a digitação).
    } else {
        // Se a tecla pressionada for válida, garante que a mensagem de erro esteja limpa.
        erro.innerHTML = '';
    }
});


// =======================================================
// FUNÇÕES COM A LÓGICA PRINCIPAL DO JOGO
// =======================================================

/**
 * Função central do jogo, chamada a cada tentativa do usuário.
 * Compara o chute com o número secreto e atualiza a interface com o feedback apropriado.
 */
function verificarChute() {
    // Obtém o valor atual do input e o converte para um número inteiro.
    const chute = parseInt(input.value);

    // Valida se o input não está vazio ou se não é um número.
    if (isNaN(chute)) {
        erro.innerHTML = 'Você precisa digitar um número.';
        return; // Interrompe a função se a entrada for inválida.
    }

    // Compara o chute com o número secreto.
    if (chute === numeroSecreto) {
        // Bloco de código para quando o usuário ACERTA.
        const tentativasUsadas = 6 - tentativasRestantes; // Calcula o número de tentativas gastas.
        paragrafo.innerHTML = `Parabéns! Você acertou em ${tentativasUsadas} tentativa(s). O número era ${numeroSecreto}!`;
        desabilitarJogo();
    } else {
        // Bloco de código para quando o usuário ERRA.
        tentativasRestantes--; // Decrementa o número de tentativas restantes.
        const dica = chute > numeroSecreto ? 'menor' : 'maior'; // Gera a dica (maior/menor) para o próximo chute.

        if (tentativasRestantes > 0) {
            // Se errou, mas AINDA HÁ TENTATIVAS.
            paragrafo.innerHTML = `Você errou! O número secreto é ${dica}. Restam ${tentativasRestantes} tentativa(s).`;
        } else {
            // Se errou e ACABARAM AS TENTATIVAS.
            paragrafo.innerHTML = `Suas tentativas acabaram! O número secreto era ${numeroSecreto}.`;
            desabilitarJogo();
        }
    }
    // Limpa o campo do input após cada tentativa para facilitar a próxima jogada.
    input.value = '';
    input.focus(); // Devolve o foco (cursor) ao input, melhorando a usabilidade.
}

/**
 * Prepara o jogo para uma nova partida, resetando o estado e a interface.
 */
function reiniciarJogo() {
    // Gera um novo número secreto para a nova partida.
    numeroSecreto = gerarNumeroAleatorio();
    // Reseta o contador de tentativas para o valor inicial.
    tentativasRestantes = 5;

    // Reabilita os controles do jogo (botão de chutar e campo de input).
    botaoChutar.disabled = false;
    input.disabled = false;
    botaoNovoJogo.disabled = true;

    // Limpa os campos de texto e reseta a interface para o estado inicial.
    input.value = "";
    erro.innerHTML = "";
    paragrafo.innerHTML = 'Digite um número entre <strong>1 e 10</strong> e descubra o número secreto!';
    input.focus();
}


// =======================================================
// FUNÇÕES AUXILIARES
// =======================================================

/**
 * Desabilita os controles do jogo (botão e input) ao final de uma partida.
 */
function desabilitarJogo() {
    botaoChutar.disabled = true;
    input.disabled = true;
    botaoNovoJogo.disabled = false; // Habilita o botão para iniciar um "Novo Jogo".
}

/**
 * Gera um número inteiro aleatório entre 1 e 10 (inclusos).
 * @returns {number} O número aleatório gerado.
 */
function gerarNumeroAleatorio() {
    return Math.floor(Math.random() * 10) + 1;
}


// =======================================================
// REGISTRO DOS EVENTOS (EVENT LISTENERS)
// Conecta os elementos HTML às funções JavaScript.
// =======================================================

// Adiciona um "ouvinte" que chama a função reiniciarJogo quando o botão "Novo Jogo" é clicado.
botaoNovoJogo.addEventListener('click', reiniciarJogo);

// OBS: O evento de 'chutar' é gerenciado pelo <form> no HTML,
// que chama a função 'verificarChute()' ao ser submetido (via clique no botão 'submit' ou tecla 'Enter').
// Fiz isso para exercitar as três formas de trabalhar com eventos em JavaScript.
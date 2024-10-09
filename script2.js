document.addEventListener('DOMContentLoaded', function () {
    const elements = {
        participanteAtualDiv: document.querySelector('.profile'),
        btnProximo: document.querySelector('.next-btn'),
        btnAnterior: document.querySelector('.prev-btn'),
        btnVoltar: document.querySelector('.back-btn'),
        btnConfirmar: document.querySelector('.confirm-btn'), // Botão de confirmação
        btnPresenca: document.querySelector('.btn-p'),
        btnFalta: document.querySelector('.btn-f'),
        dataSelecionada: document.getElementById('dataSelecionada')
    };

    let indiceAtual = 0;

    const participantes = [
        { nome: "RAPHAEL TRINDADE", sobrenome: "Diretoria" },
        { nome: "LILIANE CAMARGO", sobrenome: "Diretoria" },
        { nome: "LETÍCIA LEAL", sobrenome: "Diretoria" },
        { nome: "DEIVISON MARTINS", sobrenome: "Diretoria" },
        { nome: "MARIA EDUARDA MORGADO", sobrenome: "Diretoria" },
        { nome: "ARTUR MILLER", sobrenome: "Diretoria" },
        { nome: "GABRIELA CAETANO", sobrenome: "Metsa" },
        { nome: "ANA LUISA MORGADO", sobrenome: "Diretoria" },
        { nome: "ISABELA CAETANO", sobrenome: "Diretoria" },
        { nome: "HENRIQUE OST", sobrenome: "Diretoria" },
        { nome: "MARIANA ANDRADE", sobrenome: "Virta" },
        { nome: "MANUELA ANDRADE", sobrenome: "Diretoria" },
        { nome: "MANUELA SÁ", sobrenome: "Metsa" },
        { nome: "ESTHER HORMUNDO", sobrenome: "Linna" },
        { nome: "BRUNA SOUZA", sobrenome: "Linna" },
        { nome: "PEDRO FERRAZ", sobrenome: "Soturi" },
        { nome: "LETICIA TAVARES", sobrenome: "Diretoria" },
        { nome: "ALANA MILLER", sobrenome: "Diretoria" },
        { nome: "JOÃO MURILO MACIEL", sobrenome: "Soturi" },
        { nome: "MELISSA OST", sobrenome: "Virta" },
        { nome: "LUCCAS DIAS", sobrenome: "Soturi" },
        { nome: "INGRID GABRIELLY", sobrenome: "Metsa" },
        { nome: "ENZO HORMUNDO", sobrenome: "Diretoria" },
        { nome: "RICKSON SANTOS", sobrenome: "Vuori" },
        { nome: "ISABELLY DATRINO", sobrenome: "Virta" },
        { nome: "PETER GABRIEL MACEDO", sobrenome: "Vuori" },
        { nome: "LUÍSA SOUZA", sobrenome: "Linna" },
        { nome: "LUIZ HENRIQUE CAVALHEIRO", sobrenome: "Soturi" },
        { nome: "ISAAC SALDANHA", sobrenome: "Vuori" },
        { nome: "CLARA SILVA", sobrenome: "Metsa" },
        { nome: "DAVI BOTELHO", sobrenome: "Vuori" },
        { nome: "RAFAEL BOTELHO", sobrenome: "Vuori" },
        { nome: "MIGUEL LUIS", sobrenome: "Soturi" },
        { nome: "MARIA LUISA DINIZ", sobrenome: "Linna" },
        { nome: "REBECA JESUS", sobrenome: "Virta" },
        { nome: "MIGUEL ÂNGELO", sobrenome: "Vuori" },
        { nome: "LARA VITORIA", sobrenome: "Virta" },
        { nome: "LAIS GABRIELY", sobrenome: "Linna" },
        { nome: "JOÃO PEDRO LUIZ", sobrenome: "Soturi" },
        { nome: "ESTHER CECIM", sobrenome: "Metsa" },
        { nome: "FILIPE MOREIRA", sobrenome: "Vuori" },
        { nome: "MARIA EDUARDA GUIMARÃES", sobrenome: "Metsa" },
        { nome: "GABRIEL GOMES", sobrenome: "Vuori" },
        { nome: "DAVI VILLARINHO", sobrenome: "Soturi" },
        { nome: "ANTHONY REIS", sobrenome: "Soturi" },
        { nome: "JOÃO LUCAS ESPERANÇA", sobrenome: "Diretoria" }
    ];

    // Limpar dados de chamadas anteriores
    localStorage.removeItem('chamada');

    function mostrarParticipante(indice) {
        if (indice < 0 || indice >= participantes.length) return;
        const participante = participantes[indice];
        document.querySelector('.nome').textContent = participante.nome;
        document.querySelector('.sobrenome').textContent = participante.sobrenome;
    }

    elements.btnProximo.addEventListener('click', () => {
        if (indiceAtual < participantes.length - 1) {
            indiceAtual++;
            mostrarParticipante(indiceAtual);
        } else {
            alert("Fim da lista de participantes.");
        }
    });

    elements.btnAnterior.addEventListener('click', () => {
        if (indiceAtual > 0) {
            indiceAtual--;
            mostrarParticipante(indiceAtual);
        } else {
            alert("Você está no primeiro participante.");
        }
    });

    elements.btnPresenca.addEventListener('click', () => {
        const nomeAtual = document.querySelector('.nome').textContent;
        const sobrenomeAtual = document.querySelector('.sobrenome').textContent;
        registrarPresencaOuFalta(nomeAtual, sobrenomeAtual, 'Presença');
    });

    elements.btnFalta.addEventListener('click', () => {
        const nomeAtual = document.querySelector('.nome').textContent;
        const sobrenomeAtual = document.querySelector('.sobrenome').textContent;
        registrarPresencaOuFalta(nomeAtual, sobrenomeAtual, 'Falta');
    });

    function registrarPresencaOuFalta(nome, sobrenome, status) {
        const data = formatarData(elements.dataSelecionada.textContent);  // Formatar a data antes de enviar

        // Armazena localmente as presenças e faltas
        let chamada = JSON.parse(localStorage.getItem('chamada')) || [];
        chamada.push({ nome, sobrenome, status, data });
        localStorage.setItem('chamada', JSON.stringify(chamada));

        // Se for presença, envia para o Google Sheets
        if (status === 'Presença') {
            const url = 'https://script.google.com/macros/s/AKfycbwSFqHa8YarVelfkIZf6GYGugZJd_M3jwaYI-m0vVfcxwJKBNOlGNkzMk2ULPx7Vh8cXg/exec';  // Substitua pela URL do Google Apps Script
            
            // Formatar os dados para envio
            const dadosEnvio = {
                nome: nome,
                sobrenome: sobrenome,
                data: data,  // Data já formatada
                status: status
            };

            fetch(url, {
                method: 'POST',
                mode: 'no-cors',  // Necessário para evitar problemas de CORS
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dadosEnvio)
            })
            .then(() => {
                console.log("Presença enviada com sucesso");
            })
            .catch(error => console.error("Erro ao enviar dados:", error));                        
        }

        proximoParticipante();
    }

    function formatarData(data) {
        const partes = data.split('-');
        return `${partes[2]}/${partes[1]}/${partes[0]}`;  // Converte de "YYYY-MM-DD" para "DD/MM/YYYY"
    }

    function proximoParticipante() {
        if (indiceAtual < participantes.length - 1) {
            indiceAtual++;
            mostrarParticipante(indiceAtual);
        } else {
            alert("Fim da lista de participantes.");
        }
    }

    const dataSelecionada = localStorage.getItem('selectedDate');
    if (dataSelecionada) elements.dataSelecionada.textContent = formatarData(dataSelecionada);  // Exibe a data formatada

    mostrarParticipante(indiceAtual);

    // Botão para voltar à página anterior
    elements.btnVoltar.addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    // Botão de confirmação (superior direito) para ir para a página 3
    elements.btnConfirmar.addEventListener('click', () => {
        window.location.href = 'lista.html';  // Verifique se o nome do arquivo HTML está correto
    });
});

// Verifica se o usuário está autenticado como administrador
window.onload = function() {
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

    if (!usuarioLogado || usuarioLogado.tipo !== "admin") {
        alert("Acesso negado! Faça login como administrador.");
        window.location.href = "login.html"; 
        return;
    }

    carregarMensagens();
};

// Função para enviar a mensagem
document.getElementById('formContato').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário padrão

    // Captura os valores dos campos do formulário
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const mensagem = document.getElementById('mensagem').value;

    if (!nome || !email || !mensagem) {
        alert("Preencha todos os campos!");
        return;
    }

    // Cria um objeto com os dados e um ID único
    const novaMensagem = {
        id: Date.now(),
        nome: nome,
        email: email,
        mensagem: mensagem,
        lida: false
    };

    // Recupera e atualiza as mensagens salvas
    let mensagens = JSON.parse(localStorage.getItem('mensagens')) || [];
    mensagens.push(novaMensagem);

    // Salva no localStorage
    localStorage.setItem('mensagens', JSON.stringify(mensagens));

    alert("Mensagem enviada com sucesso!");
    document.getElementById('formContato').reset(); // Limpa o formulário
});

// Função para carregar as mensagens
function carregarMensagens() {
    const mensagens = JSON.parse(localStorage.getItem('mensagens')) || [];
    const mensagensContainer = document.getElementById('mensagensContainer');

    mensagensContainer.innerHTML = mensagens.length === 0 
        ? '<p>Nenhuma mensagem recebida.</p>' 
        : '';

    mensagens.forEach(mensagem => {
        const mensagemRow = document.createElement('tr');

        mensagemRow.innerHTML = `
            <td><input type="checkbox" ${mensagem.lida ? "checked" : ""} 
                onclick="marcarComoLida(this, ${mensagem.id})"></td>
            <td>${mensagem.email}</td>
            <td>${mensagem.nome}</td>
            <td>${mensagem.mensagem}</td>
            <td><button onclick="responderMensagem('${mensagem.email}')">Responder</button></td>
            <td><button onclick="apagarMensagem(${mensagem.id})">Apagar</button></td>
        `;

        mensagensContainer.appendChild(mensagemRow);
    });
}

// Função para marcar como lida
function marcarComoLida(checkbox, id) {
    let mensagens = JSON.parse(localStorage.getItem("mensagens")) || [];
    const mensagem = mensagens.find(msg => msg.id === id);

    if (mensagem) {
        mensagem.lida = checkbox.checked;
        localStorage.setItem("mensagens", JSON.stringify(mensagens));
        alert(`Mensagem ${checkbox.checked ? "marcada como lida" : "desmarcada como lida"}!`);
    }
}

// Função para responder mensagens
function responderMensagem(email) {
    const resposta = prompt("Digite sua resposta:");
    if (resposta) {
        alert(`Resposta enviada para ${email}: ${resposta}`);
    } else {
        alert("Resposta não enviada.");
    }
}

// Função para apagar mensagem
function apagarMensagem(id) {
    let mensagens = JSON.parse(localStorage.getItem("mensagens")) || [];
    mensagens = mensagens.filter(mensagem => mensagem.id !== id);

    localStorage.setItem("mensagens", JSON.stringify(mensagens));
    alert("Mensagem apagada com sucesso!");
    carregarMensagens(); // Recarrega a lista
}

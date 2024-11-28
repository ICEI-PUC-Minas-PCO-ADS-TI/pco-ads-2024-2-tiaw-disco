document.getElementById('formContato').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário padrão

    // Captura os valores dos campos do formulário
    var nome = document.getElementById('email').value;
    var email = document.getElementById('assunto').value;
    var mensagem = document.getElementById('mensagem').value;

    // Cria um objeto com os dados
    var dados = {
        nome: nome,
        email: email,
        mensagem: mensagem
    };

    // Recupera as mensagens salvas no localStorage ou cria um array vazio se não houver mensagens
    let mensagens = JSON.parse(localStorage.getItem('mensagens')) || [];

    // Adiciona a nova mensagem ao array
    mensagens.push(dados);

    // Salva o array de mensagens atualizado no localStorage
    localStorage.setItem('mensagens', JSON.stringify(mensagens));

    alert("Mensagem enviada com sucesso!");
});


window.onload = function() {
    // Recupera as mensagens salvas no localStorage
    var mensagens = JSON.parse(localStorage.getItem('mensagens')) || [];

    // Obtém o container onde as mensagens serão exibidas
    var mensagensContainer = document.getElementById('mensagensContainer');

    // Verifica se existem mensagens
    if (mensagens.length === 0) {
        mensagensContainer.innerHTML = '<p>Nenhuma mensagem recebida.</p>';
    } else {
        // Itera sobre as mensagens e cria um HTML para cada uma
        mensagens.forEach(mensagem => {
            var mensagemDiv = document.createElement('div');
            mensagemDiv.classList.add('mensagem');

            mensagemDiv.innerHTML = `
                <p><strong>Nome:</strong> ${mensagem.nome}</p>
                <p><strong>Email:</strong> ${mensagem.email}</p>
                <p><strong>Mensagem:</strong> ${mensagem.mensagem}</p>
                <hr>
            `;

            // Adiciona a mensagem ao container
            mensagensContainer.appendChild(mensagemDiv);
        });
    }
};

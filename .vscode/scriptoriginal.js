function enviarContato(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const mensagem = document.getElementById('mensagem').value;

    const contato = {
        nome: nome,
        email: email,
        mensagem: mensagem
    };

    fetch('http://localhost:3000/mensagens', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(contato)      
    })
    .then(response => response.json())
    .then(data => {
        window.location.href = 'agradecimento.html';
    })
    .catch(error => {
        console.error('Erro ao enviar mensagem:', error);
        alert('Erro ao enviar mensagem. Tente novamente.');
    });
}

function carregarMensagens() {
    fetch('http://localhost:3000/mensagens')
    .then(response => response.json())
    .then(data => {
        const mensagensContainer = document.getElementById('mensagensContainer');
        mensagensContainer.innerHTML = '';

        data.forEach(mensagem => {
            const card = `<div class="card">
            <h5>${mensagem.nome}</h5>
            <h6 class="text-muted">${mensagem.email}</h6>
            <p>${mensagem.mensagem}</p>
            </div>`;
            mensagensContainer.innerHTML += card;
        });
    })
    .catch(error => console.error('Erro ao carregar as mensagens:', error));
}

function inicializarContato() {
    document.getElementById(formContato).addEventListener('submit', enviarContato);
}

function inicializarAdmin() {
    document.addEventListener('DOMContentLoaded', carregarMensagens);
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('formContato')) {
        inicializarContato();
    } else if (document.getElementById('mensagensContainer')) {
        inicializarAdmin();
    }
});
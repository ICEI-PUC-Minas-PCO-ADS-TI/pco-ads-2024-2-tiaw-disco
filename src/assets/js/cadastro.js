// Evento de pressionar Ctrl + Shift + A
document.addEventListener("keydown", function (event) {
    if (event.ctrlKey && event.shiftKey && event.key === "A") {
        // Exibe os campos relacionados a Administrador
        document.getElementById("tipoUsuarioContainer").style.display = "block";
        document.getElementById("btnChaveAcesso").style.display = "block"; // Exibe o botão para adicionar chave de acesso
        alert("Modo administrador ativado!");
    }
});

// Função para exibir o campo da chave de acesso
function mostrarCampoChaveAcesso() {
    // Exibe o campo para digitar a chave de acesso
    document.getElementById("chaveAcessoContainer").style.display = "block";
    document.getElementById("btnChaveAcesso").style.display = "none"; // Esconde o botão depois que o campo é mostrado
}

function cadastrar() {
    const nome = document.getElementById("firstname").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("password").value;
    const confirmarSenha = document.getElementById("Confirmpassword").value;
    const tipoUsuario = document.getElementById("tipoUsuario") ? document.getElementById("tipoUsuario").value : "usuario"; // valor padrão "usuario"
    const chaveAcesso = document.getElementById("chaveAcesso") ? document.getElementById("chaveAcesso").value : ""; // Chave de acesso

    const CHAVE_CORRETA = "AdminSecreto123";  // Chave de acesso válida

    // Valida se todos os campos obrigatórios foram preenchidos
    if (!nome || !email || !senha) {
        alert("Preencha todos os campos obrigatórios!");
        return;
    }

    // Verifica se as senhas são iguais
    if (senha !== confirmarSenha) {
        alert("As senhas não coincidem!");
        return;
    }

    // Se o usuário for administrador, valida a chave de acesso
    if (tipoUsuario === "admin" && chaveAcesso !== CHAVE_CORRETA) {
        alert("Chave de acesso inválida!");
        return;
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Verifica se o e-mail já está cadastrado
    const usuarioExistente = usuarios.find(user => user.email === email);
    if (usuarioExistente) {
        alert("Este e-mail já está cadastrado.");
        return;
    }

    // Cria o objeto do novo usuário com base no tipo
    const novoUsuario = {
        nome: nome,
        email: email,
        senha: senha,
        tipo: tipoUsuario // Tipo do usuário (usuário ou admin)
    };

    // Adiciona o novo usuário no array e atualiza o localStorage
    usuarios.push(novoUsuario); 
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Cadastro realizado com sucesso!");
    window.location.href = "login.html";  // Redireciona para a página de login
}

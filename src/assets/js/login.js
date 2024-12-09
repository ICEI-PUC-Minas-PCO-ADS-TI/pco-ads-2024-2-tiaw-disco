document.getElementById("login-button").addEventListener("click", function () {
    const email = document.getElementById("email").value;
    const senha = document.getElementById("password").value;

    if (!email || !senha) {
        alert("Por favor, preencha o e-mail e a senha!");
        return;
    }

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuarioValido = usuarios.find(user => user.email === email && user.senha === senha);

    if (usuarioValido) {
        // Armazena o usuário logado no LocalStorage
        localStorage.setItem("usuarioLogado", JSON.stringify(usuarioValido));

        // Redireciona conforme o tipo de usuário
        if (usuarioValido.tipo === "admin") {
            window.location.href = "admin.html"; // Redireciona para a página do administrador
        } else {
            window.location.href = "index.html";  // Redireciona para a página padrão
        }
    } else {
        alert("E-mail ou senha incorretos!");
    }
});

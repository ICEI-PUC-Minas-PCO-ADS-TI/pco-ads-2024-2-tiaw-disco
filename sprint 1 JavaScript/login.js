document.getElementById("submit-btn").addEventListener("click", function () {
    const email = document.getElementById("email").value;
    const senha = document.getElementById("password").value;

    if (!email || !senha) {
        alert("Por favor, preencha o e-mail e a senha!");
        return;
    }

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuarioValido = usuarios.find(user => user.email === email && user.senha === senha);

    if (usuarioValido) {
        window.location.href = "apos.html"; 
    } else {
        alert("E-mail ou senha incorretos!");
    }
});

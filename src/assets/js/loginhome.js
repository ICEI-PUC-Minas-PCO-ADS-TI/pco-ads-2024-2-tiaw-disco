window.onload = function() {
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

    if (usuarioLogado) {
        const userSection = document.getElementById("user-section");
        const loginLink = document.getElementById("login-link");

        // Remove o link de login
        if (loginLink) {
            loginLink.style.display = "none";
        }

        // Adiciona o ícone do usuário logado
        userSection.innerHTML = `
            <div class="logo_usuario">
                <a id="perfil-link" href="Perfil.html" style="position: relative; left: -20px;">
                    <img src="assets/img/logo_usuario.webp" alt="User Icon" class="user-icon">
                </a>
            </div>
        `;
    }
}



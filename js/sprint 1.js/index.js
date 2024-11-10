function cadastrar() {
    const nome = document.getElementById("firstname").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("password").value;
    const confirmarSenha = document.getElementById("Confirmpassword").value;
  
    if (!nome || !email || !senha) {
        alert("Preencha todos os campos obrigatórios!");
        return;
    }
  
    if (senha !== confirmarSenha) {
        alert("As senhas não coincidem!");
        return;
    }
  
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  
    const usuarioExistente = usuarios.find(user => user.email === email);
    if (usuarioExistente) {
        alert("Este e-mail já está cadastrado.");
        return;
    }
  
    const novoUsuario = {
        nome: nome,
        email: email,
        senha: senha
    };
  
    usuarios.push(novoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
  
    alert("Cadastro realizado com sucesso!");
    window.location.href = "login.html";
}
  
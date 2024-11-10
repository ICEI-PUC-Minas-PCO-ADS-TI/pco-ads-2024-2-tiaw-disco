document.getElementById("submit-btn").addEventListener("click", function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (email && password) {

      window.location.href = "apos.html";
  } else {
      alert("Preencha todos os campos.");
  }
});

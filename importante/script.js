document.addEventListener('DOMContentLoaded', function () {
    // Profile Management
    const profileName = document.querySelector('.nome');
    const profileEmail = document.querySelector('.email');
    const profileInstagram = document.querySelector('.redes a[href^="https://www.instagram.com"]');
    const profileFacebook = document.querySelector('.redes a[href^="https://www.facebook.com"]');
    const profileImage = document.querySelector('.user-img img');

    function loadProfile() {
        const storedName = localStorage.getItem('profileName');
        const storedEmail = localStorage.getItem('profileEmail');
        const storedInstagram = localStorage.getItem('profileInstagram');
        const storedFacebook = localStorage.getItem('profileFacebook');
        const storedImage = localStorage.getItem('profileImage');

        if (storedName) profileName.textContent = storedName;
        if (storedEmail) profileEmail.textContent = storedEmail;
        if (storedInstagram) {
            profileInstagram.href = `https://www.instagram.com/${storedInstagram.replace('@', '')}`;
            profileInstagram.textContent = storedInstagram;
        }
        if (storedFacebook) {
            profileFacebook.href = `https://www.facebook.com/${storedFacebook.replace('@', '')}`;
            profileFacebook.textContent = storedFacebook;
        }
        if (storedImage) profileImage.src = storedImage;
    }

    window.saveProfile = function () {
        const newName = document.getElementById('profileName').value;
        const newEmail = document.getElementById('profileEmail').value;
        const newInstagram = document.getElementById('profileInstagram').value;
        const newFacebook = document.getElementById('profileFacebook').value;
        const newImage = document.getElementById('profileImage').files[0];

        profileName.textContent = newName;
        profileEmail.textContent = newEmail;

        if (newInstagram) {
            profileInstagram.href = `https://www.instagram.com/${newInstagram.replace('@', '')}`;
            profileInstagram.textContent = newInstagram;
        }

        if (newFacebook) {
            profileFacebook.href = `https://www.facebook.com/${newFacebook.replace('@', '')}`;
            profileFacebook.textContent = newFacebook;
        }

        localStorage.setItem('profileName', newName);
        localStorage.setItem('profileEmail', newEmail);
        localStorage.setItem('profileInstagram', newInstagram);
        localStorage.setItem('profileFacebook', newFacebook);

        if (newImage) {
            const reader = new FileReader();
            reader.onload = function (e) {
                profileImage.src = e.target.result;
                localStorage.setItem('profileImage', e.target.result);
            }
            reader.readAsDataURL(newImage);
        }

        const modal = bootstrap.Modal.getInstance(document.getElementById('editProfileModal'));
        modal.hide();
    }

    window.deleteAccount = function () {
        if (confirm('Você tem certeza que deseja excluir sua conta? Isso irá remover todas as suas informações armazenadas.')) {
            localStorage.clear();
            profileName.textContent = '';
            profileEmail.textContent = '';
            profileInstagram.href = '';
            profileInstagram.textContent = '';
            profileFacebook.href = '';
            profileFacebook.textContent = '';
            profileImage.src = '';

            const modal = bootstrap.Modal.getInstance(document.getElementById('editProfileModal'));
            modal.hide();
        }
    }

    loadProfile();

    // Vinyl Records Management
    let discos = JSON.parse(localStorage.getItem('discos')) || [];

    function carregarDiscosDoJson() {
        fetch('discos.json')
            .then(response => response.json())
            .then(discosMocados => {
                discos = discosMocados;
                localStorage.setItem('discos', JSON.stringify(discos));
                exibirDiscos();
            })
            .catch(error => console.error('Erro ao carregar os discos do JSON:', error));
    }

    if (discos.length === 0) {
        carregarDiscosDoJson();
    } else {
        exibirDiscos();
    }

    function salvarDisco(disco) {
        discos.push(disco);
        localStorage.setItem('discos', JSON.stringify(discos));
        exibirDiscos();
    }

    function atualizarDisco(index, disco) {
        discos[index] = disco;
        localStorage.setItem('discos', JSON.stringify(discos));
        exibirDiscos();
    }

    window.aplicarFiltros = function () {
        const filtroGenero = document.getElementById('filtro-genero').value;

        const discosFiltrados = discos.filter(disco => {
            return !filtroGenero || disco.genero === filtroGenero;
        });

        exibirDiscos(discosFiltrados);
    }

    function exibirDiscos(discosParaExibir = discos) {
        const listaDiscos = document.getElementById('lista-discos');
        listaDiscos.innerHTML = '';

        if (discosParaExibir.length === 0) {
            const mensagem = document.createElement('p');
            mensagem.textContent = 'Nenhum disco encontrado.';
            listaDiscos.appendChild(mensagem);
        } else {
            discosParaExibir.forEach((disco, index) => {
                const discoElement = document.createElement('div');
                discoElement.classList.add('card');
                discoElement.innerHTML = `
                    <img class="img_Album" src="${disco.capa}" alt="Capa do Álbum" width="150" height="150">
                    <p><strong>Nome do Álbum:</strong> <br> ${disco.nome}</p>
                    <p><strong>Nome do Artista:</strong> <br> ${disco.artista}</p>
                    <p><strong>Gênero do Álbum:</strong> <br> ${disco.genero}</p>
                    <p><strong>Ano de Lançamento:</strong> <br> ${disco.ano}</p>
                    <button onclick="editarDisco(${index})" id="botao_Dourado">Editar</button>
                    <button onclick="deletarDisco(${index})" id="botao_Rosa">Deletar</button>
                `;
                listaDiscos.appendChild(discoElement);
            });
        }
    }

    window.editarDisco = function (index) {
        const disco = discos[index];
        document.getElementById('edit-indice').value = index;
        document.getElementById('edit-nome').value = disco.nome;
        document.getElementById('edit-artista').value = disco.artista;
        document.getElementById('edit-genero').value = disco.genero;
        document.getElementById('edit-ano').value = disco.ano;

        var editModal = new bootstrap.Modal(document.getElementById('editDiscoModal'));
        editModal.show();
    };

    document.getElementById('form-editar').addEventListener('submit', function(event) {
        event.preventDefault();
        const index = document.getElementById('edit-indice').value;
        const nome = document.getElementById('edit-nome').value;
        const artista = document.getElementById('edit-artista').value;
        const genero = document.getElementById('edit-genero').value;
        const ano = document.getElementById('edit-ano').value;
        const capa = document.getElementById('edit-capa').files[0];

        const disco = discos[index];
        disco.nome = nome;
        disco.artista = artista;
        disco.genero = genero;
        disco.ano = ano;

        if (capa) {
            const reader = new FileReader();
            reader.onloadend = () => {
                disco.capa = reader.result;
                atualizarDisco(index, disco);
            };
            reader.readAsDataURL(capa);
        } else {
            atualizarDisco(index, disco);
        }

        var editModal = bootstrap.Modal.getInstance(document.getElementById('editDiscoModal'));
        editModal.hide();
    });

    window.deletarDisco = function (index) {
        discos.splice(index, 1);
        localStorage.setItem('discos', JSON.stringify(discos));
        exibirDiscos();
    };

    exibirDiscos();
});

    
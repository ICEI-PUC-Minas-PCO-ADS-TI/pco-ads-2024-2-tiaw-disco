document.addEventListener('DOMContentLoaded', () => {
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
  
    window.aplicarFiltros = function(filtroGenero) {
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
  
    window.editarDisco = function(index) {
        const disco = discos[index];
        localStorage.setItem('discoEditando', index);
        localStorage.setItem('discoDados', JSON.stringify(disco));
        window.location.href = 'editar.html';
    };
  
    window.deletarDisco = function(index) {
        discos.splice(index, 1);
        localStorage.setItem('discos', JSON.stringify(discos));
        exibirDiscos();
    };
  
    exibirDiscos();
  });
  
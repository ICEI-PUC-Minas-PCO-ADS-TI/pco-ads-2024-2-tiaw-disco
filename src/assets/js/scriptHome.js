// INICIO BANNER
let divBanner = document.getElementById("banner");
let divTxt = document.getElementById("txt");

fetch("./db/DiscoDB.json").then((response) => {
    response.json().then((dados) => {
        let index = 0;
        console.log(dados.banners.length);

        const trocarImg = () => {
            index = (index + 1) % dados.banners.length;
            divTxt.innerHTML = `<h2 id="descricao">${dados.banners[index].descricao}</h2>`;
            divBanner.innerHTML = `
                <img id="imgBanner" src="${dados.banners[index].imagem}" alt="600px" height="600px">
                <div id="txt">
                    <h2 id="descricao">${dados.banners[index].descricao}</h2>
                </div>
            `;
        };

        setInterval(trocarImg, 3000);
    });
});
// FIM BANNER

// INICIO CARROSSEL1
let top10Banner = document.getElementById("artifactBanner");
let carouselIndicators = document.getElementById("carouselIndicators");
let top10Index = 0;

fetch("./db/DiscoDB.json").then((response) => {
    response.json().then((data) => {
        const top10Items = data.top10;

        // Função para atualizar o carrossel com nova imagem e descrição
        const updateTop10Banner = () => {
            // Atualiza a imagem e descrição
            top10Banner.innerHTML = `
                <div id="carouselImageContainer">
                    <img id="carouselImage" src="${top10Items[top10Index].imagem}" alt="600px" height="600px">
                </div>
                <div id="carouselTextContainer">
                    <div id="carouselText">
                        <h2 id="caption">${top10Items[top10Index].descricao}</h2>
                    </div>
                </div>
            `;

            // Atualiza os pontos de navegação
            const indicators = document.querySelectorAll(".carousel-indicator");
            indicators.forEach((indicator, index) => {
                if (index === top10Index) {
                    indicator.classList.add("active"); // Adiciona a classe active ao ponto atual
                } else {
                    indicator.classList.remove("active"); // Remove a classe active dos outros pontos
                }
            });
        };

        // Função para ir para o próximo item
        const nextTop10Item = () => {
            top10Index = (top10Index + 1) % top10Items.length;
            updateTop10Banner();
        };

        // Função para voltar para o item anterior
        const prevTop10Item = () => {
            top10Index = (top10Index - 1 + top10Items.length) % top10Items.length;
            updateTop10Banner();
        };

        // Função para ir para um item específico ao clicar no ponto
        const goToItem = (index) => {
            top10Index = index;
            updateTop10Banner();
        };

        // Gera os pontos de navegação dinamicamente
        const generateIndicators = () => {
            carouselIndicators.innerHTML = ''; // Limpa os pontos existentes

            top10Items.forEach((_, index) => {
                const indicator = document.createElement("div");
                indicator.classList.add("carousel-indicator");
                indicator.addEventListener("click", () => goToItem(index));
                carouselIndicators.appendChild(indicator);
            });
        };

        // Inicializa o carrossel e gera os pontos
        generateIndicators();
        updateTop10Banner();

        // Navegação automática a cada 3 segundos
        setInterval(nextTop10Item, 3000);

        // Eventos de navegação manual
        document.getElementById("nextBtn").addEventListener("click", nextTop10Item);
        document.getElementById("prevBtn").addEventListener("click", prevTop10Item);
    }).catch((error) => {
        console.error("Erro ao processar o JSON", error);
    });
});
// FIM CARROSSEL1

// INICIO CARROSSEL2
let recemAdicionadosBanner = document.getElementById("artifactBanner2");
let carousel2Indicators = document.getElementById("carousel2Indicators");
let recemAdicionadosIndex = 0;

fetch("./db/DiscoDB.json").then((response) => {
    response.json().then((data) => {
        const recemAdicionadosItems = data.RecemAdicionados;

        // Função para atualizar o carrossel com nova imagem e descrição
        const updateRecemAdicionadosBanner = () => {
            // Atualiza a imagem e descrição
            recemAdicionadosBanner.innerHTML = `
                <div id="carousel2ImageContainer">
                    <img id="carousel2Image" src="${recemAdicionadosItems[recemAdicionadosIndex].capa}" alt="600px" height="600px">
                </div>
                <div id="carousel2TextContainer">
                    <div id="carousel2Text">
                        <h2 id="caption2">${recemAdicionadosItems[recemAdicionadosIndex].artista}</h2>
                    </div>
                </div>
            `;

            // Atualiza os pontos de navegação
            const indicators = document.querySelectorAll(".carousel2-indicator");
            indicators.forEach((indicator, index) => {
                if (index === recemAdicionadosIndex) {
                    indicator.classList.add("active"); // Adiciona a classe active ao ponto atual
                } else {
                    indicator.classList.remove("active"); // Remove a classe active dos outros pontos
                }
            });
        };

        // Função para ir para o próximo item
        const nextRecemAdicionadosItem = () => {
            recemAdicionadosIndex = (recemAdicionadosIndex + 1) % recemAdicionadosItems.length;
            updateRecemAdicionadosBanner();
        };

        // Função para voltar para o item anterior
        const prevRecemAdicionadosItem = () => {
            recemAdicionadosIndex = (recemAdicionadosIndex - 1 + recemAdicionadosItems.length) % recemAdicionadosItems.length;
            updateRecemAdicionadosBanner();
        };

        // Função para ir para um item específico ao clicar no ponto
        const goToItem = (index) => {
            recemAdicionadosIndex = index;
            updateRecemAdicionadosBanner();
        };

        // Gera os pontos de navegação dinamicamente
        const generateIndicators = () => {
            carousel2Indicators.innerHTML = ''; // Limpa os pontos existentes

            recemAdicionadosItems.forEach((_, index) => {
                const indicator = document.createElement("div");
                indicator.classList.add("carousel2-indicator"); // Classe específica para o segundo carrossel
                indicator.addEventListener("click", () => goToItem(index));
                carousel2Indicators.appendChild(indicator);
            });
        };

        // Inicializa o carrossel e gera os pontos
        generateIndicators();
        updateRecemAdicionadosBanner();

        // Navegação automática a cada 3 segundos
        setInterval(nextRecemAdicionadosItem, 3000);

        // Eventos de navegação manual
        document.getElementById("nextBtn2").addEventListener("click", nextRecemAdicionadosItem);
        document.getElementById("prevBtn2").addEventListener("click", prevRecemAdicionadosItem);
    }).catch((error) => {
        console.error("Erro ao processar o JSON", error);
    });
});
// FIM CARROSSEL2

// Função para carregar os dados do usuário
function loadUserData() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    if (usuarios.length > 0) {
        const ultimoUsuario = usuarios[usuarios.length - 1]; // Pega o último usuário cadastrado
        const userDisplay = document.getElementById('userDisplay');
        userDisplay.innerHTML = `
            <h2>Bem-vindo, ${ultimoUsuario.nome}!</h2>
            <p>Email: ${ultimoUsuario.email}</p>
        `;
    }
}

// Chama a função para carregar os dados do usuário ao carregar a página
window.onload = loadUserData;

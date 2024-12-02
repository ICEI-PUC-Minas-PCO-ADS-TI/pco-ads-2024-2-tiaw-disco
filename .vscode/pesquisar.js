document.addEventListener("DOMContentLoaded", () => {
    const vinilPesquisa = document.getElementById("vinilPesquisa");
    const botaoPesquisar = document.getElementById("botaoPesquisar");
    const resultItems = document.querySelectorAll(".result-item");

    // Dados dos álbuns
    const albumDetails = {
        "Fleetwood Mac": {
            sobre: "Fleetwood Mac foi uma banda anglo-americana de rock, formada em Londres, no ano de 1967. Em mais de 50 anos de carreira, o grupo vendeu mais de 120 milhões de cópias no mundo, sendo uma das bandas de maior sucesso comercial no mundo. Em 1998, alguns integrantes foram introduzidos no Rock and Roll Hall of Fame.",
            ano: "1967",
            gravadora: "Blue Horizon, Reprise, Warner e LMJS Productions",
            origem: "Londres, Reino Unido",
            genres: "Pop, Rock"
        },
        "Tom Zé": {
            sobre:"Antônio José Santana Martins, conhecido como Tom Zé, é um compositor, cantor, arranjador e jardineiro brasileiro.",
            ano: "1968",
            gravadora: "Trama, Luaka Bop",
            origem: "Irará, Brasil",
            genres: "Rock, MPB, tropicalismo"
        },
        "Oasis": {
            sobre:"Oasis é uma banda inglesa de rock formada no ano de 1991, na cidade de Manchester. Na sua última formação, em 2009, era composta por Liam Gallagher, Noel Gallagher, Gem Archer, Andy Bell e Chris Sharrock.",
            ano: "1991",
            gravadora: "Creation, Epic, Columbia, Sony, Big Brother, Reprise",
            origem: "Manchester, Reino Unido",
            genres: "Rock,Britpop"
        },
        "Nirvana": {
            sobre:"Nirvana foi uma banda norte-americana de rock formada pelo vocalista e guitarrista Kurt Cobain e pelo baixista Krist Novoselic em Aberdeen no ano de 1987, que obteve grande sucesso no movimento grunge de Seattle no início dos anos 1990.",
            ano: "1987",
            gravadora: "Sub Pop, DGC",
            origem: "Aberdeen, EUA",
            genres: "Grunge, Punk rock, Hard rock, Sludge metal"
        },
        "Pink Floyd": {
            sobre:"Pink Floyd foi uma banda britânica de rock formada em Londres em 1965. Ganhando seguidores como um grupo de rock psicodélico, eles se destacaram por suas composições longas, pela experimentação sonora, pelas letras filosóficas e pelas apresentações ao vivo criativas, o que levou a se tornarem uma banda líder do gênero do rock progressivo. ",
            ano: "1965",
            gravadora: "EMI Columbia, Harvest, Capitol, Sony Music, Parlophone",
            origem: "Londres, Reino Unido",
            genres: "Rock progressivo"
        },
        "Joy Division": {
            sobre:"Joy Division foi uma banda inglesa de rock, fundada em 1976, em Manchester. É notória por ser uma das bandas mais influentes da história da música, sendo uma das pioneiras do pós-punk e rock gótico. A banda encerrou suas atividades em 18 de maio de 1980 após o suicídio do vocalista e guitarrista ocasional, Ian Curtis.",
            ano: "1976",
            gravadora: "Factory Records",
            origem: "Salford, Reino Unido",
            genres: "Pós-punk, Rock gótico"
        },
        "The Clash": {
            sobre:"The Clash foi uma banda inglesa de punk rock, formada em 1976 como parte da primeira onda do punk britânico. Além do punk, experimentou outros gêneros musicais, como reggae, ska, dub, funk, rap, surf e rockabilly.",
            ano: "1976",
            gravadora: "CBS Records",
            origem: "Londres, Reino Unido",
            genres: "Alternativa/Indie"
        }
    };

    const performSearch = () => {
        const query = vinilPesquisa.value.toLowerCase();
        let hasResults = false;

        resultItems.forEach(item => {
            const title = item.getAttribute("data-title").toLowerCase();
            if (title.includes(query)) {
                item.style.display = "block"; // Mostra apenas os itens
                item.classList.add("search-result"); // Marca resultado de pesquisa
                hasResults = true;
            } else {
                item.style.display = "none"; // Oculta os itens não pesquisado
                item.classList.remove("search-result");
            }
        });

        if (!hasResults) {
            document.getElementById("resultContainer").innerHTML =
                "<p class='text-center'>Nenhum resultado encontrado.</p>";
        }
    };

    const toggleDetails = (item) => {
        // Exibição do resultado de pesquisa
        if (!item.classList.contains("search-result")) return;

        const title = item.getAttribute("data-title");
        const details = albumDetails[title];
        const detailsContainer = item.querySelector(".album-details");

        if (details) {
            if (detailsContainer) {
                // Remove os detalhes visíveis
                detailsContainer.remove();
            } else {
                // Detalhes do álbum pesquisado
                const detailsDiv = document.createElement("div");
                detailsDiv.classList.add("album-details");
                detailsDiv.innerHTML = `
                    <p><strong>Sobre:</strong> ${details.sobre}</P>
                    <p><strong>Ano:</strong> ${details.ano}</p>
                    <p><strong>Gravadora(s):</strong> ${details.gravadora}</p>
                    <p><strong>Origem:</strong> ${details.origem}</p>
                    <p><strong>Gêneros:</strong> ${details.genres}</p>
                `;
                item.appendChild(detailsDiv);
            }
        }
    };

    // Clique nos álbuns
    resultItems.forEach(item => {
        item.addEventListener("click", () => toggleDetails(item));
    });

    // Pesquisar funcional
    botaoPesquisar.addEventListener("click", performSearch);
    vinilPesquisa.addEventListener("keypress", (event) => {
        if (event.key === "Enter") performSearch();
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const paginationButtons = document.querySelectorAll(".pagination-btn");

    paginationButtons.forEach(button => {
        button.addEventListener("click", () => {
            alert(`Botão teste`);
        });
    });
});
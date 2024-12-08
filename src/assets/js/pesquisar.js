document.addEventListener("DOMContentLoaded", () => {
    const vinilPesquisa = document.getElementById("vinilPesquisa");
    const botaoPesquisar = document.getElementById("botaoPesquisar");
    const resultContainer = document.getElementById("resultContainer");

    const discos = JSON.parse(localStorage.getItem('discos')) || [];

    const performSearch = () => {
        const query = vinilPesquisa.value.toLowerCase();
        let hasResults = false;
        resultContainer.innerHTML = ''; // Limpa os resultados anteriores

        discos.forEach(disco => {
            const title = disco.nome.toLowerCase();
            if (title.includes(query)) {
                const item = document.createElement('div');
                item.classList.add('result-item');
                item.innerHTML = `
                    <img src="${disco.capa}" alt="${disco.nome}">
                    <span class="result-title">${disco.nome}</span>
                    <span class="result-dots"><i class="bi bi-disc-fill"></i>${disco.copias || 'N/A'} Cópias</span>
                `;
                resultContainer.appendChild(item);
                hasResults = true;
            }
        });

        if (!hasResults) {
            resultContainer.innerHTML = "<p class='text-center'>Nenhum resultado encontrado.</p>";
        }
    };

    botaoPesquisar.addEventListener("click", performSearch);
    vinilPesquisa.addEventListener("keypress", (event) => {
        if (event.key === "Enter") performSearch();
    });
});

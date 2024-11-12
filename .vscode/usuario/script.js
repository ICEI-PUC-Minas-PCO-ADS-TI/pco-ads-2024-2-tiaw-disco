document.addEventListener('DOMContentLoaded', function() {
    const users = [
        {
            name: "João Silva",
            email: "joao.silva@example.com",
            image: "path/to/image.jpg",
            ranking: 5,
            socialMedia: "https://twitter.com/joaosilva",
            categories: ["Rock", "Jazz", "Blues"]
        },
        // Adicione mais usuários conforme necessário
    ];

    const userList = document.getElementById('userList');

    users.forEach(user => {
        const userCard = document.createElement('div');
        userCard.classList.add('user-card');

        const userImage = document.createElement('img');
        userImage.src = user.image;
        userCard.appendChild(userImage);

        const userName = document.createElement('h2');
        userName.textContent = user.name;
        userCard.appendChild(userName);

        const userEmail = document.createElement('p');
        userEmail.textContent = `Email: ${user.email}`;
        userCard.appendChild(userEmail);

        const userRanking = document.createElement('p');
        userRanking.textContent = `Ranking: ${user.ranking}`;
        userCard.appendChild(userRanking);

        const userSocialMedia = document.createElement('p');
        userSocialMedia.innerHTML = `Redes Sociais: <a href="${user.socialMedia}" target="_blank">${user.socialMedia}</a>`;
        userCard.appendChild(userSocialMedia);

        const userCategories = document.createElement('p');
        userCategories.textContent = `Categorias: ${user.categories.join(', ')}`;
        userCard.appendChild(userCategories);

        userList.appendChild(userCard);
    });
});
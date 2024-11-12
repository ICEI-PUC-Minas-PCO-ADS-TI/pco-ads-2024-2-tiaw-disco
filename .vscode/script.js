document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const user = {
        id: Date.now(),
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        image: document.getElementById('image').files[0] ? URL.createObjectURL(document.getElementById('image').files[0]) : '',
        ranking: document.getElementById('ranking').value,
        socialMedia: document.getElementById('socialMedia').value,
        categories: document.getElementById('categories').value.split(',')
    };

    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));

    displayUsers();
    document.getElementById('userForm').reset();
});

function displayUsers() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userList = document.getElementById('userList');
    userList.innerHTML = '';

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

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.onclick = () => deleteUser(user.id);
        userCard.appendChild(deleteButton);

        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.onclick = () => editUser(user.id);
        userCard.appendChild(editButton);

        userList.appendChild(userCard);
    });
}

function deleteUser(id) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users = users.filter(user => user.id !== id);
    localStorage.setItem('users', JSON.stringify(users));
    displayUsers();
}

function editUser(id) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.id === id);

    document.getElementById('name').value = user.name;
    document.getElementById('email').value = user.email;
    document.getElementById('ranking').value = user.ranking;
    document.getElementById('socialMedia').value = user.socialMedia;
    document.getElementById('categories').value = user.categories.join(',');

    deleteUser(id);
}

document.addEventListener('DOMContentLoaded', displayUsers);

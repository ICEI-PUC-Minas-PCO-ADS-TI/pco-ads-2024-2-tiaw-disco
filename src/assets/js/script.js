document.addEventListener('DOMContentLoaded', function () {
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
        if (confirm('Você tem certeza que deseja sair da sua conta? Isso irá remover todas as suas informações armazenadas.')) {
            localStorage.clear();
            profileName.textContent = '';
            profileEmail.textContent = '';
            profileInstagram.href = '';
            profileInstagram.textContent = '';
            profileFacebook.href = '';
            profileFacebook.textContent = '';
            profileImage.src = 'assets/img/fabiana.webp';
            window.location.href = "index.html";
        }
    }

    loadProfile();
});

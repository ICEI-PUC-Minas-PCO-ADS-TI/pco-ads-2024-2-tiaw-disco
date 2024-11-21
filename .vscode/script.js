document.addEventListener('DOMContentLoaded', function () {
    const profileName = document.querySelector('.nome');
    const profileEmail = document.querySelector('.email');
    const profileInstagram = document.querySelector('.redes a[href^="https://www.instagram.com"]');
    const profileFacebook = document.querySelector('.redes a[href^="https://www.facebook.com"]');
    const profileImage = document.querySelector('.user-img img');

    window.saveProfile = function () {
        const newName = document.getElementById('profileName').value;
        const newEmail = document.getElementById('profileEmail').value;
        const newInstagram = document.getElementById('profileInstagram').value;
        const newFacebook = document.getElementById('profileFacebook').value;
        const newImage = document.getElementById('profileImage').files[0];

        profileName.textContent = newName;
        profileEmail.textContent = newEmail;
        profileInstagram.href = `https://www.instagram.com/${newInstagram.replace('@', '')}`;
        profileInstagram.textContent = newInstagram;
        profileFacebook.href = `https://www.facebook.com/${newFacebook.replace('@', '')}`;
        profileFacebook.textContent = newFacebook;

        if (newImage) {
            const reader = new FileReader();
            reader.onload = function (e) {
                profileImage.src = e.target.result;
            }
            reader.readAsDataURL(newImage);
        }

        // Fechar o modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('editProfileModal'));
        modal.hide();
    }
});

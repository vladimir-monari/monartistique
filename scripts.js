// Attendre que le DOM soit prêt
document.addEventListener('DOMContentLoaded', function () {
    // Sélectionner la galerie et le conteneur
    var galleryContainer = document.querySelector('.image-container');

    // Ajouter un écouteur pour ajuster Masonry lorsque les images sont chargées
    galleryContainer.addEventListener('layoutComplete', function () {
        galleryContainer.style.visibility = 'visible'; // Rendre la galerie visible après le chargement
    });

    // Modal
    var modal = document.getElementById('myModal');
    var modalImg = document.getElementById('modalImg');

    // Fonction pour afficher la modal
    function openModal(imgSrc) {
        modal.style.display = 'block';
        modalImg.src = imgSrc;
    }

    // Fonction pour fermer la modal
    window.closeModal = function () {
        modal.style.display = 'none';
    };

    // Ajouter des écouteurs d'événements aux images
    galleryContainer.addEventListener('click', function (event) {
        var target = event.target;

        if (target.tagName === 'IMG') {
            openModal(target.src);
        }
    });

    // Fermer la modal lorsque l'utilisateur clique en dehors de l'image
    window.onclick = function (event) {
        if (event.target === modal) {
            closeModal();
        }
    };
});
document.addEventListener('DOMContentLoaded', function () {
    // Initialize Masonry
    initMasonry();

    const images = document.querySelectorAll('.image-container img');
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    document.body.appendChild(lightbox);

    const img = document.createElement('img');
    lightbox.appendChild(img);

    images.forEach(image => {
        image.addEventListener('click', () => {
            lightbox.style.display = 'flex';
            img.src = image.src;
        });
    });

    lightbox.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });

    // Génération aléatoire de polices et tailles pour les tas
    const tasElements = document.querySelectorAll('.tags-font');
    const polices = ["Pacifico", "Lobster", "Dancing Script", "Caveat", "Shadows Into Light"];
    const taillesMin = 16; // Taille minimale de la police
    const taillesMax = 24; // Taille maximale de la police

    tasElements.forEach(tas => {
        // Générer une police et une taille aléatoire
        const policeAleatoire = polices[Math.floor(Math.random() * polices.length)];
        const tailleAleatoire = Math.floor(Math.random() * (taillesMax - taillesMin + 1)) + taillesMin;

        // Appliquer la police et la taille au tas
        tas.style.fontFamily = policeAleatoire;
        tas.style.fontSize = `${tailleAleatoire}px`;
    });
});

// Fonction pour initialiser Masonry
function initMasonry() {
    var galleryContainer = document.querySelector('.image-container');
    var masonry = new Masonry(galleryContainer, {
        itemSelector: '.gallery-item',
        columnWidth: '.gallery-sizer',
        percentPosition: true
    });
}

function openModal(imageSrc) {
    var modal = document.getElementById('myModal');
    var modalImg = document.getElementById('modalImg');
    modal.style.display = "block";
    modalImg.src = imageSrc;
}

function closeModal() {
    var modal = document.getElementById('myModal');
    modal.style.display = "none";
}

document.addEventListener('DOMContentLoaded', function () {
    const images = document.querySelectorAll('.image-container img');
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    document.body.appendChild(lightbox);

    const img = document.createElement('img');
    lightbox.appendChild(img);

    images.forEach(image => {
        image.addEventListener('click', () => {
            openModal(image.src);
        });
    });

    lightbox.addEventListener('click', () => {
        closeModal();
    });

    const tagElements = document.querySelectorAll('.tags-font');
    const polices = ["Pacifico", "Lobster", "Dancing Script", "Caveat", "Shadows Into Light"];
    const taillesMin = 16;
    const taillesMax = 24;

    tagElements.forEach(tag => {
        const policeAleatoire = polices[Math.floor(Math.random() * polices.length)];
        const tailleAleatoire = Math.floor(Math.random() * (taillesMax - taillesMin + 1)) + taillesMin;

        tag.style.fontFamily = policeAleatoire;
        tag.style.fontSize = `${tailleAleatoire}px`;
    });

    function updateContainerHeight() {
        const container = document.querySelector('.image-container');
        let totalHeight = 0;

        images.forEach(img => {
            totalHeight += img.offsetHeight;
        });

        container.style.height = totalHeight + 'px';
    }

    // Mise à jour de la hauteur après le chargement de toutes les images
    images.forEach(img => {
        img.addEventListener('load', updateContainerHeight);
    });

    // Appel initial pour ajuster la position du footer
    adjustFooterPosition();
});

function adjustFooterPosition() {
    var copyright = document.getElementById('copyright');
    var footer = document.querySelector('footer');
    var container = document.getElementById('container');

    var combinedHeight = copyright.offsetHeight + footer.offsetHeight;
    container.style.marginBottom = combinedHeight + 'px';
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

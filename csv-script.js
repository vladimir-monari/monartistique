// Fonction pour charger le fichier CSV
function loadCSV() {
    Papa.parse('images.csv', {
        download: true,
        header: true,
        complete: function(results) {
            generateImages(results.data);
            // Initialize Masonry after images are generated
            initMasonry();
        }
    });
}

// Fonction pour générer les éléments d'image
function generateImages(data) {
    var galleryContainer = document.querySelector('.image-container');

    data.forEach(function(item) {
        if (!item['Nom de l\'image'] || !item['Chemin de l\'image']) {
            return; // Ignorez cette entrée
        }

        var img = createRandomSizeImage(item['Chemin de l\'image']);
        img.alt = item['Description de l\'image'];
        img.onclick = function() {
            openModal(item['Chemin de l\'image']);
        };

        // Ajouter les tags à chaque image
        var tags = item.Tags.split(',');
        tags.forEach(function(tag) {
            img.classList.add(tag.trim());
        });

        galleryContainer.appendChild(img);
    });
}

function createRandomSizeImage(src) {
    const img = document.createElement('img');
    img.src = src;
    const imageSizes = ['small', 'medium', 'large'];
    const randomSize = imageSizes[Math.floor(Math.random() * imageSizes.length)];
    img.classList.add('gallery-item', randomSize);
    return img;
}

// Appel de la fonction pour charger le CSV et générer les images
loadCSV();

// Fonction pour initialiser Masonry
function initMasonry() {
    var galleryContainer = document.querySelector('.image-container');
    var masonry = new Masonry(galleryContainer, {
        itemSelector: '.gallery-item',
        columnWidth: '.gallery-sizer',
        percentPosition: true
    });
}

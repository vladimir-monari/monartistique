function loadCSV() {
    Papa.parse('images.csv', {
        download: true,
        header: true,
        complete: function(results) {
            shuffleArray(results.data); // Mélanger les données
            generateImages(results.data);
        }
    });
}

// Fonction de mélange de Fisher-Yates (Knuth Shuffle)
function shuffleArray(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // Tant qu'il reste des éléments à mélanger...
    while (0 !== currentIndex) {

        // Prendre un élément restant...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // Et l'échanger avec l'élément actuel.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function generateImages(data) {
    var galleryContainer = document.querySelector('.image-container');

    // Vider le conteneur avant d'ajouter de nouvelles images
    galleryContainer.innerHTML = '';

    data.forEach(item => {
        if (!item['Nom de l\'image'] || !item['Chemin de l\'image']) {
            return;
        }

        var img = document.createElement('img');
        img.src = item['Chemin de l\'image'];
        img.alt = item['Nom de l\'image'];
        img.classList.add('gallery-item');

        galleryContainer.appendChild(img);
    });

    // Initialisation de Masonry après le chargement des images
    imagesLoaded(galleryContainer, function() {
        new Masonry(galleryContainer, {
            itemSelector: '.gallery-item',
            percentPosition: true,
            columnWidth: '.grid-sizer',
            fitWidth: true
        });
    });
}

// Appel de la fonction pour charger le CSV et générer les images
loadCSV();

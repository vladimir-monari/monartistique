// Variables globales pour les compteurs de taille d'image
var smallCount = 0;
var mediumCount = 0;
var largeCount = 0;

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

    // Générer des images pour une seule ligne
    var row = document.createElement('div');
    row.classList.add('image-row'); // Utilisation d'une classe 'image-row' pour la ligne

    for (var i = 0; i < data.length; i++) {
        var item = data[i];
        if (!item['Nom de l\'image'] || !item['Chemin de l\'image']) {
            continue; // Ignorer cette entrée
        }

        var imageSize = determineImageSize();
        var img = createRandomSizeImage(item['Chemin de l\'image'], imageSize);
        row.appendChild(img);
    }

    // Ajouter la ligne à la galerie
    galleryContainer.appendChild(row);

    // Réinitialiser les compteurs après avoir généré les images
    resetCounters();

    // Initialize Masonry after images are generated
    initMasonry();
}

function determineImageSize() {
    // Déterminer la taille de l'image en fonction des compteurs
    // et continuer le cycle
    if (smallCount < 3) {
        smallCount++;
        return 'small';
    } else if (mediumCount < 2) {
        mediumCount++;
        return 'medium';
    } else {
        largeCount++;
        
        // Réinitialiser les compteurs si tous les types ont été assignés
        if (largeCount >= 1) {
            resetCounters();
        }
        return 'large';
    }
}

function resetCounters() {
    smallCount = 0;
    mediumCount = 0;
    largeCount = 0;
}


function createRandomSizeImage(src, size) {
    const img = document.createElement('img');
    img.src = src;
    img.classList.add('gallery-item', size);
    return img;
}

// Appel de la fonction pour charger le CSV et générer les images
loadCSV();

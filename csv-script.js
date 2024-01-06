// Variables globales pour les compteurs de taille d'image
var smallCount = 0;
var mediumCount = 0;
var largeCount = 0;

// Fonction pour charger le fichier CSV
function loadCSV() {
    Papa.parse('images.csv', {
        download: true,
        header: true,
        complete: function(results) {
            generateImages(results.data);
        }
    });
}

function generateImages(data) {
    var galleryContainer = document.querySelector('.image-container');

    // Nombre d'images par ligne
    var imagesPerrow = 6; // 3 petites, 2 moyennes, 1 grande

    // Ajouter une nouvelle ligne pour chaque groupe d'imagesPerrow
    for (var i = 0; i < data.length; i += imagesPerrow) {
        var row = document.createElement('div');
        row.classList.add('row');

        // Générer des images pour cette ligne
        for (var j = i; j < i + imagesPerrow && j < data.length; j++) {
            var item = data[j];
            if (!item['Nom de l\'image'] || !item['Chemin de l\'image']) {
                continue; // Ignorer cette entrée
            }

            var imageSize = determineImageSize();
            var img = createRandomSizeImage(item['Chemin de l\'image'], imageSize);
            //var img = document.createElement('img');
            img.src = item['Chemin de l\'image'];
            
            // Ajouter les tags à chaque image
            var tags = item.Tags.split(',');
            tags.forEach(function (tag) {
                img.classList.add(tag.trim());
            });

            row.appendChild(img);
        }

        // Ajouter la ligne à la galerie
        galleryContainer.appendChild(row);
    }

    // Réinitialiser les compteurs après avoir généré les images
    resetCounters();

    // Initialize Masonry after images are generated
    initMasonry();
}

function determineImageSize() {
    // Logique pour déterminer la taille de l'image en fonction des compteurs
    if (smallCount < 3) {
        smallCount++;
        return 'small';
    } else if (mediumCount < 2) {
        mediumCount++;
        return 'medium';
    } else if (largeCount < 1) {
        largeCount++;
        return 'large';
    }
}

function resetCounters() {
    // Réinitialiser les compteurs de taille d'image
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

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

    // Nombre d'images par colonne
    var imagesPerColumn = 3;

    // Ajouter une nouvelle colonne pour chaque groupe d'imagesPerColumn
    for (var i = 0; i < data.length; i += imagesPerColumn) {
        var column = document.createElement('div');
        column.classList.add('column');

        // Générer des images pour cette colonne
        for (var j = i; j < i + imagesPerColumn && j < data.length; j++) {
            var item = data[j];
            if (!item['Nom de l\'image'] || !item['Chemin de l\'image']) {
                continue; // Ignorer cette entrée
            }

            //var img = createRandomSizeImage(item['Chemin de l\'image']);
            var img = document.createElement('img');
            img.src = item['Chemin de l\'image'];
            img.alt = item['Description de l\'image'];
            img.onclick = function () {
                openModal(item['Chemin de l\'image']);
            };

            // Ajouter les tags à chaque image
            var tags = item.Tags.split(',');
            tags.forEach(function (tag) {
                img.classList.add(tag.trim());
            });

            column.appendChild(img);
        }

        // Ajouter la colonne à la galerie
        galleryContainer.appendChild(column);
    }

    // Initialize Masonry after images are generated
    initMasonry();
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

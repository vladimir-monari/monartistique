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

// Appel de la fonction pour charger le CSV et générer les images
loadCSV();

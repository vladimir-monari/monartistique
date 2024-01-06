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
    var gallery = document.getElementById('gallery');
    var imageContainer = document.createElement('div');
    imageContainer.className = 'image-container';

    data.forEach(function(item) {
        var img = document.createElement('img');
        img.src = item['Chemin de l\'image'];
        img.alt = item['Description de l\'image'];
        img.onclick = function() {
            openModal(item['Chemin de l\'image']);
        };
        imageContainer.appendChild(img);

        // Ajouter les tags à chaque image
        var tags = item.Tags.split(',');
        tags.forEach(function(tag) {
            img.classList.add(tag.trim());
        });
    });

    gallery.appendChild(imageContainer);
}

// Appel de la fonction pour charger le CSV et générer les images
loadCSV();

function loadCSV() {
    Papa.parse('images.csv', {
        download: true,
        header: true,
        complete: function (results) {
            generateImages(results.data);
        }
    });
}

function generateImages(data) {
    var galleryContainer = document.querySelector('.image-container');
    var row = document.createElement('div');
    row.classList.add('image-row'); // Utilisation d'une classe 'image-row' pour la ligne

    // Générer des images pour une seule ligne
    for (var i = 0; i < data.length; i++) {

        var item = data[i];
        if (!item['Nom de l\'image'] || !item['Chemin de l\'image']) {
            continue; // Ignorer cette entrée
        }

        // Utiliser directement le chemin de l'image sans randomSizeImage
        var img = document.createElement('img');
        img.src = item['Chemin de l\'image'];

        // Ajouter d'autres attributs ou styles si nécessaire
        // img.alt = item['Nom de l\'image'];
        // img.style.width = '100%';

        row.appendChild(img);
    }

    // Ajouter la ligne à la galerie
    galleryContainer.appendChild(row);
}

// Appel de la fonction pour charger le CSV et générer les images
loadCSV();

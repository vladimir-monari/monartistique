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

        var img = document.createElement('img');
        img.src = item['Chemin de l\'image'];

        var figCaption = document.createElement('figcaption');
        figCaption.textContent = item['Description de l\'image'];

        var figure = document.createElement('figure');
        figure.classList.add('gallery-item');
        figure.appendChild(img);
        figure.appendChild(figCaption);

        row.appendChild(figure);
    }

    // Ajouter la ligne à la galerie
    galleryContainer.appendChild(row);
}


// Appel de la fonction pour charger le CSV et générer les images
loadCSV();

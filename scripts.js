// Fonction pour charger un fichier CSV
// Fonction pour charger un fichier CSV
function loadCSV(callback) {
    fetch('images.csv')
        .then(response => response.text())
        .then(data => callback(data))
        .catch(error => console.error('Erreur lors du chargement du CSV:', error));
}

function generateImages(data) {
    var imageContainer = document.getElementById('image-container');

    Papa.parse(data, {
        header: true,
        complete: function (results) {
            var maxDescriptionHeight = 0;

            results.data.forEach(function (d) {
                var container = document.createElement('div');
                container.classList.add('image-wrapper');

                var img = new Image();
                img.src = d['Chemin de l\'image'];
                img.alt = d['Description de l\'image'];
                img.classList.add("image-responsive");

                var description = document.createElement('div');
                description.classList.add('image-description');
                description.textContent = d['Description de l\'image'];

                // ... (Code pour gérer le clic)

                container.appendChild(img);
                container.appendChild(description);
                imageContainer.appendChild(container);

                // Calcul de la hauteur de la description
                var descriptionHeight = description.clientHeight;
                if (descriptionHeight > maxDescriptionHeight) {
                    maxDescriptionHeight = descriptionHeight;
                }
            });

            // Ajustez la hauteur du conteneur imageContainer
            imageContainer.style.height = maxDescriptionHeight + 'px';
        }
    });
}

// Chargement du CSV et génération des images
loadCSV(generateImages);

document.getElementsByClassName("close")[0].onclick = function () {
    document.getElementById('modal').style.display = "none";
};

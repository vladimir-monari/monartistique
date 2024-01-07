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
    var maxContainerHeight = 300; // Hauteur maximale pour le conteneur

    Papa.parse(data, {
        header: true,
        complete: function (results) {
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

                img.onclick = function () {
                    document.getElementById('modal').style.display = "block";
                    document.getElementById("modal-image").src = this.src;
                    document.getElementById("caption").innerHTML = this.alt;
                };

                container.appendChild(img);
                var descContainer = document.createElement('div');
                descContainer.classList.add('description-container');
                descContainer.appendChild(description);
                container.appendChild(descContainer);
                imageContainer.appendChild(container);

                // Ajuster la hauteur de l'image et la largeur de la description
                img.onload = function () {
                    var totalHeight = container.offsetHeight;

                    if (totalHeight > maxContainerHeight) {
                        var excessHeight = totalHeight - maxContainerHeight;

                        // Ajuster la hauteur de l'image
                        var newImgHeight = img.height - excessHeight;
                        img.style.height = newImgHeight + 'px';
                        img.style.width = 'auto';

                        // Ajuster la largeur de la description
                        descContainer.style.maxWidth = `${img.width}px`;
                    }
                };
            });
        }
    });
}


// Chargement du CSV et génération des images
loadCSV(generateImages);

document.getElementsByClassName("close")[0].onclick = function () {
    document.getElementById('modal').style.display = "none";
};

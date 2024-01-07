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
                var descContainer = document.createElement('div'); // Nouveau conteneur pour la description
                descContainer.classList.add('description-container'); // Nouvelle classe pour le style
                descContainer.appendChild(description);
                img.onload = function () {
                    // Ajuster la largeur du conteneur de description à la largeur de l'image
                    descContainer.style.maxWidth = `${img.width}px`;
                };
                
                container.appendChild(descContainer); // Ajoutez la description au nouveau conteneur
                imageContainer.appendChild(container);
                
            });
        }
    });
}

// Chargement du CSV et génération des images
loadCSV(generateImages);

document.getElementsByClassName("close")[0].onclick = function () {
    document.getElementById('modal').style.display = "none";
};

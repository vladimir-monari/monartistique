// Fonction pour charger un fichier CSV
function loadCSV(callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'images.csv', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            callback(xhr.responseText);
        }
    };
    xhr.send();
}

// Fonction pour générer les images à partir des données CSV
function generateImages(data) {
    var imageContainer = document.getElementById('image-container');

    // Utilisation de la bibliothèque PapaParse pour analyser le CSV
    Papa.parse(data, {
        header: true,
        complete: function (results) {
            results.data.forEach(function (d) {
                var img = new Image();
                img.src = d['Chemin de l\'image'];
                img.alt = d['Description de l\'image'];
                img.classList.add("image-responsive");

                img.onclick = function () {
                    document.getElementById('modal').style.display = "block";
                    document.getElementById("modal-image").src = this.src;
                    document.getElementById("caption").innerHTML = this.alt;
                };

                imageContainer.appendChild(img);
            });
        }
    });
}

// Chargement du CSV et génération des images
loadCSV(generateImages);

document.getElementsByClassName("close")[0].onclick = function () {
    document.getElementById('modal').style.display = "none";
};

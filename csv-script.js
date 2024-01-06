// Fonction pour charger le fichier CSV
function loadCSV() {
    Papa.parse('images.csv', {
        download: true,
        header: true,
        complete: function(results) {
            groupImagesBySection(results.data);
        }
    });
}

// Fonction pour regrouper les images par section
function groupImagesBySection(data) {
    // Créer un objet pour stocker les images par section
    var sections = {};

    // Organiser les images par section
    data.forEach(function(item) {
        var section = item.Section || 'default'; // Section par défaut si non spécifiée
        if (!sections[section]) {
            sections[section] = [];
        }
        sections[section].push(item);
    });

    // Générer les images pour chaque section
    Object.keys(sections).forEach(function(section) {
        generateImages(section, sections[section]);
    });
}

// Fonction pour générer les éléments d'image
function generateImages(section, data) {
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

    // Créer une section HTML pour chaque groupe d'images
    var sectionElement = document.createElement('section');
    sectionElement.id = section.toLowerCase(); // Utiliser le nom de la section en minuscules comme identifiant
    sectionElement.innerHTML = '<h2>' + section + '</h2>';
    sectionElement.appendChild(imageContainer);

    gallery.appendChild(sectionElement);
}

// Appel de la fonction pour charger le CSV et générer les images
loadCSV();

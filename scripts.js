// Fonction pour charger un fichier CSV
function loadCSV(callback) {
    fetch('images.csv')
        .then(response => response.text())
        .then(data => callback(data))
        .catch(error => console.error('Erreur lors du chargement du CSV:', error));
}

function generateImages(data) {
    var imageContainer = document.getElementById('image-container');
    var tags = {};

    Papa.parse(data, {
        header: true,
        complete: function (results) {
            results.data.forEach(function (d) {
                if (!item['Nom de l\'image'] || !item['Chemin de l\'image']) {
                    return; // Ignorez cette entrée
                }
                var container = document.createElement('div');
                container.classList.add('image-wrapper');
                container.dataset.tags = d['Tags'];

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
                img.onload = function () {
                    descContainer.style.maxWidth = `${img.width}px`;
                };

                container.appendChild(descContainer);
                imageContainer.appendChild(container);

                d['Tags'].split('-').forEach(function (tag) {
                    if (tags[tag]) {
                        tags[tag]++;
                    } else {
                        tags[tag] = 1;
                    }
                });
            });

            displayTagCloud(tags);
        }
    });
}

function displayTagCloud(tags) {
    var tagCloud = document.createElement('div');
    tagCloud.id = 'tag-cloud';
    document.querySelector('#container h3').insertAdjacentElement('afterend', tagCloud);

    var allTag = document.createElement('span');
    allTag.textContent = 'tout ';
    allTag.style.fontSize = '16px';
    allTag.style.margin = '5px';
    allTag.style.cursor = 'pointer';
    allTag.addEventListener('click', function () {
        filterImages('tout');
    });
    tagCloud.appendChild(allTag);

    for (var tag in tags) {
        var size = 16 + (tags[tag] * 2);
        var span = document.createElement('span');
        span.textContent = tag + ' ';
        span.style.fontSize = size + 'px';
        span.style.margin = '5px';
        span.style.cursor = 'pointer';

        span.addEventListener('click', function (event) {
            filterImages(event.target.textContent.trim());
        });

        tagCloud.appendChild(span);
    }
}

function filterImages(selectedTag) {
    var imageContainers = document.querySelectorAll('.image-wrapper');

    imageContainers.forEach(function (container) {
        var tags = container.dataset.tags.split('-');

        if (selectedTag === 'tout' || tags.includes(selectedTag)) {
            container.style.display = 'inline-block';
        } else {
            container.style.display = 'none';
        }
    });
}

// Chargement du CSV et génération des images
loadCSV(generateImages);

document.getElementsByClassName("close")[0].onclick = function () {
    document.getElementById('modal').style.display = "none";
};

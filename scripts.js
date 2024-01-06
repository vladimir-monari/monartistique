document.addEventListener('DOMContentLoaded', function () {
    // ... (your existing code)

    // Initialize Masonry on page load
    initMasonry();
});

// Fonction pour initialiser Masonry
function initMasonry() {
    var galleryContainer = document.querySelector('.image-container');
    var masonry = new Masonry(galleryContainer, {
        itemSelector: '.gallery-item',
        columnWidth: '.gallery-sizer',
        percentPosition: true
    });
}

// ... (your existing code)

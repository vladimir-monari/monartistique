d3.csv("images.csv").then(function(data) {
    data.forEach(function(d) {
        var img = new Image();
        img.src = d.chemin;
        img.alt = d.description;
        img.classList.add("image-responsive");

        img.onclick = function() {
            document.getElementById('modal').style.display = "block";
            document.getElementById("modal-image").src = this.src;
            document.getElementById("caption").innerHTML = this.alt;
        };

        document.getElementById("image-container").appendChild(img);
    });
});

document.getElementsByClassName("close")[0].onclick = function() {
    document.getElementById('modal').style.display = "none";
};
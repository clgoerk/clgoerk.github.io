
document.addEventListener('DOMContentLoaded', function() {
  const lightbox = document.querySelector("#lightbox");
  const lightboxImg = document.querySelector("#lightboxImg");

  function openLightbox(imgElement) {
    const fullSrc = imgElement.dataset.full || imgElement.src;

    lightbox.style.display = "flex";

    // Show loading spinner while loading
    lightboxImg.style.opacity = "0";

    const tempImg = new Image();
    tempImg.onload = function () {
      lightboxImg.src = fullSrc;
      lightboxImg.style.opacity = "1";
    };
    tempImg.src = fullSrc;
  }

  function closeLightbox() {
    lightbox.style.display = "none";
    lightboxImg.src = "";
  }

  // Attach globally so inline onclick still works
  window.openLightbox = openLightbox;
  window.closeLightbox = closeLightbox;
});
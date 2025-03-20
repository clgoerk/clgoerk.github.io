
document.addEventListener('DOMContentLoaded', function() {
  const lightbox = document.querySelector("#lightbox");
  const lightboxImg = document.querySelector("#lightboxImg");

  function openLightbox(imgElement) {
    lightbox.style.display = "flex";
    lightboxImg.src = imgElement.src;
  }

  function closeLightbox() {
    lightbox.style.display = "none";
  }

  // Attach functions to window so they work in HTML onclick
  window.openLightbox = openLightbox;
  window.closeLightbox = closeLightbox;
});
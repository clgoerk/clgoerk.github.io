document.addEventListener('DOMContentLoaded', function() {
  const lightbox = document.querySelector("#lightbox");
  const lightboxImg = document.querySelector("#lightboxImg");

  function openLightbox(imgElement) {
    const fullSrc = imgElement.dataset.full || imgElement.src;

    // Show overlay
    lightbox.classList.add("show");

    // Fade out while loading
    lightboxImg.style.opacity = "0";

    const tempImg = new Image();
    tempImg.onload = function () {
      lightboxImg.src = fullSrc;
      lightboxImg.style.opacity = "1";
    };
    tempImg.src = fullSrc;
  }

  function closeLightbox() {
    lightbox.classList.remove("show");
    lightboxImg.src = "";
  }

  // Expose globally for inline onclick
  window.openLightbox = openLightbox;
  window.closeLightbox = closeLightbox;
});
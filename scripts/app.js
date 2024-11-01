document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.querySelector('#gallery');
    const scrollLeftButton = document.querySelector('#scrollLeft');
    const scrollRightButton = document.querySelector('#scrollRight');
    const mobileMenu = document.querySelector('#mobileMenu');
    const navList = document.querySelector('#navList');

    const scrollAmount = 320; // Adjust this value to match galleryItem width + gap

    // Function to scroll the gallery
    function scrollGallery(amount) {
        gallery.scrollBy({
            left: amount,
        });
    }

    // Event listeners for the scroll buttons
    scrollLeftButton.addEventListener('click', function() {
        scrollGallery(-scrollAmount);
    });

    scrollRightButton.addEventListener('click', function() {
        scrollGallery(scrollAmount);
    });

    // Event listener for the mobile menu 
    mobileMenu.addEventListener('click', function() {
        navList.classList.toggle('active'); // Show/hide the navigation list
        mobileMenu.classList.toggle('open'); // Toggle the 'open' class
    });
});

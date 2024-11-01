document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.querySelector('#gallery');
    const scrollLeftButton = document.querySelector('#scrollLeft');
    const scrollRightButton = document.querySelector('#scrollRight');
    const mobileMenu = document.querySelector('#mobileMenu');
    const navList = document.querySelector('#navList');
    const ghost = document.querySelector('#ghost'); 

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
        navList.classList.toggle('active'); 
        mobileMenu.classList.toggle('open'); 
    });

    // Function to move the ghost randomly within the bounds of the seasonal section
    function moveGhost() {
        const section = document.querySelector('#seasonal');

        // Calculate the maximum positions based on section and ghost dimensions
        const maxX = section.clientWidth - ghost.clientWidth;
        const maxY = section.clientHeight - ghost.clientHeight;

        // Generate random X and Y positions within the section bounds
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);

        // Move the ghost to the new random position within the section's bounds
        ghost.style.transform = `translate(${randomX}px, ${randomY}px)`;

        // Set a delay before the next movement
        setTimeout(moveGhost, 3000); // Adjust the interval as desired
    }

    moveGhost();
});
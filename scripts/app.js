
document.addEventListener('DOMContentLoaded', function() {
  const gallery = document.querySelector('#gallery');
  const scrollLeftButton = document.querySelector('#scrollLeft');
  const scrollRightButton = document.querySelector('#scrollRight');
  const mobileMenu = document.querySelector('#mobileMenu');
  const navList = document.querySelector('#navList');
  const image = document.querySelector('#bunny'); 
  const section = document.querySelector('#seasonal');

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

  // Function to move the image randomly within the bounds of the seasonal section
  function moveImage() {
    // Calculate the maximum positions based on section and image dimensions
    const maxX = section.clientWidth - image.clientWidth;
    const maxY = section.clientHeight - image.clientHeight;

    // Generate random X and Y positions within the section
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    // Move the image to the new random position within the section
    bunny.style.transform = `translate(${randomX}px, ${randomY}px)`;

    setTimeout(moveImage, 3000);
  }
  moveImage();
});

document.addEventListener('DOMContentLoaded', function() {
  const backgrounds = [
    './assets/images/headerBkg.webp',
    './assets/images/headerBkgBlue.webp',
    './assets/images/headerBkgRed.webp'
  ];

  let currentBackground = 0;
  const header = document.querySelector('#home');

  // Create background divs and set initial styles
  backgrounds.forEach((src, index) => {
    const div = document.createElement('div');
    div.classList.add('background');
    div.style.backgroundImage = `url(${src})`;
    if (index !== 0) div.classList.add('hidden'); // Only hide the non-initial backgrounds
    header.appendChild(div);
  });

  // Function to peel to the next background
  function peelBackground() {
    const backgroundDivs = document.querySelectorAll('.background');
    const current = backgroundDivs[currentBackground];
    current.classList.add('hidden'); // Hide current background

    // Move to the next background
    currentBackground = (currentBackground + 1) % backgrounds.length;
    const next = backgroundDivs[currentBackground];
    next.classList.remove('hidden'); // Show next background
  }

  setInterval(peelBackground, 9000);
});

// Header introduction
document.addEventListener("DOMContentLoaded", () => {
  const textElement = document.querySelector("#text");
  const message = "Welcome to my portfolio...\n> I'm a Web & Mobile Developer";
  let index = 0;

  function typeEffect() {
    if (index < message.length) {
      textElement.innerHTML += message[index] === "\n" ? "<br>" : message[index];
      index++;
      setTimeout(typeEffect, 100);
    } else {
      setTimeout(() => {
        textElement.innerHTML = "";
        index = 0;
        typeEffect(); 
      }, 3000);
    }
  }

  typeEffect();
});



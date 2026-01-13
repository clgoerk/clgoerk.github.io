document.addEventListener('DOMContentLoaded', () => {

  // ===== GALLERY ELEMENTS =====
  const gallery = document.getElementById('gallery');
  const dotsContainer = document.getElementById('galleryDots');
  const scrollLeftButton = document.getElementById('scrollLeft');
  const scrollRightButton = document.getElementById('scrollRight');

  // ===== GALLERY DOTS (MOBILE) =====
  if (gallery && dotsContainer) {
    const items = gallery.querySelectorAll('.galleryItem');

    // Create dots
    items.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.className = 'galleryDot';
      if (i === 0) dot.classList.add('active');
      dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.galleryDot');

    function updateDots() {
      const itemWidth = gallery.clientWidth;
      const index = Math.round(gallery.scrollLeft / itemWidth);

      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
    }

    let scrollTimeout;
    gallery.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(updateDots, 80);
    });
  }

  // ===== GALLERY SCROLL BUTTONS (DESKTOP) =====
  function scrollGallery(direction) {
    if (!gallery) return;

    const item = gallery.querySelector('.galleryItem');
    if (!item) return;

    const width = item.getBoundingClientRect().width;

    gallery.scrollBy({
      left: width * direction,
      behavior: 'smooth'
    });
  }

  if (gallery && scrollLeftButton && scrollRightButton) {
    scrollLeftButton.addEventListener('click', () => scrollGallery(-1));
    scrollRightButton.addEventListener('click', () => scrollGallery(1));
  }

  // ===== MOBILE NAV =====
  const mobileMenu = document.querySelector('#mobileMenu');
  const navList = document.querySelector('#navList');

  if (mobileMenu && navList) {
    mobileMenu.addEventListener('click', () => {
      navList.classList.toggle('active');
      mobileMenu.classList.toggle('open');
    });
  }

  // ===== HEADER BACKGROUND PEEL EFFECT =====
  const backgrounds = [
    './assets/images/headerBkg.webp',
    './assets/images/headerBkgBlue.webp',
    './assets/images/headerBkgRed.webp'
  ];

  let currentBackground = 0;
  const header = document.querySelector('#home');

  if (header) {
    backgrounds.forEach((src, index) => {
      const div = document.createElement('div');
      div.classList.add('background');
      div.style.backgroundImage = `url(${src})`;
      if (index !== 0) div.classList.add('hidden');
      header.appendChild(div);
    });

    function peelBackground() {
      const backgroundDivs = header.querySelectorAll('.background');
      if (!backgroundDivs.length) return;

      const current = backgroundDivs[currentBackground];
      current.classList.add('hidden');

      currentBackground = (currentBackground + 1) % backgrounds.length;
      const next = backgroundDivs[currentBackground];
      next.classList.remove('hidden');
    }

    setInterval(peelBackground, 9000);
  }

  // ===== TYPEWRITER INTRO =====
  const textElement = document.querySelector('#text');
  const message = "Hi, I'm Chris.\n> Web & Mobile Developer";
  let index = 0;

  function typeEffect() {
    if (!textElement) return;

    if (index < message.length) {
      textElement.innerHTML += message[index] === '\n' ? '<br>' : message[index];
      index++;
      setTimeout(typeEffect, 100);
    } else {
      setTimeout(() => {
        textElement.innerHTML = '';
        index = 0;
        typeEffect();
      }, 3000);
    }
  }

  if (textElement) {
    typeEffect();
  }

});




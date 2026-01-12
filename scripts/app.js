document.addEventListener('DOMContentLoaded', () => {
  // ===== GALLERY SCROLLING =====
  const gallery = document.querySelector('#gallery');
  const scrollLeftButton = document.querySelector('#scrollLeft');
  const scrollRightButton = document.querySelector('#scrollRight');

  function getScrollAmount() {
    const firstItem = document.querySelector('.galleryItem');
    if (!firstItem) return 300;

    const style = window.getComputedStyle(gallery);
    const gap = parseInt(style.columnGap || style.gap || 0);

    return firstItem.offsetWidth + gap;
  }

  function scrollGallery(direction) {
    if (!gallery) return;
    const amount = getScrollAmount() * direction;
    gallery.scrollBy({ left: amount, behavior: 'smooth' });
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




document.addEventListener('DOMContentLoaded', () => {

  // ================= GALLERY + DOTS + DRAG + CLICK =================
  const gallery = document.getElementById('gallery');
  const dotsContainer = document.getElementById('galleryDots');

  if (gallery && dotsContainer) {
    const items = Array.from(gallery.querySelectorAll('.galleryItem'));

    // ---------- Build dots ----------
    dotsContainer.innerHTML = '';
    items.forEach((item, i) => {
      const dot = document.createElement('div');
      dot.className = 'galleryDot';
      if (i === 0) dot.classList.add('active');

      dot.addEventListener('click', () => {
        gallery.scrollTo({ left: item.offsetLeft, behavior: 'smooth' });
      });

      dotsContainer.appendChild(dot);
    });

    const dots = Array.from(dotsContainer.querySelectorAll('.galleryDot'));

    function getActiveIndex() {
      const center = gallery.scrollLeft + gallery.clientWidth / 2;
      let bestIndex = 0;
      let bestDist = Infinity;

      items.forEach((item, i) => {
        const itemCenter = item.offsetLeft + item.offsetWidth / 2;
        const dist = Math.abs(center - itemCenter);
        if (dist < bestDist) {
          bestDist = dist;
          bestIndex = i;
        }
      });

      return bestIndex;
    }

    function updateDots() {
      const idx = getActiveIndex();
      dots.forEach((dot, i) => dot.classList.toggle('active', i === idx));
    }

    let scrollTimeout;
    gallery.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(updateDots, 60);
    });

    window.addEventListener('resize', updateDots);
    updateDots();

    // ================= DESKTOP: DRAG TO SCROLL =================
    let isDown = false;
    let startX = 0;
    let startScrollLeft = 0;
    let moved = false;
    let downCard = null;
    const DRAG_THRESHOLD = 6;

    gallery.addEventListener('pointerdown', (e) => {
      if (e.pointerType !== 'mouse') return;
      if (e.button !== 0) return;

      isDown = true;
      moved = false;

      startX = e.clientX;
      startScrollLeft = gallery.scrollLeft;
      downCard = e.target.closest('.galleryItem');

      gallery.classList.add('dragging');
      gallery.setPointerCapture(e.pointerId);
    });

    gallery.addEventListener('pointermove', (e) => {
      if (!isDown) return;

      const dx = e.clientX - startX;
      if (Math.abs(dx) > DRAG_THRESHOLD) moved = true;

      gallery.scrollLeft = startScrollLeft - dx;
      e.preventDefault();
    });

    function endDrag() {
      if (!isDown) return;

      isDown = false;
      gallery.classList.remove('dragging');

      if (!moved && downCard) {
        const link = downCard.dataset.link;
        if (link) {
          window.location.href = link;
        }
      }

      downCard = null;
    }

    gallery.addEventListener('pointerup', endDrag);
    gallery.addEventListener('pointercancel', endDrag);
    gallery.addEventListener('lostpointercapture', endDrag);

    // ================= MOBILE: TAP TO OPEN =================
    items.forEach(card => {
      card.addEventListener('click', () => {
        const link = card.dataset.link;
        if (link) {
          window.location.href = link;
        }
      });
    });
  }

  // ================= MOBILE NAV =================
  const mobileMenu = document.querySelector('#mobileMenu');
  const navList = document.querySelector('#navList');

  if (mobileMenu && navList) {
    mobileMenu.addEventListener('click', () => {
      navList.classList.toggle('active');
      mobileMenu.classList.toggle('open');
    });
  }

  // ================= HEADER BACKGROUND PEEL EFFECT =================
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

      backgroundDivs[currentBackground].classList.add('hidden');
      currentBackground = (currentBackground + 1) % backgrounds.length;
      backgroundDivs[currentBackground].classList.remove('hidden');
    }

    setInterval(peelBackground, 9000);
  }

  // ================= TYPEWRITER INTRO =================
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

  if (textElement) typeEffect();

});




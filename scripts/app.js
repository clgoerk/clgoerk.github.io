document.addEventListener('DOMContentLoaded', () => {

  // ================= SINGLE PROJECT SLIDER =================
  const sliderTrack = document.getElementById('sliderTrack');
  const slides = Array.from(document.querySelectorAll('.projectSlide'));
  const prevProject = document.getElementById('prevProject');
  const nextProject = document.getElementById('nextProject');
  const sliderDots = document.getElementById('sliderDots');

  if (sliderTrack && slides.length && prevProject && nextProject && sliderDots) {
    let currentSlide = 0;

    function renderSlider() {
      sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

      const dots = Array.from(sliderDots.querySelectorAll('.sliderDot'));
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
      });
    }

    // ---------- Build dots ----------
    sliderDots.innerHTML = '';
    slides.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.className = 'sliderDot';
      if (index === 0) dot.classList.add('active');

      dot.addEventListener('click', () => {
        currentSlide = index;
        renderSlider();
      });

      sliderDots.appendChild(dot);
    });

    // ---------- Previous / Next ----------
    prevProject.addEventListener('click', () => {
      currentSlide = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
      renderSlider();
    });

    nextProject.addEventListener('click', () => {
      currentSlide = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
      renderSlider();
    });

    // ---------- Click slide to open details ----------
    slides.forEach((slide) => {
      slide.addEventListener('click', () => {
        const link = slide.dataset.link;
        if (link) {
          window.location.href = link;
        }
      });
    });

    // ---------- Optional swipe support for mobile ----------
    let startX = 0;
    let endX = 0;

    sliderTrack.addEventListener('touchstart', (e) => {
      startX = e.changedTouches[0].clientX;
    });

    sliderTrack.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      const diff = startX - endX;

      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          currentSlide = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
        } else {
          currentSlide = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
        }
        renderSlider();
      }
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
  const line1 = document.getElementById("line1");
  const line2 = document.getElementById("line2");
  const cursor = document.getElementById("cursor");

  const lines = [
    "> Hi, I'm Chris.",
    "> Web & Mobile Developer"
  ];

  let lineIndex = 0;
  let charIndex = 0;

  function moveCursorTo(element) {
    element.appendChild(cursor);
  }

  function typeEffect() {
    if (!line1 || !line2 || !cursor) return;

    const target = lineIndex === 0 ? line1 : line2;
    const text = lines[lineIndex];

    moveCursorTo(target);

    if (charIndex < text.length) {
      target.insertBefore(document.createTextNode(text[charIndex]), cursor);
      charIndex++;
      setTimeout(typeEffect, 80);
    } else {
      if (lineIndex === 0) {
        lineIndex = 1;
        charIndex = 0;
        setTimeout(typeEffect, 300);
      } else {
        setTimeout(resetTypewriter, 2500);
      }
    }
  }

  function resetTypewriter() {
    line1.textContent = "";
    line2.textContent = "";
    line2.appendChild(cursor);
    lineIndex = 0;
    charIndex = 0;
    typeEffect();
  }

  typeEffect();

});




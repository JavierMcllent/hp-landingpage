document.addEventListener('DOMContentLoaded', () => {

  /* =========================
   MOBILE / TABLET DRAWER
========================= */
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');

  if (btn && menu) {
    btn.addEventListener('click', () => {
      menu.classList.toggle('hidden');
      menu.classList.toggle('flex');
    });

    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.add('hidden');
        menu.classList.remove('flex');
      });
    });
  }

  /* =========================
     SCROLL REVEAL
  ========================= */
  const reveals = document.querySelectorAll('.reveal');

  function checkReveal() {
    const triggerBottom = window.innerHeight * 0.85;

    reveals.forEach(el => {
      const top = el.getBoundingClientRect().top;
      if (top < triggerBottom) {
        el.classList.add('active');
      }
    });
  }

  /* =========================
     NAVBAR THEME & SCROLL BEHAVIOR
  ========================= */
  const navbar = document.getElementById('navbar');
  const heroSection = document.querySelector('section'); // Asume que la primera sección es el Hero

  function handleNavbarStyles() {
    if (!navbar) return;

    const scrollY = window.scrollY;
    const heroHeight = heroSection ? heroSection.offsetHeight : 700;
    const triggerPoint = heroHeight * 0.50;

    // 1. Manejo de tamaño (Compacto al hacer scroll)
    if (scrollY > 50) {
      navbar.classList.add('py-2');
      navbar.classList.remove('pt-4', 'pb-2');
    } else {
      navbar.classList.remove('py-2');
      navbar.classList.add('pt-4', 'pb-2');
    }

    // 2. Manejo de Contraste (Oscuro después del 90% del Hero)
    if (scrollY > triggerPoint) {
      navbar.classList.add('nav-dark');
    } else {
      navbar.classList.remove('nav-dark');
    }
  }

  window.addEventListener('scroll', () => {
    checkReveal();
    handleNavbarStyles();
  });

  // Ejecución inicial
  checkReveal();
  handleNavbarStyles();

  /* ===============================
     PRICING TOGGLE FUNCTIONALITY
  =============================== */
  const toggle = document.getElementById('pricingToggle');
  const annuallyPrices = document.querySelectorAll('.annually-price');
  const monthlyPrices = document.querySelectorAll('.monthly-price');

  if (toggle) {
    toggle.addEventListener('change', () => {
      if (toggle.checked) {
        // Mostrar mensual
        annuallyPrices.forEach(el => el.classList.add('hidden'));
        monthlyPrices.forEach(el => el.classList.remove('hidden'));
      } else {
        // Mostrar anual
        annuallyPrices.forEach(el => el.classList.remove('hidden'));
        monthlyPrices.forEach(el => el.classList.add('hidden'));
      }
    });
  }

  /* =========================
     DYNAMIC IMAGE ANIMATIONS
     (REEMPLAZO DEL SCRIPT INYECTADO)
  ========================= */

  function updateDynamicImages() {
    const images = document.querySelectorAll('.dyn-img-link-wrapper-di-script img');

    images.forEach(img => {
      const wrapper = img.closest('.dyn-img-link-wrapper-di-script');
      if (!wrapper) return;

      const attribution = wrapper.querySelector('.dyn-img-inline-attribution-di-script');
      const button = wrapper.querySelector('.dyn-img-attribution-button-di-script');

      const rect = img.getBoundingClientRect();
      const visible = rect.top < window.innerHeight && rect.bottom > 0;

      if (attribution) {
        attribution.style.display = visible && rect.width > 300 ? 'inline-block' : 'none';
      }

      if (button) {
        button.style.display = visible ? 'flex' : 'none';
      }
    });
  }

  window.addEventListener('scroll', updateDynamicImages);
  window.addEventListener('resize', updateDynamicImages);
  updateDynamicImages();

});

/* =========================
   DYNAMIC IMAGE ANIMATIONS
   (REEMPLAZO DEL SCRIPT INYECTADO)
========================= */
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();

  // Simulación de carga
  const btn = this.querySelector('button');
  const originalText = btn.innerText;
  btn.innerText = "ENVIANDO...";
  btn.disabled = true;

  setTimeout(() => {
    this.innerHTML = `
                    <div class="text-center py-10 animate-pulse">
                        <div class="inline-flex items-center justify-center w-20 h-20 bg-hpGreen rounded-full mb-6">
                            <svg class="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                        <h3 class="font-poppins text-3xl font-bold text-hpGreen mb-4">¡Propuesta Solicitada!</h3>
                        <p class="text-gray-400 text-lg">Hemos recibido tus datos. Un especialista se pondrá en contacto para diseñar la infraestructura de salud de tu proyecto.</p>
                    </div>
                `;
  }, 1500);
});

/* ---- Pod del hero -------------------------------------------------------
   Dos cosas: respetar a quien pide menos movimiento, y no dejar que el video
   compita con el póster por ser lo primero que pinta la página.            */
(function () {
    var pod = document.getElementById('hero-pod');
    if (!pod) return;

    var quietud = window.matchMedia('(prefers-reduced-motion: reduce)');

    function aplicar() {
        if (quietud.matches) {
            pod.removeAttribute('autoplay');
            pod.pause();
        } else if (pod.paused) {
            pod.play().catch(function () { /* si el navegador lo bloquea, queda el póster */ });
        }
    }

    aplicar();
    if (quietud.addEventListener) quietud.addEventListener('change', aplicar);
})();

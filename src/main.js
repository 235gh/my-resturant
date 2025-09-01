import './style.css'



document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper(".mySwiper", {
    loop: true, // keeps revolving
    centeredSlides: true,
    slidesPerView: 1.5, // ghost slides
    spaceBetween: 0,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    on: {
      init: function () {
        // set first active state
        const active = document.querySelector(".swiper-slide-active");
        active.classList.remove("opacity-30", "scale-90", "text-gray-400");
        active.classList.add("opacity-100", "scale-100", "text-white");
      },
      slideChangeTransitionStart: function () {
        document.querySelectorAll(".swiper-slide").forEach(slide => {
          slide.classList.remove("opacity-100", "scale-100", "text-white");
          slide.classList.add("opacity-30", "scale-90", "text-gray-400");
        });
        const active = document.querySelector(".swiper-slide-active");
        active.classList.remove("opacity-30", "scale-90", "text-gray-400");
        active.classList.add("opacity-100", "scale-100", "text-white");
      }
    }
  });
});

  // Auto sliding images
  const carousel = document.getElementById("menuCarousel");
  const slides = carousel.children.length;
  let loop = true;
  let index = 0;

  function slideImages() {
    index = (index + 1) % slides;
    carousel.style.transform = `translateX(-${index * 100}%)`;
  }

  setInterval(slideImages, 4000); // Change every 4s

(function () {
  const toggle = document.getElementById("pages-toggle");
  const menu = document.getElementById("pages-menu");

  const isDesktop = () => window.matchMedia("(min-width: 768px)").matches;

  function closeMenu() {
    menu.classList.add("hidden");                 // mobile hide
    toggle.setAttribute("aria-expanded", "false");
  }
  function openMenu() {
    menu.classList.remove("hidden");              // mobile show
    toggle.setAttribute("aria-expanded", "true");
  }

  // Start closed on mobile
  closeMenu();

  // Toggle on mobile only
  toggle.addEventListener("click", (e) => {
    if (isDesktop()) return;                      // desktop uses hover
    e.preventDefault();
    menu.classList.contains("hidden") ? openMenu() : closeMenu();
  });

  // Close when any dropdown link is clicked (mobile)
  menu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => { if (!isDesktop()) closeMenu(); });
  });

  // Click outside closes (mobile)
  document.addEventListener("click", (e) => {
    if (isDesktop()) return;
    if (!menu.contains(e.target) && !toggle.contains(e.target)) closeMenu();
  });

  // On resize: ensure correct state
  window.addEventListener("resize", () => {
    if (isDesktop()) {
      // Desktop relies on hover; keep mobile state closed
      toggle.setAttribute("aria-expanded", "false");
    } else {
      // Entering mobile: ensure menu is hidden until tapped
      closeMenu();
    }
  });
})();






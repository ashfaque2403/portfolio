/**
* Template Name: Kelly
* Template URL: https://bootstrapmade.com/kelly-free-bootstrap-cv-resume-html-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    let preloaderDismissed = false;
    const hidePreloader = () => {
      if (preloaderDismissed) return;
      preloaderDismissed = true;
      preloader.classList.add('loaded');
      setTimeout(() => {
        if (preloader.parentNode) preloader.remove();
      }, 500);
    };

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      hidePreloader();
    } else {
      document.addEventListener('DOMContentLoaded', hidePreloader);
      window.addEventListener('load', hidePreloader);
      // Hard failsafe: never block screen for more than 600ms even on slow connections
      setTimeout(hidePreloader, 600);
    }
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 600,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', aosInit);
  } else {
    aosInit();
  }

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  if (skillsAnimation.length > 0 && typeof Waypoint !== 'undefined') {
    skillsAnimation.forEach((item) => {
      new Waypoint({
        element: item,
        offset: '80%',
        handler: function(direction) {
          let progress = item.querySelectorAll('.progress .progress-bar');
          progress.forEach(el => {
            el.style.width = el.getAttribute('aria-valuenow') + '%';
          });
        }
      });
    });
  }

  /**
   * Initiate Pure Counter
   */
  if (typeof PureCounter !== 'undefined') {
    new PureCounter();
  }

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    if (typeof Swiper === 'undefined') return;
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      const configElem = swiperElement.querySelector(".swiper-config");
      if (!configElem) return;
      let config = JSON.parse(configElem.innerHTML.trim());

      if (swiperElement.classList.contains("swiper-tab") && typeof initSwiperWithCustomPagination === 'function') {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSwiper);
  } else {
    initSwiper();
  }

  /**
   * Initiate glightbox
   */
  if (typeof GLightbox !== 'undefined') {
    const glightbox = GLightbox({
      selector: '.glightbox'
    });
  }

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';
    const container = isotopeItem.querySelector('.isotope-container');
    if (!container || typeof Isotope === 'undefined') return;

    let initIsotope = new Isotope(container, {
      itemSelector: '.isotope-item',
      layoutMode: layout,
      filter: filter,
      sortBy: sort
    });

    if (typeof imagesLoaded !== 'undefined') {
      imagesLoaded(container, function() {
        initIsotope.layout();
      });
    }

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        const activeFilter = isotopeItem.querySelector('.isotope-filters .filter-active');
        if (activeFilter) activeFilter.classList.remove('filter-active');
        this.classList.add('filter-active');
        if (initIsotope) {
          initIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
        }
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Instagram Reel embeds with lazy loading and desktop drag scrolling
   */
  const reelSection = document.querySelector('#reels');
  const reelTrack = document.querySelector('.reel-track');
  if (reelTrack) {
    let isDraggingReels = false;
    let reelDragStart = 0;
    let reelScrollStart = 0;

    reelTrack.addEventListener('pointerdown', (event) => {
      if (event.pointerType === 'touch') return;
      isDraggingReels = true;
      reelDragStart = event.clientX;
      reelScrollStart = reelTrack.scrollLeft;
      reelTrack.classList.add('is-dragging');
      reelTrack.setPointerCapture(event.pointerId);
    });

    reelTrack.addEventListener('pointermove', (event) => {
      if (!isDraggingReels) return;
      reelTrack.scrollLeft = reelScrollStart - (event.clientX - reelDragStart);
    });

    const stopReelDrag = () => {
      isDraggingReels = false;
      reelTrack.classList.remove('is-dragging');
    };

    reelTrack.addEventListener('pointerup', stopReelDrag);
    reelTrack.addEventListener('pointercancel', stopReelDrag);
    reelTrack.addEventListener('mouseleave', stopReelDrag);

    function updateReelParallax() {
      const viewportCenter = window.innerWidth / 2;
      reelTrack.querySelectorAll('.reel-card').forEach(card => {
        const cardBounds = card.getBoundingClientRect();
        const offset = Math.max(-1, Math.min(1, (cardBounds.left + cardBounds.width / 2 - viewportCenter) / viewportCenter));
        card.style.setProperty('--reel-offset', offset.toFixed(3));
      });
    }

    reelTrack.addEventListener('scroll', updateReelParallax, { passive: true });
    window.addEventListener('resize', updateReelParallax);
    updateReelParallax();

    function processReelEmbeds() {
      if (window.instgrm && window.instgrm.Embeds) {
        window.instgrm.Embeds.process();
      }
      reelTrack.querySelectorAll('.instagram-media').forEach(embed => {
        const card = embed.closest('.reel-card');
        const embedFrame = embed.querySelector('iframe');
        if (embedFrame && embedFrame.getBoundingClientRect().height > 0) {
          card.classList.add('is-embedded');
        }
      });
    }

    let instagramLoaded = false;
    function loadInstagramScript() {
      if (instagramLoaded) return;
      instagramLoaded = true;
      const script = document.createElement('script');
      script.src = 'https://www.instagram.com/embed.js';
      script.async = true;
      script.onload = () => {
        processReelEmbeds();
        let embedChecks = 0;
        const embedCheckTimer = window.setInterval(() => {
          processReelEmbeds();
          embedChecks += 1;
          if (embedChecks >= 6) window.clearInterval(embedCheckTimer);
        }, 1000);
      };
      document.body.appendChild(script);
    }

    if ('IntersectionObserver' in window && reelSection) {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          loadInstagramScript();
          observer.disconnect();
        }
      }, { rootMargin: '400px' });
      observer.observe(reelSection);
    } else {
      setTimeout(loadInstagramScript, 2500);
    }
  }

  /**
   * One-page navigation state
   */
  const onePageNav = document.querySelector('.one-page-site #navmenu');
  if (onePageNav) {
    const onePageLinks = onePageNav.querySelectorAll('a[href^="#"]');
    const onePageSections = Array.from(onePageLinks)
      .map(link => document.querySelector(link.getAttribute('href')))
      .filter(Boolean);

    function setActiveSection() {
      const currentPosition = window.scrollY + 140;
      let currentSection = onePageSections[0];

      onePageSections.forEach(section => {
        if (section.offsetTop <= currentPosition) currentSection = section;
      });

      onePageLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${currentSection.id}`);
      });
    }

    window.addEventListener('scroll', setActiveSection, { passive: true });
    window.addEventListener('load', setActiveSection);
  }

  const currentYear = document.querySelector('#current-year');
  if (currentYear) currentYear.textContent = new Date().getFullYear();

})();

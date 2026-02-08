/**
 * Bliss Massage and Beauty - Main JavaScript
 * Purpose: Mobile conversion optimization only
 * No tracking, no analytics, no libraries
 */

(function() {
  'use strict';

  // Configuration
  const MOBILE_BREAKPOINT = 768; // Match CSS tablet breakpoint
  const PHONE_NUMBER = '07738071260';
  const WHATSAPP_NUMBER = '447738071260';

  /**
   * Check if current viewport is mobile
   * @returns {boolean}
   */
  function isMobile() {
    return window.innerWidth < MOBILE_BREAKPOINT;
  }

  /**
   * Create the sticky CTA bar element
   * @returns {HTMLElement}
   */
  function createStickyBar() {
    const bar = document.createElement('div');
    bar.className = 'sticky-cta-bar';
    bar.setAttribute('role', 'complementary');
    bar.setAttribute('aria-label', 'Quick contact options');

    bar.innerHTML = `
      <a href="tel:${PHONE_NUMBER}" class="sticky-cta-button sticky-call" aria-label="Call now">
        <span class="sticky-cta-icon">📞</span>
        <span class="sticky-cta-text">Call</span>
      </a>
      <a href="https://wa.me/${WHATSAPP_NUMBER}" class="sticky-cta-button sticky-whatsapp" aria-label="Message on WhatsApp">
        <span class="sticky-cta-icon">💬</span>
        <span class="sticky-cta-text">WhatsApp</span>
      </a>
    `;

    return bar;
  }

  /**
   * Add sticky bar CSS styles to the page
   */
  function injectStyles() {
    // Check if styles already injected
    if (document.getElementById('sticky-cta-styles')) {
      return;
    }

    const style = document.createElement('style');
    style.id = 'sticky-cta-styles';
    style.textContent = `
      .sticky-cta-bar {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        gap: 1px;
        background-color: #fff;
        border-top: 1px solid #e8e4df;
        box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.08);
        z-index: 1000;
        padding: 0;
      }

      .sticky-cta-button {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 0.875rem 1rem;
        text-decoration: none;
        font-size: 0.875rem;
        font-weight: 600;
        transition: background-color 0.2s ease;
      }

      .sticky-call {
        background-color: #8b9e8a;
        color: #fff;
      }

      .sticky-call:hover {
        background-color: #6f7f6e;
      }

      .sticky-whatsapp {
        background-color: #3a3a3a;
        color: #fff;
      }

      .sticky-whatsapp:hover {
        background-color: #666;
      }

      .sticky-cta-icon {
        font-size: 1.25rem;
        margin-bottom: 0.25rem;
      }

      .sticky-cta-text {
        font-size: 0.875rem;
      }

      /* Add bottom padding to body to prevent content from being hidden */
      body.has-sticky-bar {
        padding-bottom: 70px;
      }

      /* Hide on larger screens */
      @media (min-width: 768px) {
        .sticky-cta-bar {
          display: none;
        }
        body.has-sticky-bar {
          padding-bottom: 0;
        }
      }
    `;

    document.head.appendChild(style);
  }

  /**
   * Initialize the sticky CTA bar
   */
  function initStickyBar() {
    // Only run if mobile
    if (!isMobile()) {
      return;
    }

    // Check if bar already exists
    if (document.querySelector('.sticky-cta-bar')) {
      return;
    }

    // Inject styles
    injectStyles();

    // Create and append bar
    const bar = createStickyBar();
    document.body.appendChild(bar);
    document.body.classList.add('has-sticky-bar');
  }

  /**
   * Remove the sticky CTA bar
   */
  function removeStickyBar() {
    const bar = document.querySelector('.sticky-cta-bar');
    if (bar) {
      bar.remove();
      document.body.classList.remove('has-sticky-bar');
    }
  }

  /**
   * Handle window resize
   */
  function handleResize() {
    if (isMobile()) {
      initStickyBar();
    } else {
      removeStickyBar();
    }
  }

  /**
   * Initialize on DOM ready
   */
  function init() {
    // Initialize sticky bar if on mobile
    initStickyBar();

    // Handle resize events (debounced)
    let resizeTimer;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(handleResize, 250);
    });
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

/**
 * Hamburger Menu Toggle Functionality
 * Purpose: Handle mobile navigation menu toggle
 */
(function() {
  'use strict';

  function initHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    if (!hamburger || !navMenu) {
      return;
    }
    
    // Toggle menu on hamburger click
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
      
      // Update aria-expanded for accessibility
      const isExpanded = hamburger.classList.contains('active');
      hamburger.setAttribute('aria-expanded', isExpanded);
    });
    
    // Close menu when clicking a link (mobile only)
    navLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
          hamburger.classList.remove('active');
          navMenu.classList.remove('active');
          hamburger.setAttribute('aria-expanded', 'false');
        }
      });
    });
    
    // Close menu when resizing to desktop
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }
  
  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHamburgerMenu);
  } else {
    initHamburgerMenu();
  }

})();

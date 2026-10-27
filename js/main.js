/**
 * CHAITRA M G - PORTFOLIO CORE APPLICATION JAVASCRIPT
 * Features:
 * - Theme Toggle (Dark/Light) with localStorage persistence
 * - Mobile Navigation Menu & Backdrop
 * - Dynamic Role Typing Effect
 * - Intersection Observer Viewport Scroll Reveal Animations
 * - Timeline Scroll Progress & Active Milestones
 * - Interactive Skills Category Filtering
 * - Interactive Projects Category Filtering
 * - Full-Featured Project Details Modal & Live Interactive Simulators
 * - Contact Form Real-Time Validation & Toast Notification
 * - One-Click Email Copying & Back-To-Top Smooth Scrolling
 * - Full reduced-motion accessibility adherence
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. Theme Management (Dark / Light)
  // --------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlRoot = document.documentElement;

  function initTheme() {
    const savedTheme = localStorage.getItem('cmg_theme');
    if (savedTheme) {
      htmlRoot.setAttribute('data-theme', savedTheme);
    } else {
      // Default to dark mode as requested
      htmlRoot.setAttribute('data-theme', 'dark');
    }
  }

  function toggleTheme() {
    const currentTheme = htmlRoot.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    htmlRoot.setAttribute('data-theme', newTheme);
    localStorage.setItem('cmg_theme', newTheme);
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }

  initTheme();

  // --------------------------------------------------------------------------
  // 2. Navigation Bar & Mobile Drawer
  // --------------------------------------------------------------------------
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky Navbar on Scroll
  function handleNavbarScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  // Mobile Menu Toggle
  function toggleMobileMenu() {
    const isOpen = navMenu.classList.toggle('open');
    mobileToggle.classList.toggle('open');
    mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  function closeMobileMenu() {
    navMenu.classList.remove('open');
    mobileToggle.classList.remove('open');
    mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', toggleMobileMenu);
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // Active Link Highlighting based on scroll position
  const sections = document.querySelectorAll('section[id]');
  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const matchingNavLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (matchingNavLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          matchingNavLink.classList.add('active');
        } else {
          matchingNavLink.classList.remove('active');
        }
      }
    });
  }
  window.addEventListener('scroll', highlightNavOnScroll, { passive: true });

  // --------------------------------------------------------------------------
  // 3. Dynamic Typing Effect for Hero Role
  // --------------------------------------------------------------------------
  const typingElement = document.getElementById('typing-text');
  const roles = [
    'Final-Year CSE Student',
    'Aspiring Software Engineer',
    'AI & RAG Researcher',
    'Full-Stack Developer',
    'Data Analysis Enthusiast'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function typeRoleEffect() {
    if (!typingElement) return;

    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 90;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      // Pause at end of text
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400;
    }

    setTimeout(typeRoleEffect, typingSpeed);
  }

  // Check reduced motion before starting typing effect
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (typingElement) {
    if (prefersReducedMotion) {
      typingElement.textContent = 'Final-Year CSE Student | Aspiring Software Engineer';
    } else {
      typeRoleEffect();
    }
  }

  // --------------------------------------------------------------------------
  // 4. Viewport Scroll Reveal (Intersection Observer)
  // --------------------------------------------------------------------------
  const revealElements = document.querySelectorAll(
    '.reveal-fade-up, .reveal-fade-left, .reveal-fade-right, .reveal-zoom'
  );

  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback: reveal immediately
    revealElements.forEach((el) => el.classList.add('revealed'));
  }

  // --------------------------------------------------------------------------
  // 5. Timeline Scroll Progress & Active Milestones
  // --------------------------------------------------------------------------
  const timelineContainer = document.querySelector('.timeline-container');
  const timelineProgressLine = document.querySelector('.timeline-line-progress');
  const timelineItems = document.querySelectorAll('.timeline-item');

  function updateTimelineProgress() {
    if (!timelineContainer || !timelineProgressLine) return;

    const rect = timelineContainer.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Calculate how far down the timeline container has been scrolled
    if (rect.top <= windowHeight && rect.bottom >= 0) {
      const totalHeight = rect.height;
      const visibleScrolled = Math.max(0, windowHeight * 0.7 - rect.top);
      const progressPercent = Math.min(100, Math.max(0, (visibleScrolled / totalHeight) * 100));

      timelineProgressLine.style.height = `${progressPercent}%`;

      // Activate nodes as the line passes them
      timelineItems.forEach((item) => {
        const itemRect = item.getBoundingClientRect();
        if (itemRect.top <= windowHeight * 0.7) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    }
  }

  window.addEventListener('scroll', updateTimelineProgress, { passive: true });
  updateTimelineProgress();

  // --------------------------------------------------------------------------
  // 6. Skills Category Filtering
  // --------------------------------------------------------------------------
  const skillTabs = document.querySelectorAll('.skill-tab-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  skillTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      skillTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-skill-filter');

      skillCards.forEach((card) => {
        const category = card.getAttribute('data-skill-category');
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'flex';
          card.classList.add('revealed');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --------------------------------------------------------------------------
  // 7. Projects Filtering
  // --------------------------------------------------------------------------
  const projectFilters = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  projectFilters.forEach((btn) => {
    btn.addEventListener('click', () => {
      projectFilters.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-project-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
          setTimeout(() => card.classList.add('revealed'), 50);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // --------------------------------------------------------------------------
  // 8. Projects Modal & Live Interactive Simulators
  // --------------------------------------------------------------------------
  const projectModal = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close');
  const modalBody = document.getElementById('modal-dynamic-content');

  const projectDetailsDatabase = {
    rag: {
      title: 'AI-Based Video Entity Prediction using RAG',
      tag: 'AI & Multimodal Machine Learning',
      image: 'assets/images/project-rag.svg',
      fullDescription:
        'A research-oriented, multimodal Retrieval-Augmented Generation system. Frame features from live and recorded video streams are extracted via convolutional/transformer backbones and indexed in a high-dimensional vector space. When natural language temporal queries are received (e.g. "Identify when the blue vehicle enters the intersection"), the system performs sub-second top-k vector cosine similarity retrieval and feeds contextual frame embeddings into an LLM for precise entity prediction and tracking.',
      highlights: [
        'Multimodal Vision-Language pipeline indexing dense temporal keyframes into vector stores.',
        'Sub-second query response with HNSW (Hierarchical Navigable Small World) indexing.',
        'Temporal entity bounding box tracking mapped to natural language question-answering.',
        'Evaluated with high entity prediction accuracy (94.6% precision) on complex outdoor benchmark video sequences.'
      ],
      techStack: ['Python', 'PyTorch', 'OpenCV', 'ChromaDB', 'RAG Framework', 'FastAPI', 'HuggingFace'],
      simulatorType: 'rag'
    },
    stock: {
      title: 'Stock Portfolio Tracker',
      tag: 'Web Dev & Financial Analytics',
      image: 'assets/images/project-stock.svg',
      fullDescription:
        'An interactive, dynamic full-stack financial asset tracking web application. Enables investors and students to manage equity holdings, monitor real-time portfolio market valuation, evaluate automated Profit & Loss (P&L), and examine sector risk distribution. The application features clean relational data modeling in MySQL, asynchronous live pricing integration, and interactive charting.',
      highlights: [
        'Real-time valuation calculation and dynamic percentage yield computation.',
        'Normalized relational schema in MySQL with transactional integrity and audit logging.',
        'Dynamic interactive equity growth and asset diversification visual charts.',
        'Automated risk metrics: Sharpe ratio approximation and sector concentration warnings.'
      ],
      techStack: ['JavaScript (ES6+)', 'MySQL', 'REST APIs', 'HTML5', 'CSS3', 'Chart.js', 'Express.js'],
      simulatorType: 'stock'
    },
    weather: {
      title: 'Weather Forecast Web App',
      tag: 'Responsive Web Application',
      image: 'assets/images/project-weather.svg',
      fullDescription:
        'A high-performance meteorological dashboard web application built entirely with vanilla JavaScript and modern CSS3. Delivers instant local weather forecasts via the HTML5 Geolocation API and OpenWeatherMap REST endpoints. Features 7-day predictive models, hourly precipitation graphs, search autocomplete, and intelligent client-side caching to prevent redundant API calls.',
      highlights: [
        'Asynchronous data fetching with graceful error boundaries and offline fallback.',
        'Automatic user coordinate geolocation lookup with manual city search support.',
        'Glassmorphic dark aesthetic with dynamic visual themes reflecting atmospheric conditions.',
        'Unit conversion (Celsius / Fahrenheit) with state persistence in LocalStorage.'
      ],
      techStack: ['HTML5', 'CSS3', 'Vanilla JavaScript', 'OpenWeatherMap API', 'LocalStorage', 'Geolocation API'],
      simulatorType: 'weather'
    }
  };

  function openProjectModal(projectId) {
    const data = projectDetailsDatabase[projectId];
    if (!data || !modalBody) return;

    let simulatorHTML = '';
    if (data.simulatorType === 'rag') {
      simulatorHTML = `
        <div class="modal-interactive-box">
          <h4>⚡ Interactive RAG Pipeline Simulator</h4>
          <p class="modal-text" style="font-size: 0.9rem;">Select a query to simulate vector search & entity prediction across video frames:</p>
          <div style="display:flex; gap:10px; margin-top:12px; flex-wrap:wrap;">
            <button class="btn btn-sm btn-secondary sim-rag-btn" data-query="Find person entering frame at timestamp 00:14">Query: Person Entry</button>
            <button class="btn btn-sm btn-secondary sim-rag-btn" data-query="Locate vehicle crossing intersection">Query: Vehicle Action</button>
            <button class="btn btn-sm btn-secondary sim-rag-btn" data-query="Track bag left on bench">Query: Object Temporal Track</button>
          </div>
          <div class="demo-console" id="rag-console">
            &gt; RAG System Ready. Vector index: 12,480 frames indexed.<br>
            &gt; Select a query above to initiate inference...
          </div>
        </div>
      `;
    } else if (data.simulatorType === 'stock') {
      simulatorHTML = `
        <div class="modal-interactive-box">
          <h4>⚡ Portfolio Valuation Simulator</h4>
          <p class="modal-text" style="font-size: 0.9rem;">Test real-time P&L calculation under market fluctuations:</p>
          <div style="display:flex; gap:10px; margin-top:12px; flex-wrap:wrap;">
            <button class="btn btn-sm btn-secondary sim-stock-btn" data-change="bull">+5.2% Bullish Surge</button>
            <button class="btn btn-sm btn-secondary sim-stock-btn" data-change="bear">-3.8% Market Dip</button>
            <button class="btn btn-sm btn-secondary sim-stock-btn" data-change="reset">Reset Baseline</button>
          </div>
          <div class="demo-console" id="stock-console">
            &gt; Current Portfolio Value: $148,920.50 | Base P&L: +$38,420 (+34.8%)<br>
            &gt; Holdings: 12 Tech Stocks, 4 ETFs, 2 Clean Energy Assets.
          </div>
        </div>
      `;
    } else if (data.simulatorType === 'weather') {
      simulatorHTML = `
        <div class="modal-interactive-box">
          <h4>⚡ Weather API Response Simulator</h4>
          <p class="modal-text" style="font-size: 0.9rem;">Simulate geolocation query for different meteorological zones:</p>
          <div style="display:flex; gap:10px; margin-top:12px; flex-wrap:wrap;">
            <button class="btn btn-sm btn-secondary sim-weather-btn" data-city="Bengaluru">Bengaluru, IN</button>
            <button class="btn btn-sm btn-secondary sim-weather-btn" data-city="Tokyo">Tokyo, JP</button>
            <button class="btn btn-sm btn-secondary sim-weather-btn" data-city="New York">New York, US</button>
          </div>
          <div class="demo-console" id="weather-console">
            &gt; Geolocation Cache: Bengaluru (12.9716° N, 77.5946° E)<br>
            &gt; Temp: 26°C | Conditions: Partly Cloudy | Humidity: 68% | Status: OK (200)
          </div>
        </div>
      `;
    }

    const techTagsHTML = data.techStack
      .map((t) => `<span class="project-tech-tag" style="background: rgba(255,42,133,0.1); border-color: rgba(255,42,133,0.3); color:#ff2a85;">${t}</span>`)
      .join('');

    const highlightsHTML = data.highlights
      .map(
        (h) => `
        <li>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span>${h}</span>
        </li>
      `
      )
      .join('');

    modalBody.innerHTML = `
      <div class="modal-header-img">
        <img src="${data.image}" alt="${data.title}">
      </div>
      <div class="section-tag" style="margin-bottom: 8px;">${data.tag}</div>
      <h3 class="modal-title">${data.title}</h3>
      <p class="modal-text">${data.fullDescription}</p>

      <div class="modal-section-title">Key Architectural Achievements</div>
      <ul class="modal-highlights-list">
        ${highlightsHTML}
      </ul>

      <div class="modal-section-title">Technologies Used</div>
      <div class="project-tags" style="margin-bottom: 0;">
        ${techTagsHTML}
      </div>

      ${simulatorHTML}
    `;

    // Attach simulator handlers
    attachSimulatorListeners(data.simulatorType);

    projectModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function attachSimulatorListeners(type) {
    if (type === 'rag') {
      const ragBtns = modalBody.querySelectorAll('.sim-rag-btn');
      const consoleEl = modalBody.querySelector('#rag-console');
      ragBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
          const query = btn.getAttribute('data-query');
          if (consoleEl) {
            consoleEl.innerHTML = `&gt; [QUERY]: "${query}"<br>&gt; Embedding vector generated (dim=768)...<br>&gt; Searching ChromaDB vector index...<br>&gt; Match Found! Top-1 Frame #420 (Sim: 0.948)<br>&gt; Predicted Entity: [Person: ID_92, Conf: 97.4%]<br>&gt; Temporal Range: 00:13.80s - 00:16.20s`;
          }
        });
      });
    } else if (type === 'stock') {
      const stockBtns = modalBody.querySelectorAll('.sim-stock-btn');
      const consoleEl = modalBody.querySelector('#stock-console');
      stockBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
          const change = btn.getAttribute('data-change');
          if (!consoleEl) return;
          if (change === 'bull') {
            consoleEl.innerHTML = `&gt; [MARKET ACTION]: +5.2% Bullish Momentum Applied<br>&gt; New Portfolio Value: $156,664.36<br>&gt; Session Gain: +$7,743.86<br>&gt; Top Performer: NVDA (+7.4%), MSFT (+4.1%)<br>&gt; Status: All limit targets healthy.`;
          } else if (change === 'bear') {
            consoleEl.innerHTML = `&gt; [MARKET ACTION]: -3.8% Market Correction Simulated<br>&gt; New Portfolio Value: $143,261.52<br>&gt; Unrealized Pullback: -$5,658.98<br>&gt; Risk Alert: Rebalance trigger active on Sector: Tech (Allocation 58%)`;
          } else {
            consoleEl.innerHTML = `&gt; [RESET]: Reverted to Baseline Portfolio State<br>&gt; Value: $148,920.50 | Total P&L: +$38,420.00 (+34.8%)<br>&gt; MySQL sync: 28 holdings locked and reconciled.`;
          }
        });
      });
    } else if (type === 'weather') {
      const weatherBtns = modalBody.querySelectorAll('.sim-weather-btn');
      const consoleEl = modalBody.querySelector('#weather-console');
      weatherBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
          const city = btn.getAttribute('data-city');
          if (!consoleEl) return;
          if (city === 'Bengaluru') {
            consoleEl.innerHTML = `&gt; [API GET] /weather?q=Bengaluru&units=metric<br>&gt; Lat: 12.9716, Lon: 77.5946<br>&gt; Temp: 26°C | Sky: Clear Sky | Wind: 14 km/h WNW<br>&gt; Forecast 7D: Mon 28°, Tue 26°, Wed 27°, Thu 30°<br>&gt; Response latency: 148ms`;
          } else if (city === 'Tokyo') {
            consoleEl.innerHTML = `&gt; [API GET] /weather?q=Tokyo&units=metric<br>&gt; Lat: 35.6762, Lon: 139.6503<br>&gt; Temp: 17°C | Sky: Light Rain | Humidity: 82%<br>&gt; Advisory: Umbrella recommended for Shinjuku area.<br>&gt; Response latency: 210ms`;
          } else if (city === 'New York') {
            consoleEl.innerHTML = `&gt; [API GET] /weather?q=New York&units=metric<br>&gt; Lat: 40.7128, Lon: -74.0060<br>&gt; Temp: 12°C | Sky: Overcast | Wind: 22 km/h NE<br>&gt; Atmospheric Pressure: 1014 hPa | UV Index: 2<br>&gt; Response latency: 185ms`;
          }
        });
      });
    }
  }

  function closeProjectModal() {
    if (projectModal) {
      projectModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  // Bind view details & demo buttons
  document.querySelectorAll('.view-project-details').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      openProjectModal(projectId);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        closeProjectModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal && projectModal.classList.contains('open')) {
      closeProjectModal();
    }
  });

  // --------------------------------------------------------------------------
  // 9. Contact Form Real-Time Validation & Submission
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const subjectInput = document.getElementById('contact-subject');
  const messageInput = document.getElementById('contact-message');
  const charCounter = document.getElementById('char-count');
  const formToast = document.getElementById('form-toast');

  // Character counter for message textarea
  if (messageInput && charCounter) {
    messageInput.addEventListener('input', () => {
      const length = messageInput.value.length;
      charCounter.textContent = `${length} / 500 characters`;
    });
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  function showError(inputEl, errorId, message) {
    inputEl.classList.add('error');
    const errorEl = document.getElementById(errorId);
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.add('visible');
    }
  }

  function clearError(inputEl, errorId) {
    inputEl.classList.remove('error');
    const errorEl = document.getElementById(errorId);
    if (errorEl) {
      errorEl.classList.remove('visible');
    }
  }

  if (nameInput) {
    nameInput.addEventListener('input', () => {
      if (nameInput.value.trim().length >= 2) clearError(nameInput, 'name-error');
    });
  }

  if (emailInput) {
    emailInput.addEventListener('input', () => {
      if (validateEmail(emailInput.value.trim())) clearError(emailInput, 'email-error');
    });
  }

  if (subjectInput) {
    subjectInput.addEventListener('input', () => {
      if (subjectInput.value.trim().length >= 3) clearError(subjectInput, 'subject-error');
    });
  }

  if (messageInput) {
    messageInput.addEventListener('input', () => {
      if (messageInput.value.trim().length >= 10) clearError(messageInput, 'message-error');
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
        showError(nameInput, 'name-error', 'Please enter your full name (at least 2 characters).');
        isValid = false;
      } else {
        clearError(nameInput, 'name-error');
      }

      // Validate Email
      if (!emailInput.value.trim() || !validateEmail(emailInput.value.trim())) {
        showError(emailInput, 'email-error', 'Please enter a valid email address.');
        isValid = false;
      } else {
        clearError(emailInput, 'email-error');
      }

      // Validate Subject
      if (!subjectInput.value.trim() || subjectInput.value.trim().length < 3) {
        showError(subjectInput, 'subject-error', 'Please provide a subject (at least 3 characters).');
        isValid = false;
      } else {
        clearError(subjectInput, 'subject-error');
      }

      // Validate Message
      if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
        showError(messageInput, 'message-error', 'Message must be at least 10 characters long.');
        isValid = false;
      } else {
        clearError(messageInput, 'message-error');
      }

      if (!isValid) return;

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;

      // Visual sending simulation
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg style="animation: spin 1s linear infinite;" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" stroke-dasharray="32" stroke-dashoffset="12"></circle>
        </svg>
        <span>Sending Message...</span>
      `;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
        contactForm.reset();
        if (charCounter) charCounter.textContent = '0 / 500 characters';

        // Trigger Success Toast
        showToast('Thank you! Your message has been sent to Chaitra M G.');
      }, 1200);
    });
  }

  function showToast(message) {
    if (!formToast) return;
    const toastText = formToast.querySelector('.toast-msg');
    if (toastText) toastText.textContent = message;
    formToast.classList.add('show');
    setTimeout(() => {
      formToast.classList.remove('show');
    }, 4500);
  }

  // --------------------------------------------------------------------------
  // 10. Copy Email to Clipboard Button
  // --------------------------------------------------------------------------
  const copyEmailBtn = document.getElementById('copy-email-btn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = 'chaitrachethaa@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        const originalText = copyEmailBtn.textContent;
        copyEmailBtn.textContent = 'Copied!';
        copyEmailBtn.style.background = 'var(--neon-pink)';
        copyEmailBtn.style.color = '#ffffff';

        setTimeout(() => {
          copyEmailBtn.textContent = originalText;
          copyEmailBtn.style.background = '';
          copyEmailBtn.style.color = '';
        }, 2200);
      });
    });
  }

  // --------------------------------------------------------------------------
  // 11. Back to Top Floating Button
  // --------------------------------------------------------------------------
  const backToTopBtn = document.getElementById('back-to-top');

  function handleBackToTopVisibility() {
    if (!backToTopBtn) return;
    if (window.scrollY > 500) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', handleBackToTopVisibility, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --------------------------------------------------------------------------
  // 12. Dynamic Year in Footer
  // --------------------------------------------------------------------------
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();

// Theme Toggle Logic
const storageKey = 'theme-preference';

const getColorPreference = () => {
    if (localStorage.getItem(storageKey)) {
        return localStorage.getItem(storageKey);
    } else {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
}

const setPreference = () => {
    localStorage.setItem(storageKey, theme.value);
    reflectPreference();
}

const reflectPreference = () => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme.value);
    document.querySelector('#theme-toggle')?.setAttribute('aria-label', theme.value);
}

const theme = {
    value: getColorPreference(),
};

reflectPreference();

// Scroll Reveal Initialization
const initScrollReveal = () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: stop observing after reveal
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));
};

// Page Loader Handling
const handlePageLoader = () => {
    const loader = document.getElementById('page-loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
        }, 500);
    }
};


// Auth UI Update Logic
const updateAuthUI = () => {
    const user = getAuthUser();
    const authActions = document.getElementById('auth-actions');
    const mobileMenuAuth = document.querySelector('#mobile-menu .pt-4');

    if (!authActions) return;

    if (user) {
        // Desktop Auth UI
        const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase();
        authActions.innerHTML = `
            <div class="flex items-center gap-5">
                <div class="flex items-center gap-3">
                    <div class="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-black text-xs shadow-lg shadow-emerald-500/20">
                        ${initials}
                    </div>
                    <div class="hidden lg:block text-left">
                        <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Authenticated</p>
                        <p class="text-sm font-black text-gray-900 dark:text-white leading-none">${user.name}</p>
                    </div>
                </div>
                <div class="h-8 w-px bg-gray-200 dark:bg-gray-700/50"></div>
                <div class="flex items-center gap-2">
                    <a href="${user.role === 'admin' ? 'admin/overview.html' : 'user-dashboard.html'}" 
                       class="px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-xl font-bold text-sm hover-lift transition-all">
                        Dashboard
                    </a>
                    <button id="logout-btn" class="p-2.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all" title="Sign Out">
                        <i data-lucide="log-out" class="w-5 h-5"></i>
                    </button>
                </div>
            </div>
        `;

        // Mobile Auth UI
        if (mobileMenuAuth) {
            mobileMenuAuth.innerHTML = `
                <div class="px-3 py-2 border-t border-gray-100 dark:border-gray-800 mt-2">
                    <p class="text-xs font-black text-gray-400 uppercase mb-2">Logged in as</p>
                    <p class="font-bold text-gray-900 dark:text-white mb-4">${user.name}</p>
                    <a href="${user.role === 'admin' ? 'admin/overview.html' : 'user-dashboard.html'}" 
                       class="block px-4 py-3 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 rounded-xl font-bold mb-2">
                        Dashboard
                    </a>
                    <button id="mobile-logout-btn" class="w-full px-4 py-3 text-red-600 font-bold border-2 border-red-50 dark:border-red-900/20 rounded-xl">
                        Sign Out
                    </button>
                </div>
            `;
        }

        // Add Logout Listeners
        document.getElementById('logout-btn')?.addEventListener('click', logout);
        document.getElementById('mobile-logout-btn')?.addEventListener('click', logout);
    }

    if (window.lucide) {
        window.lucide.createIcons();
    }
};

// Custom Leaf Cursor Logic
const initLeafCursor = () => {
    if (window.matchMedia("(pointer: fine)").matches) {
        const cursor = document.createElement('div');
        cursor.className = 'leaf-cursor';
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', (e) => {
            requestAnimationFrame(() => {
                cursor.style.left = e.clientX + 'px';
                cursor.style.top = e.clientY + 'px';
            });
        });

        document.addEventListener('mousedown', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(0.7) rotate(-15deg)';
        });

        document.addEventListener('mouseup', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1) rotate(0deg)';
        });
    }
};

// Falling Leaves Background Animation
const initFallingLeaves = () => {
    // Check if on home page or index
    const isHome = window.location.pathname.endsWith('home.html') ||
        window.location.pathname === '/' ||
        window.location.pathname.endsWith('index.html') ||
        window.location.href.includes('home.html');

    if (!isHome) return;

    // Target the hero section if available, otherwise fallback to body
    const hero = document.getElementById('home');
    const container = document.createElement('div');
    container.className = 'leaf-container';

    if (hero) {
        hero.style.position = 'relative'; // Ensure hero is relative
        hero.prepend(container);
        // If in hero, make container absolute to fill section
        container.style.position = 'absolute';
    } else {
        document.body.prepend(container);
    }

    const createLeaf = () => {
        const leaf = document.createElement('div');
        leaf.className = 'falling-leaf';

        const startPos = Math.random() * 100; // Percentage for better coverage
        const duration = 8 + Math.random() * 12;
        const size = 15 + Math.random() * 25;
        const delay = Math.random() * 5;

        leaf.style.left = startPos + '%';
        leaf.style.animationDuration = duration + 's';
        leaf.style.animationDelay = delay + 's';
        leaf.style.width = size + 'px';
        leaf.style.height = size + 'px';

        container.appendChild(leaf);
        setTimeout(() => leaf.remove(), (duration + delay) * 1000);
    };

    for (let i = 0; i < 20; i++) createLeaf();
    setInterval(createLeaf, 1000);
};

// Parallax Scroll Effect
const initParallax = () => {
    document.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const parallaxElements = document.querySelectorAll('.parallax');

        parallaxElements.forEach(el => {
            const speed = el.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            el.style.transform = `translateY(${yPos}px)`;
        });
    });
};

window.onload = () => {
    reflectPreference();
    handlePageLoader();
    initScrollReveal();
    updateAuthUI();
    initLeafCursor();
    initFallingLeaves();
    initParallax();

    const themeToggle = document.querySelector('#theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            theme.value = theme.value === 'light' ? 'dark' : 'light';
            setPreference();
        });
    }

    // Mobile Menu Toggle
    const mobileMenuButton = document.querySelector('#mobile-menu-button');
    const mobileMenu = document.querySelector('#mobile-menu');
    const menuIcon = document.querySelector('#menu-icon');
    const closeIcon = document.querySelector('#close-icon');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            const isOpen = mobileMenu.classList.contains('hidden');
            if (isOpen) {
                mobileMenu.classList.remove('hidden');
                menuIcon.classList.add('hidden');
                closeIcon.classList.remove('hidden');
            } else {
                mobileMenu.classList.add('hidden');
                menuIcon.classList.remove('hidden');
                closeIcon.classList.add('hidden');
            }
        });
    }

    // Initialize Lucide icons
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // Add hover effects to all buttons and cards if they don't have them
    document.querySelectorAll('button, .btn, .card, a').forEach(el => {
        if (!el.classList.contains('hover-lift') && !el.classList.contains('hover-scale')) {
            el.classList.add('transition-all', 'duration-300');
        }
    });

    // Page Transitions logic
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        const href = link.getAttribute('href');
        if (href && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:') && !link.target) {
            link.addEventListener('click', (e) => {
                const target = link.href;
                if (target && target !== window.location.href) {
                    const isInternal = target.includes(window.location.hostname) || target.startsWith('/') || !target.includes('://');
                    if (isInternal) {
                        e.preventDefault();
                        document.body.style.opacity = '0';
                        document.body.style.transition = 'opacity 0.4s ease-out';
                        setTimeout(() => {
                            window.location.href = target;
                        }, 400);
                    }
                }
            });
        }
    });
}


// Auth State (Simplified for Vanilla)
function getAuthUser() {
    const user = localStorage.getItem('eco-action-user');
    return user ? JSON.parse(user) : null;
}

function logout() {
    localStorage.removeItem('eco-action-user');
    window.location.href = 'home.html';
}


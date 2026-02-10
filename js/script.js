// GSAP Initialization and Animations
document.addEventListener('DOMContentLoaded', () => {
    // Safely register ScrollTrigger if available
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    } else {
        console.warn("GSAP or ScrollTrigger not loaded. Animations may be disabled.");
    }

    console.log("Uptrix Digital Loaded");

    // --- 1. Header Entrance ---
    if (typeof gsap !== 'undefined') {
        gsap.from(".header", {
            y: -100,
            opacity: 0,
            duration: 1,
            ease: "power4.out"
        });
    }

    // --- 2. Hero Section Animations ---
    if (document.querySelector('.hero') && typeof gsap !== 'undefined') {
        const heroTl = gsap.timeline();

        // Classy Masked Reveal for Hero Title
        if (document.querySelector('.reveal-text')) {
            heroTl.to(".reveal-text", {
                y: "0%",
                opacity: 1,
                duration: 1.2,
                stagger: 0.2,
                ease: "power4.out"
            });
        }

        heroTl.from(".hero-subtitle", {
            y: 20,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        }, "-=0.8")
            .from(".hero-cta", {
                y: 20,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            }, "-=0.8");

        // Mouse Parallax Animation
        const heroSection = document.querySelector('.hero');
        heroSection.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;

            gsap.to(".hero-content", {
                x: x,
                y: y,
                duration: 1,
                ease: "power2.out"
            });
        });
    }

    // --- 3. Magnetic Buttons ---
    const buttons = document.querySelectorAll('.btn');
    if (typeof gsap !== 'undefined') {
        buttons.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                gsap.to(btn, {
                    x: x * 0.3,
                    y: y * 0.3,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, {
                    x: 0,
                    y: 0,
                    duration: 0.5,
                    ease: "elastic.out(1, 0.3)"
                });
            });
        });
    }

    // --- 4. Services Stagger Animation ---
    if (document.querySelector('.services-grid') && typeof ScrollTrigger !== 'undefined') {
        gsap.to(".service-card", {
            scrollTrigger: {
                trigger: ".services-grid",
                start: "top 80%",
            },
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out"
        });
    }

    // --- 5. Page Header Animation ---
    if (document.querySelector('.page-header') && typeof gsap !== 'undefined') {
        gsap.from(".page-title", {
            y: 50,
            opacity: 0,
            duration: 1.2,
            skewY: 5,
            ease: "power3.out"
        });
        gsap.from(".page-subtitle", {
            y: 30,
            opacity: 0,
            duration: 1,
            delay: 0.3,
            ease: "power3.out"
        });
    }

    // --- 6. Process Timeline Animation ---
    if (document.querySelector('.process-timeline') && typeof ScrollTrigger !== 'undefined') {
        gsap.from(".process-item", {
            scrollTrigger: {
                trigger: ".process-timeline",
                start: "top 80%",
            },
            x: -30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out"
        });
    }

    // --- 7. Number Counter Animation ---
    if (document.querySelector('.stats-grid') && typeof ScrollTrigger !== 'undefined') {
        const stats = document.querySelectorAll('.stat-item h3');

        stats.forEach(stat => {
            const originalText = stat.innerText;
            const numberMatch = originalText.match(/\d+/);
            const number = numberMatch ? parseInt(numberMatch[0]) : 0;
            const prefix = originalText.includes('$') ? '$' : '';
            const suffix = originalText.replace(/[^%M+]/g, '');

            const proxy = { val: 0 };

            gsap.to(proxy, {
                val: number,
                duration: 2.5,
                scrollTrigger: {
                    trigger: stat,
                    start: "top 85%"
                },
                ease: "power2.out",
                onUpdate: () => {
                    stat.innerText = prefix + Math.floor(proxy.val) + suffix;
                }
            });
        });

        gsap.from(".stat-item", {
            scrollTrigger: {
                trigger: ".stats-grid",
                start: "top 80%",
            },
            y: 40,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out"
        });
    }

    // --- 8. Service Card Expand/Collapse (CRITICAL: MUST WORK INDEPENDENTLY) ---
    const serviceToggles = document.querySelectorAll('.btn-toggle-service');
    console.log("Found service toggles:", serviceToggles.length);

    serviceToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            console.log("Toggle clicked", toggle);
            e.preventDefault(); // Good practice for buttons inside forms/links

            const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
            const controlsId = toggle.getAttribute('aria-controls');
            const content = document.getElementById(controlsId);
            const btnText = toggle.querySelector('.btn-text');
            const btnIcon = toggle.querySelector('.btn-icon');

            if (!content) {
                console.error("Target content not found for ID:", controlsId);
                return;
            }

            // Toggle state
            toggle.setAttribute('aria-expanded', !isExpanded);
            content.hidden = isExpanded; // If was expanded (true), now hidden (true)

            // Update text/icon
            if (btnText && btnIcon) {
                if (!isExpanded) {
                    btnText.textContent = "Hide Included Services";
                    btnIcon.textContent = "-";
                } else {
                    btnText.textContent = "View Included Services";
                    btnIcon.textContent = "+";
                }
            }

            // Animate details (Optional GSAP enhancement)
            if (!isExpanded && typeof gsap !== 'undefined') {
                const tl = gsap.timeline();

                // Animate container height/opacity
                tl.from(content, {
                    height: 0,
                    opacity: 0,
                    duration: 0.4,
                    ease: "power2.out",
                    clearProps: "all"
                });

                // Animate list items (Staggered fade-in) - REMOVED per user request
                // const listItems = content.querySelectorAll('li'); ...
            }
        });
    });

    // --- 9. Service Card Click Navigation (New) ---
    const serviceCards = document.querySelectorAll('.service-card[data-link]');
    serviceCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Prevent navigation if clicking buttons, links, or their children
            if (e.target.closest('button') || e.target.closest('a')) {
                return;
            }
            const link = card.getAttribute('data-link');
            if (link) {
                window.location.href = link;
            }
        });
    });

    // --- 10. Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('nav-active');
            menuToggle.classList.toggle('active');
            document.body.style.overflow = nav.classList.contains('nav-active') ? 'hidden' : '';
        });

        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('nav-active');
                menuToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // --- 10. Mobile Dropdown Toggle ---
    if (window.innerWidth <= 900) {
        const dropdownToggles = document.querySelectorAll('.dropdown-container > .nav-link');
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                const dropdown = toggle.nextElementSibling;
                if (dropdown) {
                    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
                }
            });
        });
    }
});
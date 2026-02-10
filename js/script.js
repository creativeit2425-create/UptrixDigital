// GSAP Initialization and Animations
document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    console.log("Uptrix Digital Loaded");

    // --- 1. Header Entrance ---
    gsap.from(".header", {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: "power4.out"
    });

    // --- 2. Hero Section Animations ---
    if (document.querySelector('.hero')) {
        const heroTl = gsap.timeline();

        // Split text for Hero Title (Simulated)
        // We will animate the whole block but with a clip-path reveal for a premium feel
        heroTl.from(".hero-title", {
            y: 100,
            opacity: 0,
            duration: 1.2,
            skewY: 7,
            ease: "power4.out"
        })
            .from(".hero-subtitle", {
                y: 30,
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

            // Move background element in opposite direction for depth
            // Note: Targeting pseudo-element is hard in JS, so we'd typically need a real element.
            // Since .hero::before is CSS only, we skip it or standard parallax on the hero itself.
        });
    }

    // --- 3. Magnetic Buttons ---
    const buttons = document.querySelectorAll('.btn');
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

    // --- 4. Services Stagger Animation ---
    if (document.querySelector('.services-grid')) {
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
    if (document.querySelector('.page-header')) {
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
    if (document.querySelector('.process-timeline')) {
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
    if (document.querySelector('.stats-grid')) {
        const stats = document.querySelectorAll('.stat-item h3');

        stats.forEach(stat => {
            // Extract the number and the suffix/prefix
            const originalText = stat.innerText;
            const numberMatch = originalText.match(/\d+/);
            const number = numberMatch ? parseInt(numberMatch[0]) : 0;
            const prefix = originalText.includes('$') ? '$' : '';
            const suffix = originalText.replace(/[^%M+]/g, ''); // Keep %, M, +

            // Create a proxy object for animation
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

        // Also animate the container fade in
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
    // --- 8. Service Card Expand/Collapse ---
    const serviceToggles = document.querySelectorAll('.btn-toggle-service');

    serviceToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
            const controlsId = toggle.getAttribute('aria-controls');
            const content = document.getElementById(controlsId);
            const btnText = toggle.querySelector('.btn-text');
            const btnIcon = toggle.querySelector('.btn-icon');

            // Toggle state
            toggle.setAttribute('aria-expanded', !isExpanded);
            content.hidden = isExpanded;

            // Update text/icon (Optional refinement)
            if (!isExpanded) {
                btnText.textContent = "Hide Included Services";
                btnIcon.textContent = "-";
            } else {
                btnText.textContent = "View Included Services";
                btnIcon.textContent = "+";
            }

            // Animate details (Simple fade handled by CSS, but we can add GSAP if needed)
            if (!isExpanded) {
                gsap.from(content, {
                    height: 0,
                    opacity: 0,
                    duration: 0.4,
                    ease: "power2.out",
                    clearProps: "all" // Important to remove inline styles after animation to allow responsiveness
                });
            }
        });
    });
    // --- 9. Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('nav-active');
            menuToggle.classList.toggle('active');

            // Prevent scrolling when menu is open
            document.body.style.overflow = nav.classList.contains('nav-active') ? 'hidden' : '';
        });

        // Close menu when clicking a link
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
                e.preventDefault(); // Prevent navigation on mobile for top-level item
                const dropdown = toggle.nextElementSibling;
                if (dropdown) {
                    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
                }
            });
        });
    }
});
 
 / /   - - -   H o m e p a g e   R e d e s i g n   A n i m a t i o n s   ( A p p e n d e d )   - - -  
 d o c u m e n t . a d d E v e n t L i s t e n e r ( " D O M C o n t e n t L o a d e d " ,   ( e v e n t )   = >   {  
         g s a p . r e g i s t e r P l u g i n ( S c r o l l T r i g g e r ) ;  
  
         / /   1 .   H e r o   S e c t i o n   S e t u p  
         i f   ( d o c u m e n t . q u e r y S e l e c t o r ( ' . h e r o - t i t l e ' ) )   {  
                 c o n s t   h e r o T l   =   g s a p . t i m e l i n e ( ) ;  
                 h e r o T l . f r o m ( " . h e r o - t i t l e " ,   {  
                         y :   5 0 ,  
                         o p a c i t y :   0 ,  
                         d u r a t i o n :   1 ,  
                         e a s e :   " p o w e r 3 . o u t " ,  
                         d e l a y :   0 . 2  
                 } )  
                         . f r o m ( " . h e r o - s u b t i t l e " ,   {  
                                 y :   3 0 ,  
                                 o p a c i t y :   0 ,  
                                 d u r a t i o n :   1 ,  
                                 e a s e :   " p o w e r 3 . o u t "  
                         } ,   " - = 0 . 6 " )  
                         . f r o m ( " . h e r o - c t a " ,   {  
                                 y :   2 0 ,  
                                 o p a c i t y :   0 ,  
                                 d u r a t i o n :   1 ,  
                                 e a s e :   " p o w e r 3 . o u t "  
                         } ,   " - = 0 . 6 " ) ;  
         }  
  
         / /   2 .   S e r v i c e   P r e v i e w   C a r d s   ( S t a g g e r )  
         i f   ( d o c u m e n t . q u e r y S e l e c t o r ( ' . s e r v i c e s - o v e r v i e w - g r i d ' ) )   {  
                 g s a p . f r o m ( " . s e r v i c e - p r e v i e w - c a r d " ,   {  
                         s c r o l l T r i g g e r :   {  
                                 t r i g g e r :   " . s e r v i c e s - o v e r v i e w - g r i d " ,  
                                 s t a r t :   " t o p   8 0 % "  
                         } ,  
                         y :   5 0 ,  
                         o p a c i t y :   0 ,  
                         d u r a t i o n :   0 . 8 ,  
                         s t a g g e r :   0 . 2 ,  
                         e a s e :   " p o w e r 2 . o u t "  
                 } ) ;  
         }  
  
         / /   3 .   W h y   U s   /   F e a t u r e   C a r d s   ( S t a g g e r )  
         i f   ( d o c u m e n t . q u e r y S e l e c t o r ( ' . f e a t u r e s - g r i d ' ) )   {  
                 g s a p . f r o m ( " . f e a t u r e - c a r d " ,   {  
                         s c r o l l T r i g g e r :   {  
                                 t r i g g e r :   " . f e a t u r e s - g r i d " ,  
                                 s t a r t :   " t o p   8 0 % "  
                         } ,  
                         x :   - 3 0 ,  
                         o p a c i t y :   0 ,  
                         d u r a t i o n :   0 . 8 ,  
                         s t a g g e r :   0 . 1 5 ,  
                         e a s e :   " p o w e r 2 . o u t "  
                 } ) ;  
         }  
  
         / /   4 .   R e s u l t s   C a r d s   ( F l i p / F a d e )  
         i f   ( d o c u m e n t . q u e r y S e l e c t o r ( ' . r e s u l t s - g r i d ' ) )   {  
                 g s a p . f r o m ( " . r e s u l t - c a r d " ,   {  
                         s c r o l l T r i g g e r :   {  
                                 t r i g g e r :   " . r e s u l t s - g r i d " ,  
                                 s t a r t :   " t o p   8 5 % "  
                         } ,  
                         y :   4 0 ,  
                         o p a c i t y :   0 ,  
                         d u r a t i o n :   1 ,  
                         s t a g g e r :   0 . 2 ,  
                         e a s e :   " p o w e r 2 . o u t "  
                 } ) ;  
         }  
 } ) ;  
 
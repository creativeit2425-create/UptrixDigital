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
  
 / /   - - -   V i s u a l   E n h a n c e m e n t s   ( S m o o t h   S c r o l l   &   P a r t i c l e s )   - - -  
 d o c u m e n t . a d d E v e n t L i s t e n e r ( " D O M C o n t e n t L o a d e d " ,   ( )   = >   {  
         / /   1 .   L e n i s   S m o o t h   S c r o l l   I n i t i a l i z a t i o n  
         i f   ( t y p e o f   L e n i s   ! = =   ' u n d e f i n e d ' )   {  
                 c o n s t   l e n i s   =   n e w   L e n i s ( {  
                         d u r a t i o n :   1 . 2 ,  
                         e a s i n g :   ( t )   = >   M a t h . m i n ( 1 ,   1 . 0 0 1   -   M a t h . p o w ( 2 ,   - 1 0   *   t ) ) ,  
                         d i r e c t i o n :   ' v e r t i c a l ' ,  
                         g e s t u r e D i r e c t i o n :   ' v e r t i c a l ' ,  
                         s m o o t h :   t r u e ,  
                         m o u s e M u l t i p l i e r :   1 ,  
                         s m o o t h T o u c h :   f a l s e ,  
                         t o u c h M u l t i p l i e r :   2 ,  
                 } ) ;  
  
                 f u n c t i o n   r a f ( t i m e )   {  
                         l e n i s . r a f ( t i m e ) ;  
                         r e q u e s t A n i m a t i o n F r a m e ( r a f ) ;  
                 }  
  
                 r e q u e s t A n i m a t i o n F r a m e ( r a f ) ;  
  
                 / /   I n t e g r a t e   G S A P   S c r o l l T r i g g e r   w i t h   L e n i s  
                 i f   ( t y p e o f   S c r o l l T r i g g e r   ! = =   ' u n d e f i n e d ' )   {  
                         l e n i s . o n ( ' s c r o l l ' ,   S c r o l l T r i g g e r . u p d a t e ) ;  
                         g s a p . t i c k e r . a d d ( ( t i m e )   = >   {  
                                 l e n i s . r a f ( t i m e   *   1 0 0 0 ) ;  
                         } ) ;  
                         g s a p . t i c k e r . l a g S m o o t h i n g ( 0 ) ;  
                 }  
         }  
  
         / /   2 .   H e r o   P a r t i c l e s   A n i m a t i o n  
         c o n s t   h e r o O v e r l a y   =   d o c u m e n t . q u e r y S e l e c t o r ( ' . h e r o - o v e r l a y ' ) ;  
         i f   ( h e r o O v e r l a y )   {  
                 c o n s t   c a n v a s   =   d o c u m e n t . c r e a t e E l e m e n t ( ' c a n v a s ' ) ;  
                 h e r o O v e r l a y . a p p e n d C h i l d ( c a n v a s ) ;  
                 c o n s t   c t x   =   c a n v a s . g e t C o n t e x t ( ' 2 d ' ) ;  
  
                 l e t   w i d t h ,   h e i g h t ;  
                 l e t   p a r t i c l e s   =   [ ] ;  
  
                 / /   C o n f i g u r a t i o n  
                 c o n s t   p a r t i c l e C o u n t   =   w i n d o w . i n n e r W i d t h   <   7 6 8   ?   3 0   :   6 0 ;   / /   F e w e r   m o b i l e   p a r t i c l e s  
                 c o n s t   c o n n e c t i o n D i s t a n c e   =   1 5 0 ;  
                 c o n s t   m o u s e D i s t a n c e   =   2 0 0 ;  
  
                 l e t   m o u s e   =   {   x :   n u l l ,   y :   n u l l   } ;  
  
                 w i n d o w . a d d E v e n t L i s t e n e r ( ' m o u s e m o v e ' ,   ( e )   = >   {  
                         c o n s t   r e c t   =   c a n v a s . g e t B o u n d i n g C l i e n t R e c t ( ) ;  
                         m o u s e . x   =   e . c l i e n t X   -   r e c t . l e f t ;  
                         m o u s e . y   =   e . c l i e n t Y   -   r e c t . t o p ;  
                 } ) ;  
  
                 w i n d o w . a d d E v e n t L i s t e n e r ( ' m o u s e l e a v e ' ,   ( )   = >   {  
                         m o u s e . x   =   n u l l ;  
                         m o u s e . y   =   n u l l ;  
                 } ) ;  
  
                 f u n c t i o n   r e s i z e ( )   {  
                         w i d t h   =   c a n v a s . w i d t h   =   h e r o O v e r l a y . o f f s e t W i d t h ;  
                         h e i g h t   =   c a n v a s . h e i g h t   =   h e r o O v e r l a y . o f f s e t H e i g h t ;  
                 }  
  
                 c l a s s   P a r t i c l e   {  
                         c o n s t r u c t o r ( )   {  
                                 t h i s . x   =   M a t h . r a n d o m ( )   *   w i d t h ;  
                                 t h i s . y   =   M a t h . r a n d o m ( )   *   h e i g h t ;  
                                 t h i s . v x   =   ( M a t h . r a n d o m ( )   -   0 . 5 )   *   0 . 5 ;  
                                 t h i s . v y   =   ( M a t h . r a n d o m ( )   -   0 . 5 )   *   0 . 5 ;  
                                 t h i s . s i z e   =   M a t h . r a n d o m ( )   *   2   +   1 ;  
                         }  
  
                         u p d a t e ( )   {  
                                 t h i s . x   + =   t h i s . v x ;  
                                 t h i s . y   + =   t h i s . v y ;  
  
                                 / /   B o u n c e   o f f   e d g e s  
                                 i f   ( t h i s . x   <   0   | |   t h i s . x   >   w i d t h )   t h i s . v x   * =   - 1 ;  
                                 i f   ( t h i s . y   <   0   | |   t h i s . y   >   h e i g h t )   t h i s . v y   * =   - 1 ;  
  
                                 / /   M o u s e   i n t e r a c t i o n  
                                 i f   ( m o u s e . x   ! =   n u l l )   {  
                                         l e t   d x   =   m o u s e . x   -   t h i s . x ;  
                                         l e t   d y   =   m o u s e . y   -   t h i s . y ;  
                                         l e t   d i s t a n c e   =   M a t h . s q r t ( d x   *   d x   +   d y   *   d y ) ;  
  
                                         i f   ( d i s t a n c e   <   m o u s e D i s t a n c e )   {  
                                                 c o n s t   f o r c e D i r e c t i o n X   =   d x   /   d i s t a n c e ;  
                                                 c o n s t   f o r c e D i r e c t i o n Y   =   d y   /   d i s t a n c e ;  
                                                 c o n s t   f o r c e   =   ( m o u s e D i s t a n c e   -   d i s t a n c e )   /   m o u s e D i s t a n c e ;  
                                                 c o n s t   d i r e c t i o n X   =   f o r c e D i r e c t i o n X   *   f o r c e   *   0 . 6 ;  
                                                 c o n s t   d i r e c t i o n Y   =   f o r c e D i r e c t i o n Y   *   f o r c e   *   0 . 6 ;  
  
                                                 t h i s . v x   + =   d i r e c t i o n X ;  
                                                 t h i s . v y   + =   d i r e c t i o n Y ;  
                                         }  
                                 }  
  
                                 / /   F r i c t i o n  
                                 t h i s . v x   * =   0 . 9 8 ;   / /   K e e p s   p a r t i c l e s   f r o m   s p e e d i n g   u p   i n f i n i t e l y  
                                 i f   ( M a t h . a b s ( t h i s . v x )   <   0 . 1   & &   M a t h . a b s ( t h i s . v x )   >   0 )   t h i s . v x   =   ( t h i s . v x   >   0   ?   0 . 2   :   - 0 . 2 ) ;   / /   M a i n t a i n   m i n   s p e e d  
                                 t h i s . v y   * =   0 . 9 8 ;  
  
                                 / /   I f   b a r e l y   m o v i n g ,   a d d   r a n d o m   n u d g e  
                                 i f   ( M a t h . a b s ( t h i s . v x )   <   0 . 1 )   t h i s . v x   =   ( M a t h . r a n d o m ( )   -   0 . 5 )   *   0 . 5 ;  
                                 i f   ( M a t h . a b s ( t h i s . v y )   <   0 . 1 )   t h i s . v y   =   ( M a t h . r a n d o m ( )   -   0 . 5 )   *   0 . 5 ;  
  
                         }  
  
                         d r a w ( )   {  
                                 c t x . f i l l S t y l e   =   ' r g b a ( 2 5 5 ,   2 5 5 ,   2 5 5 ,   0 . 5 ) ' ;  
                                 c t x . b e g i n P a t h ( ) ;  
                                 c t x . a r c ( t h i s . x ,   t h i s . y ,   t h i s . s i z e ,   0 ,   M a t h . P I   *   2 ) ;  
                                 c t x . f i l l ( ) ;  
                         }  
                 }  
  
                 f u n c t i o n   i n i t ( )   {  
                         p a r t i c l e s   =   [ ] ;  
                         f o r   ( l e t   i   =   0 ;   i   <   p a r t i c l e C o u n t ;   i + + )   {  
                                 p a r t i c l e s . p u s h ( n e w   P a r t i c l e ( ) ) ;  
                         }  
                 }  
  
                 f u n c t i o n   a n i m a t e ( )   {  
                         c t x . c l e a r R e c t ( 0 ,   0 ,   w i d t h ,   h e i g h t ) ;  
  
                         f o r   ( l e t   i   =   0 ;   i   <   p a r t i c l e s . l e n g t h ;   i + + )   {  
                                 p a r t i c l e s [ i ] . u p d a t e ( ) ;  
                                 p a r t i c l e s [ i ] . d r a w ( ) ;  
  
                                 f o r   ( l e t   j   =   i ;   j   <   p a r t i c l e s . l e n g t h ;   j + + )   {  
                                         l e t   d x   =   p a r t i c l e s [ i ] . x   -   p a r t i c l e s [ j ] . x ;  
                                         l e t   d y   =   p a r t i c l e s [ i ] . y   -   p a r t i c l e s [ j ] . y ;  
                                         l e t   d i s t a n c e   =   M a t h . s q r t ( d x   *   d x   +   d y   *   d y ) ;  
  
                                         i f   ( d i s t a n c e   <   c o n n e c t i o n D i s t a n c e )   {  
                                                 c t x . b e g i n P a t h ( ) ;  
                                                 c t x . s t r o k e S t y l e   =   ` r g b a ( 2 5 5 ,   2 5 5 ,   2 5 5 ,   $ { 1   -   d i s t a n c e   /   c o n n e c t i o n D i s t a n c e } ) ` ;  
                                                 c t x . l i n e W i d t h   =   0 . 5 ;  
                                                 c t x . m o v e T o ( p a r t i c l e s [ i ] . x ,   p a r t i c l e s [ i ] . y ) ;  
                                                 c t x . l i n e T o ( p a r t i c l e s [ j ] . x ,   p a r t i c l e s [ j ] . y ) ;  
                                                 c t x . s t r o k e ( ) ;  
                                         }  
                                 }  
                         }  
                         r e q u e s t A n i m a t i o n F r a m e ( a n i m a t e ) ;  
                 }  
  
                 w i n d o w . a d d E v e n t L i s t e n e r ( ' r e s i z e ' ,   ( )   = >   {  
                         r e s i z e ( ) ;  
                         i n i t ( ) ;  
                 } ) ;  
  
                 r e s i z e ( ) ;  
                 i n i t ( ) ;  
                 a n i m a t e ( ) ;  
         }  
 } ) ;  
 
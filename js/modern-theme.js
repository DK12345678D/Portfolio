/**
 * Modern 3D Theme Initialization
 * Consolidates all interactive logic for the portfolio.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Custom Interactive Cursor
    const cursor = document.getElementById("cursor");
    if (cursor) {
        document.addEventListener("mousemove", (e) => {
            cursor.style.left = e.clientX + "px";
            cursor.style.top = e.clientY + "px";
        });
    }

    // 2. Initialize Vanilla Tilt for 3D Cards
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".glass-card, .portfolio_gallery_item, .blog_box, .box_main"), {
            max: 10,
            speed: 400,
            glare: true,
            "max-glare": 0.2,
        });
    }

    // 3. Page Loader Logic
    window.addEventListener("load", () => {
        setTimeout(() => {
            document.body.classList.add("loaded");
        }, 400); // Faster loader as refined previously
    });

    // 4. Scroll to Top / Progress Bar Logic
    let progressPath = null;
    let pathLength = 0;
    let progressInitialized = false;

    const initScrollProgress = (mybutton) => {
        progressPath = mybutton.querySelector('svg path');
        if (progressPath) {
            pathLength = progressPath.getTotalLength();
            progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
            progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
            progressPath.style.strokeDashoffset = pathLength;
            progressPath.getBoundingClientRect();
            progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
        }
        progressInitialized = true;
    };

    window.topFunction = function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const updateScrollProgress = () => {
        const mybutton = document.getElementById("myBtn");
        if (!mybutton) return;

        if (!progressInitialized) {
            initScrollProgress(mybutton);
        }

        const scroll = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
        
        // Toggle active-progress class
        if (scroll > 300) {
            mybutton.classList.add("active-progress");
        } else {
            mybutton.classList.remove("active-progress");
        }

        // Update SVG progress stroke
        if (progressPath) {
            const height = document.documentElement.scrollHeight - window.innerHeight;
            const progress = pathLength - (scroll * pathLength / height);
            progressPath.style.strokeDashoffset = progress;
        }
    };

    window.addEventListener('scroll', updateScrollProgress);

    // Use MutationObserver to reactively initialize scroll progress as soon as #myBtn is injected dynamically
    const footerObserver = new MutationObserver((mutations, obs) => {
        const mybutton = document.getElementById("myBtn");
        if (mybutton) {
            updateScrollProgress();
            obs.disconnect();
        }
    });
    footerObserver.observe(document.body, { childList: true, subtree: true });

    // 5. Sticky Navbar Scroll Effect
    const handleNavbarScroll = () => {
        const header = document.querySelector('.header_bg');
        if (header) {
            if (window.scrollY > 50) {
                header.style.background = 'rgba(2, 6, 23, 0.92)';
                header.style.backdropFilter = 'blur(16px)';
                header.style.boxShadow = '0 4px 30px rgba(0,0,0,0.4)';
                header.style.borderBottom = '1px solid var(--glass-border)';
            } else {
                header.style.background = '';
                header.style.backdropFilter = '';
                header.style.boxShadow = 'none';
                header.style.borderBottom = '';
            }
        }
    };
    window.addEventListener('scroll', handleNavbarScroll);
    handleNavbarScroll(); // Initial check

    // Fallbacks to guarantee execution
    updateScrollProgress();
    setTimeout(updateScrollProgress, 500);
    setTimeout(updateScrollProgress, 1500);
});

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
    // Periodically check/initialize progress state as footer loads asynchronously
    setTimeout(updateScrollProgress, 400);
    setTimeout(updateScrollProgress, 800);
    setTimeout(updateScrollProgress, 1500);
});

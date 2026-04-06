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

    // 4. Scroll to Top Logic
    const mybutton = document.getElementById("myBtn");
    if (mybutton) {
        window.onscroll = function() {
            if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
                mybutton.style.display = "flex";
                mybutton.style.opacity = "1";
            } else {
                mybutton.style.opacity = "0";
                setTimeout(() => {
                    if (mybutton.style.opacity === "0") mybutton.style.display = "none";
                }, 300);
            }
        };

        window.topFunction = function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        };
    }
});

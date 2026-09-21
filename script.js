/* =====================================================
   MAAI_XG STORE
   MAIN JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =================================================
       MOBILE MENU
    ================================================= */

    const menuToggle =
        document.querySelector(".menu-toggle");

    const navMenu =
        document.querySelector(".nav-menu");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            navMenu.classList.toggle("open");

            const icon =
                menuToggle.querySelector("i");

            if (navMenu.classList.contains("open")) {

                icon.classList.remove("fa-bars");

                icon.classList.add("fa-xmark");

            } else {

                icon.classList.remove("fa-xmark");

                icon.classList.add("fa-bars");

            }

        });


        document.querySelectorAll(".nav-link").forEach(link => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("open");

                const icon =
                    menuToggle.querySelector("i");

                icon.classList.remove("fa-xmark");

                icon.classList.add("fa-bars");

            });

        });

    }


    /* =================================================
       NAVBAR SCROLL EFFECT
    ================================================= */

    const navbar =
        document.querySelector(".navbar");

    function updateNavbar() {

        if (!navbar) return;

        if (window.scrollY > 50) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    }

    window.addEventListener(
        "scroll",
        updateNavbar
    );

    updateNavbar();


    /* =================================================
       ACTIVE NAVIGATION
    ================================================= */

    const sections =
        document.querySelectorAll("section[id]");

    const navLinks =
        document.querySelectorAll(".nav-link");

    function updateActiveNav() {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 150;

            const sectionHeight =
                section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach(link => {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (
                href === `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        });

    }

    window.addEventListener(
        "scroll",
        updateActiveNav
    );

    updateActiveNav();


    /* =================================================
       SMOOTH SCROLL
    ================================================= */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            const navbarHeight =
                navbar
                    ? navbar.offsetHeight
                    : 0;

            const position =
                target.offsetTop - navbarHeight;

            window.scrollTo({
                top: position,
                behavior: "smooth"
            });

        });

    });


    /* =================================================
       REVEAL ANIMATION
    ================================================= */

    const revealElements =
        document.querySelectorAll(".reveal");

    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });


    /* =================================================
       BUY BUTTONS
    ================================================= */

    const buyButtons =
        document.querySelectorAll(".buy-btn");

    const whatsappNumber =
        "79996118911";


    buyButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const product =
                    button.dataset.product ||
                    "Gaming Gift Card";


                const message =
                    `Hello MAAI_XG STORE,%0A%0A` +
                    `I want to buy: ${product}.%0A` +
                    `Please send me the available options and prices.%0A%0A` +
                    `Thank you.`;


                const whatsappUrl =
                    `https://wa.me/${whatsappNumber}?text=${message}`;


                window.open(
                    whatsappUrl,
                    "_blank"
                );

            }
        );

    });


    /* =================================================
       RIPPLE EFFECT
    ================================================= */

    document.querySelectorAll(
        ".btn, .buy-btn, .nav-buy"
    ).forEach(button => {

        button.style.position = "relative";

        button.style.overflow = "hidden";


        button.addEventListener(
            "click",
            function(event) {

                const circle =
                    document.createElement("span");

                circle.classList.add("ripple");


                const rect =
                    this.getBoundingClientRect();


                const size =
                    Math.max(
                        rect.width,
                        rect.height
                    );


                circle.style.width =
                    `${size}px`;

                circle.style.height =
                    `${size}px`;


                circle.style.left =
                    `${event.clientX - rect.left - size / 2}px`;

                circle.style.top =
                    `${event.clientY - rect.top - size / 2}px`;


                this.appendChild(circle);


                setTimeout(() => {

                    circle.remove();

                }, 600);

            }
        );

    });


    /* =================================================
       PRODUCT CARD TILT
    ================================================= */

    const productCards =
        document.querySelectorAll(".product-card");


    productCards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                if (window.innerWidth < 850) {
                    return;
                }


                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX - rect.left;


                const y =
                    event.clientY - rect.top;


                const centerX =
                    rect.width / 2;


                const centerY =
                    rect.height / 2;


                const rotateX =
                    ((y - centerY) / centerY) * -3;


                const rotateY =
                    ((x - centerX) / centerX) * 3;


                card.style.transform =
                    `perspective(800px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-8px)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform = "";

            }
        );

    });


    /* =================================================
       CURRENT YEAR
    ================================================= */

    const yearElement =
        document.getElementById("year");


    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }


    /* =================================================
       CONTACT BUTTON HOVER
    ================================================= */

    document.querySelectorAll(
        ".contact-btn"
    ).forEach(button => {

        button.addEventListener(
            "mouseenter",
            () => {

                button.style.transform =
                    "translateX(-5px)";

            }
        );


        button.addEventListener(
            "mouseleave",
            () => {

                button.style.transform = "";

            }
        );

    });


    /* =================================================
       BRAND CONSOLE MESSAGE
    ================================================= */

    console.log(
        "%c MAAI_XG STORE ",
        "color:#00eaff;font-size:20px;font-weight:bold;"
    );

    console.log(
        "Digital Gaming Cards Store"
    );

});
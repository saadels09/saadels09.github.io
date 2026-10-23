/* =========================================
   SAAD EL ASLI — PORTFOLIO
   Interactive features
========================================= */

document.addEventListener("DOMContentLoaded", () => {
    const loader = document.getElementById("loader");
    const header = document.getElementById("header");
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");
    const navItems = document.querySelectorAll(".nav-link");
    const revealElements = document.querySelectorAll(".reveal");
    const sections = document.querySelectorAll("main section[id]");
    const year = document.getElementById("year");

    // 1. Loading screen
    const hideLoader = () => {
        if (loader) {
            loader.classList.add("loaded");
        }
    };

    // Also works if the page has already loaded.
    if (document.readyState === "complete") {
        hideLoader();
    } else {
        window.addEventListener("load", hideLoader, { once: true });
    }

    // Safety fallback if loading takes too long.
    window.setTimeout(hideLoader, 2500);

    // 2. Automatic footer year
    if (year) {
        year.textContent = new Date().getFullYear();
    }

    // 3. Header background on scroll
    const updateHeader = () => {
        if (header) {
            header.classList.toggle(
                "scrolled",
                window.scrollY > 35
            );
        }
    };

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });

    updateHeader();

    // 4. Mobile navigation
    const closeMenu = () => {
        if (!navLinks || !menuToggle) return;

        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Ouvrir le menu");
        menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';

        document.body.classList.remove("menu-open");
    };

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("open");

            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Fermer le menu" : "Ouvrir le menu"
            );

            menuToggle.innerHTML = isOpen
                ? '<i class="fa-solid fa-xmark"></i>'
                : '<i class="fa-solid fa-bars"></i>';

            document.body.classList.toggle("menu-open", isOpen);
        });

        navItems.forEach((link) => {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                closeMenu();
            }
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 760) {
                closeMenu();
            }
        });
    }

    // 5. Reveal animations
    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if ("IntersectionObserver" in window && !prefersReducedMotion) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -35px 0px"
            }
        );

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach((element) => {
            element.classList.add("visible");
        });
    }

    // 6. Active navigation link
    if ("IntersectionObserver" in window) {
        const sectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    navItems.forEach((link) => {
                        const matches =
                            link.getAttribute("href") ===
                            `#${entry.target.id}`;

                        link.classList.toggle("active", matches);
                    });
                });
            },
            {
                rootMargin: "-30% 0px -55% 0px",
                threshold: 0
            }
        );

        sections.forEach((section) => {
            sectionObserver.observe(section);
        });
    }

    // 7. Subtle pointer effect on cards
    const cards = document.querySelectorAll(
        ".skill-card, .info-card, .project-card"
    );

    const supportsHover = window.matchMedia(
        "(hover: hover) and (pointer: fine)"
    ).matches;

    if (supportsHover && !prefersReducedMotion) {
        cards.forEach((card) => {
            card.addEventListener("pointermove", (event) => {
                const rect = card.getBoundingClientRect();

                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;

                card.style.backgroundImage =
                    `radial-gradient(circle at ${x}px ${y}px, ` +
                    "rgba(88, 166, 255, 0.09), transparent 55%)";
            });

            card.addEventListener("pointerleave", () => {
                card.style.backgroundImage = "";
            });
        });
    }

    console.log("Portfolio de Saad El Asli initialisé.");
});

/* =========================================
   CROWNSTONE - MAIN JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       MOBILE NAVIGATION
    ========================================= */

    const menuToggle = document.querySelector(".menu-toggle");
    const navbar = document.querySelector(".navbar");

    if (menuToggle && navbar) {

        menuToggle.addEventListener("click", () => {

            navbar.classList.toggle("mobile-active");

            const icon = menuToggle.querySelector("i");

            if (icon) {

                if (navbar.classList.contains("mobile-active")) {

                    icon.classList.remove("fa-bars");
                    icon.classList.add("fa-xmark");

                } else {

                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");

                }

            }

        });

    }


    /* =========================================
       FAVORITE BUTTONS
    ========================================= */

    const favoriteButtons =
        document.querySelectorAll(".favorite-btn");

    favoriteButtons.forEach(button => {

        button.addEventListener("click", (event) => {

            /*
             * Prevent the favorite button from
             * triggering any parent click actions.
             */
            event.preventDefault();
            event.stopPropagation();

            const icon = button.querySelector("i");

            if (!icon) {
                return;
            }

            icon.classList.toggle("fa-regular");
            icon.classList.toggle("fa-solid");

            button.classList.toggle("active");

        });

    });


    /* =========================================
       PROPERTY SEARCH
       
       IMPORTANT:
       Property search is handled by the
       property-search script inside index.html.

       DO NOT add a separate search-button
       click handler here.

       This prevents:
       - Duplicate search execution
       - Browser popups
       - alert() messages
       - Search conflicts
    ========================================= */

});


/* =========================================================
   CROWNSTONE PROPERTIES
   MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       HAMBURGER MENU
    ===================================================== */

    const menuToggle = document.getElementById("menuToggle");
    const mainNavigation = document.getElementById("mainNavigation");


    /*
     * Stop here if the page does not contain
     * the hamburger menu.
     */
    if (!menuToggle || !mainNavigation) {
        return;
    }


    const menuIcon = menuToggle.querySelector("i");


    /* =====================================================
       OPEN MENU
    ===================================================== */

    function openMenu() {

        mainNavigation.classList.add("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Close navigation"
        );


        if (menuIcon) {

            menuIcon.classList.remove("fa-bars");

            menuIcon.classList.add("fa-xmark");

        }

    }


    /* =====================================================
       CLOSE MENU
    ===================================================== */

    function closeMenu() {

        mainNavigation.classList.remove("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation"
        );


        if (menuIcon) {

            menuIcon.classList.remove("fa-xmark");

            menuIcon.classList.add("fa-bars");

        }

    }


    /* =====================================================
       TOGGLE MENU
    ===================================================== */

    function toggleMenu(event) {

        event.preventDefault();

        event.stopPropagation();


        if (
            mainNavigation.classList.contains("active")
        ) {

            closeMenu();

        } else {

            openMenu();

        }

    }


    /* =====================================================
       HAMBURGER BUTTON
    ===================================================== */

    menuToggle.addEventListener(
        "click",
        toggleMenu
    );


    /* =====================================================
       NAVIGATION LINKS
    ===================================================== */

    const navigationLinks =
        mainNavigation.querySelectorAll("a");


    navigationLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                closeMenu();

            }
        );

    });


    /* =====================================================
       CLOSE WHEN CLICKING OUTSIDE
    ===================================================== */

    document.addEventListener(
        "click",
        function (event) {

            const clickedInsideMenu =
                mainNavigation.contains(event.target);

            const clickedHamburger =
                menuToggle.contains(event.target);


            if (
                mainNavigation.classList.contains("active") &&
                !clickedInsideMenu &&
                !clickedHamburger
            ) {

                closeMenu();

            }

        }
    );


    /* =====================================================
       CLOSE WITH ESCAPE KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                mainNavigation.classList.contains("active")
            ) {

                closeMenu();

                menuToggle.focus();

            }

        }
    );


    /* =====================================================
       CLOSE MENU WHEN CHANGING TO DESKTOP
    ===================================================== */

    window.addEventListener(
        "resize",
        function () {

            if (window.innerWidth > 760) {

                closeMenu();

            }

        }
    );


});
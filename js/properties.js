/* =========================================================
   CROWNSTONE PROPERTIES
   PROPERTY LISTING JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const filterForm = document.getElementById("propertyFilterForm");
    const propertyGrid = document.getElementById("propertyGrid");
    const propertyCount = document.getElementById("propertyCount");
    const noResults = document.getElementById("noResults");
    const resetFilters = document.getElementById("resetFilters");
    const sortProperties = document.getElementById("sortProperties");
    const filterToggle = document.querySelector(".filter-toggle");

    if (!propertyGrid) return;

    const originalProperties = Array.from(
        propertyGrid.querySelectorAll(".listing-property-card")
    );

    const propertyType = document.getElementById("propertyType");
    const location = document.getElementById("location");
    const status = document.getElementById("status");
    const bedrooms = document.getElementById("bedrooms");
    const price = document.getElementById("price");


    /* =====================================================
       HELPERS
    ===================================================== */

    function getProperties() {
        return Array.from(
            propertyGrid.querySelectorAll(".listing-property-card")
        );
    }


    function updateCount(count) {

        if (propertyCount) {
            propertyCount.textContent = count;
        }

    }


    function showNoResults(show) {

        if (!noResults) return;

        noResults.classList.toggle("show", show);

    }


    function normalize(value) {

        return String(value || "")
            .trim()
            .toLowerCase();

    }


    /* =====================================================
       FILTER PROPERTIES
    ===================================================== */

    function filterProperties() {

        const selectedType = normalize(propertyType?.value);
        const selectedLocation = normalize(location?.value);
        const selectedStatus = normalize(status?.value);

        const selectedBedrooms =
            parseInt(bedrooms?.value || "0", 10);

        const selectedPrice =
            parseInt(price?.value || "0", 10);

        let visibleCount = 0;


        getProperties().forEach(card => {

            const cardType =
                normalize(card.dataset.type);

            const cardLocation =
                normalize(card.dataset.location);

            const cardStatus =
                normalize(card.dataset.status);

            const cardBedrooms =
                parseInt(card.dataset.bedrooms || "0", 10);

            const cardPrice =
                parseInt(card.dataset.price || "0", 10);


            const typeMatch =
                !selectedType ||
                cardType === selectedType;


            const locationMatch =
                !selectedLocation ||
                cardLocation === selectedLocation;


            const statusMatch =
                !selectedStatus ||
                cardStatus === selectedStatus;


            const bedroomMatch =
                !selectedBedrooms ||
                cardBedrooms >= selectedBedrooms;


            const priceMatch =
                !selectedPrice ||
                cardPrice <= selectedPrice;


            const matches =
                typeMatch &&
                locationMatch &&
                statusMatch &&
                bedroomMatch &&
                priceMatch;


            if (matches) {

                card.style.display = "";

                visibleCount++;

            } else {

                card.style.display = "none";

            }

        });


        updateCount(visibleCount);
        showNoResults(visibleCount === 0);

    }


    /* =====================================================
       FORM SUBMIT
    ===================================================== */

    if (filterForm) {

        filterForm.addEventListener("submit", event => {

            event.preventDefault();

            filterProperties();

            /*
             * Smoothly move the user toward the listings
             * after applying the search.
             */

            const listingSection =
                document.querySelector(".properties-section");

            if (listingSection) {

                listingSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    }


    /* =====================================================
       LIVE FILTERING
    ===================================================== */

    [
        propertyType,
        location,
        status,
        bedrooms,
        price
    ].forEach(select => {

        if (!select) return;

        select.addEventListener("change", filterProperties);

    });


    /* =====================================================
       RESET FILTERS
    ===================================================== */

    function resetAllFilters() {

        if (filterForm) {
            filterForm.reset();
        }

        getProperties().forEach(card => {

            card.style.display = "";

        });

        updateCount(originalProperties.length);

        showNoResults(false);

        if (sortProperties) {
            sortProperties.value = "featured";
        }

        sortPropertiesList("featured");

    }


    if (resetFilters) {

        resetFilters.addEventListener(
            "click",
            resetAllFilters
        );

    }


    /* =====================================================
       SORT PROPERTIES
    ===================================================== */

    function sortPropertiesList(sortType) {

        const cards = getProperties();

        cards.sort((a, b) => {

            const priceA =
                parseInt(a.dataset.price || "0", 10);

            const priceB =
                parseInt(b.dataset.price || "0", 10);


            if (sortType === "price-low") {
                return priceA - priceB;
            }


            if (sortType === "price-high") {
                return priceB - priceA;
            }


            /*
             * Featured:
             * Featured properties remain first.
             */

            if (sortType === "featured") {

                const featuredA =
                    a.querySelector(".featured-badge") ? 1 : 0;

                const featuredB =
                    b.querySelector(".featured-badge") ? 1 : 0;

                return featuredB - featuredA;

            }


            /*
             * Newest:
             * Uses data-date when supplied.
             * Otherwise keeps the existing order.
             */

            if (sortType === "newest") {

                const dateA =
                    new Date(a.dataset.date || 0);

                const dateB =
                    new Date(b.dataset.date || 0);

                return dateB - dateA;

            }


            return 0;

        });


        cards.forEach(card => {

            propertyGrid.appendChild(card);

        });

    }


    if (sortProperties) {

        sortProperties.addEventListener(
            "change",
            event => {

                sortPropertiesList(
                    event.target.value
                );

            }
        );

    }


    /* =====================================================
       FAVORITE BUTTONS
    ===================================================== */

    function initializeFavorites() {

        const favoriteButtons =
            document.querySelectorAll(".favorite-btn");


        favoriteButtons.forEach(button => {

            const card =
                button.closest(".listing-property-card");

            if (!card) return;


            const propertyName =
                card.querySelector("h3")?.textContent.trim();


            /*
             * Use the property name as a simple
             * localStorage identifier.
             */

            const favoriteKey =
                `crownstone-favorite-${propertyName}`;


            /*
             * Restore saved favorite state.
             */

            const savedFavorite =
                localStorage.getItem(favoriteKey);


            if (savedFavorite === "true") {

                button.classList.add("active");

                const icon =
                    button.querySelector("i");

                if (icon) {

                    icon.classList.remove(
                        "fa-regular"
                    );

                    icon.classList.add(
                        "fa-solid"
                    );

                }

            }


            button.addEventListener("click", event => {

                event.preventDefault();
                event.stopPropagation();


                const isActive =
                    button.classList.toggle("active");


                localStorage.setItem(
                    favoriteKey,
                    isActive
                );


                const icon =
                    button.querySelector("i");

                if (!icon) return;


                if (isActive) {

                    icon.classList.remove(
                        "fa-regular"
                    );

                    icon.classList.add(
                        "fa-solid"
                    );

                } else {

                    icon.classList.remove(
                        "fa-solid"
                    );

                    icon.classList.add(
                        "fa-regular"
                    );

                }

            });

        });

    }


    /* =====================================================
       URL FILTER PARAMETERS
       
       Example:
       properties.html?type=apartment
       properties.html?location=lagos
       properties.html?status=rent
    ===================================================== */

    function loadUrlFilters() {

        const params =
            new URLSearchParams(window.location.search);


        const urlType =
            params.get("type");

        const urlLocation =
            params.get("location");

        const urlStatus =
            params.get("status");

        const urlBedrooms =
            params.get("bedrooms");

        const urlPrice =
            params.get("price");


        if (urlType && propertyType) {

            const optionExists =
                Array.from(propertyType.options)
                    .some(option =>
                        option.value === urlType
                    );

            if (optionExists) {
                propertyType.value = urlType;
            }

        }


        if (urlLocation && location) {

            const optionExists =
                Array.from(location.options)
                    .some(option =>
                        option.value === urlLocation
                    );

            if (optionExists) {
                location.value = urlLocation;
            }

        }


        if (urlStatus && status) {

            const optionExists =
                Array.from(status.options)
                    .some(option =>
                        option.value === urlStatus
                    );

            if (optionExists) {
                status.value = urlStatus;
            }

        }


        if (urlBedrooms && bedrooms) {

            bedrooms.value = urlBedrooms;

        }


        if (urlPrice && price) {

            price.value = urlPrice;

        }


        if (
            urlType ||
            urlLocation ||
            urlStatus ||
            urlBedrooms ||
            urlPrice
        ) {

            filterProperties();

        }

    }


    /* =====================================================
       MOBILE FILTER TOGGLE
    ===================================================== */

    if (filterToggle && filterForm) {

        filterToggle.addEventListener("click", () => {

            filterForm.classList.toggle("show-filters");

            const isOpen =
                filterForm.classList.contains(
                    "show-filters"
                );


            filterToggle.innerHTML = isOpen
                ? '<i class="fa-solid fa-xmark"></i> Close'
                : '<i class="fa-solid fa-sliders"></i> Filters';

        });

    }


    /* =====================================================
       PAGINATION UI
       
       This is currently visual pagination.
       Real multi-page data can be connected later.
    ===================================================== */

    const paginationButtons =
        document.querySelectorAll(".pagination-btn");


    paginationButtons.forEach(button => {

        button.addEventListener("click", event => {

            event.preventDefault();


            if (
                button.classList.contains("disabled") ||
                button.classList.contains("active")
            ) {
                return;
            }


            /*
             * Current property page contains one set
             * of listings. Pagination backend/API can
             * be connected later.
             */

            paginationButtons.forEach(btn => {

                btn.classList.remove("active");

            });


            /*
             * Only activate numbered buttons.
             */

            if (
                !button.querySelector("i")
            ) {

                button.classList.add("active");

            }

        });

    });


    /* =====================================================
       INITIALIZE
    ===================================================== */

    updateCount(originalProperties.length);

    initializeFavorites();

    loadUrlFilters();

});
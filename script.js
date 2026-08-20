document.addEventListener("DOMContentLoaded", () => {

    /* =========================================================
       WHAT'S NEW CAROUSEL
    ========================================================= */

    const carousel =
        document.querySelector(".carousel");

    const track =
        document.querySelector(".carousel-track");

    const cards =
        document.querySelectorAll(".news-card");

    const prevBtn =
        document.querySelector(".prev");

    const nextBtn =
        document.querySelector(".next");

    const dotsContainer =
        document.querySelector(".dots");


    let currentIndex = 0;

    let autoSlide;

    let cardsPerView = getCardsPerView();


    function getCardsPerView() {

        if (window.innerWidth <= 600) {
            return 1;
        }

        if (window.innerWidth <= 1100) {
            return 3;
        }

        return 4;
    }


    function getTotalSlides() {

        cardsPerView =
            getCardsPerView();

        return Math.max(
            1,
            Math.ceil(
                cards.length /
                cardsPerView
            )
        );
    }


    function createDots() {

        if (!dotsContainer) {
            return;
        }

        dotsContainer.innerHTML = "";

        const totalSlides =
            getTotalSlides();


        for (
            let i = 0;
            i < totalSlides;
            i++
        ) {

            const dot =
                document.createElement("span");

            dot.classList.add("dot");

            if (
                i === currentIndex
            ) {
                dot.classList.add("active");
            }


            dot.addEventListener(
                "click",
                () => {

                    goToSlide(i);

                    restartAutoSlide();

                }
            );


            dotsContainer.appendChild(dot);
        }
    }


    function updateSlide() {

        if (
            !track ||
            cards.length === 0
        ) {
            return;
        }


        cardsPerView =
            getCardsPerView();


        const totalSlides =
            getTotalSlides();


        if (
            currentIndex >= totalSlides
        ) {

            currentIndex =
                totalSlides - 1;
        }


        const firstCard =
            cards[0];


        const cardWidth =
            firstCard.getBoundingClientRect().width;


        const gap = 20;


        const slideWidth =
            (cardWidth + gap) *
            cardsPerView;


        track.style.transform =
            `translateX(-${currentIndex * slideWidth}px)`;


        const dots =
            document.querySelectorAll(".dot");


        dots.forEach(
            (dot, index) => {

                dot.classList.toggle(
                    "active",
                    index === currentIndex
                );

            }
        );
    }


    function goToSlide(index) {

        const totalSlides =
            getTotalSlides();


        if (index < 0) {

            index =
                totalSlides - 1;
        }


        if (
            index >= totalSlides
        ) {

            index = 0;
        }


        currentIndex = index;

        updateSlide();
    }


    function nextSlide() {

        goToSlide(
            currentIndex + 1
        );
    }


    function previousSlide() {

        goToSlide(
            currentIndex - 1
        );
    }


    if (nextBtn) {

        nextBtn.addEventListener(
            "click",
            () => {

                nextSlide();

                restartAutoSlide();

            }
        );
    }


    if (prevBtn) {

        prevBtn.addEventListener(
            "click",
            () => {

                previousSlide();

                restartAutoSlide();

            }
        );
    }


    function startAutoSlide() {

        stopAutoSlide();


        autoSlide =
            setInterval(
                () => {

                    nextSlide();

                },
                5000
            );
    }


    function stopAutoSlide() {

        if (autoSlide) {

            clearInterval(
                autoSlide
            );

            autoSlide = null;
        }
    }


    function restartAutoSlide() {

        stopAutoSlide();

        startAutoSlide();
    }


    if (carousel) {

        carousel.addEventListener(
            "mouseenter",
            stopAutoSlide
        );


        carousel.addEventListener(
            "mouseleave",
            startAutoSlide
        );

    }


    createDots();

    updateSlide();

    startAutoSlide();


    /* =========================================================
       NAVIGATION
    ========================================================= */

    const navLinks =
        document.querySelectorAll(
            ".nav-link"
        );


    navLinks.forEach(
        link => {

            link.addEventListener(
                "click",
                function (event) {

                    const targetId =
                        this.getAttribute(
                            "href"
                        );


                    if (
                        targetId &&
                        targetId.startsWith("#")
                    ) {

                        const target =
                            document.querySelector(
                                targetId
                            );


                        if (target) {

                            event.preventDefault();


                            target.scrollIntoView({
                                behavior:
                                    "smooth",

                                block:
                                    "start"
                            });


                            navLinks.forEach(
                                item =>
                                    item.classList.remove(
                                        "active"
                                    )
                            );


                            this.classList.add(
                                "active"
                            );

                        }

                    }

                }
            );

        }
    );


    /* =========================================================
       ACTIVE NAVIGATION WHILE SCROLLING
    ========================================================= */

    const sections =
        document.querySelectorAll(
            "section[id]"
        );


    const observerOptions = {

        root: null,

        rootMargin:
            "-35% 0px -55% 0px",

        threshold: 0

    };


    const sectionObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            const id =
                                entry.target.id;


                            navLinks.forEach(
                                link => {

                                    link.classList.toggle(
                                        "active",

                                        link.getAttribute(
                                            "href"
                                        ) ===
                                        `#${id}`
                                    );

                                }
                            );

                        }

                    }
                );

            },
            observerOptions
        );


    sections.forEach(
        section =>
            sectionObserver.observe(
                section
            )
    );


    /* =========================================================
       SCROLL REVEAL
    ========================================================= */

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );

                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(
        element =>
            revealObserver.observe(
                element
            )
    );


    /* =========================================================
       IMPACT COUNTERS
    ========================================================= */

    const counters =
        document.querySelectorAll(
            ".metric-number"
        );


    let countersStarted = false;


    function animateCounters() {

        if (countersStarted) {
            return;
        }

        countersStarted = true;


        counters.forEach(
            counter => {

                const target =
                    Number(
                        counter.dataset.target
                    );


                const duration =
                    1800;


                const startTime =
                    performance.now();


                function updateCounter(
                    currentTime
                ) {

                    const elapsed =
                        currentTime -
                        startTime;


                    const progress =
                        Math.min(
                            elapsed /
                            duration,
                            1
                        );


                    const eased =
                        1 -
                        Math.pow(
                            1 - progress,
                            3
                        );


                    const currentValue =
                        Math.floor(
                            target *
                            eased
                        );


                    counter.textContent =
                        currentValue.toLocaleString(
                            "en-IN"
                        ) + "+";


                    if (
                        progress < 1
                    ) {

                        requestAnimationFrame(
                            updateCounter
                        );

                    }

                }


                requestAnimationFrame(
                    updateCounter
                );

            }
        );
    }


    const impactSection =
        document.querySelector(
            "#metrics"
        );


    if (impactSection) {

        const impactObserver =
            new IntersectionObserver(
                entries => {

                    if (
                        entries[0].isIntersecting
                    ) {

                        animateCounters();

                        impactObserver.disconnect();

                    }

                },
                {
                    threshold: 0.3
                }
            );


        impactObserver.observe(
            impactSection
        );
    }


    /* =========================================================
       CONTACT FORM
    ========================================================= */

    const form =
        document.getElementById(
            "contact-form"
        );


    const successMsg =
        document.getElementById(
            "form-success"
        );


    if (
        form &&
        successMsg
    ) {

        form.addEventListener(
            "submit",
            async event => {

                event.preventDefault();


                const submitButton =
                    form.querySelector(
                        ".submit-btn"
                    );


                const originalText =
                    submitButton.textContent;


                submitButton.disabled =
                    true;


                submitButton.textContent =
                    "Submitting...";


                const formData =
                    new FormData(
                        form
                    );


                try {

                    const response =
                        await fetch(
                            form.action,
                            {
                                method:
                                    "POST",

                                body:
                                    formData,

                                headers: {
                                    "Accept":
                                        "application/json"
                                }
                            }
                        );


                    if (
                        response.ok
                    ) {

                        const requestId =
                            "REQ-" +
                            Math.floor(
                                100000 +
                                Math.random() *
                                900000
                            );


                        successMsg.innerHTML =
                            `
                                <div class="success-icon">
                                    ✓
                                </div>

                                <div>
                                    <strong>
                                        Request Submitted Successfully
                                    </strong>

                                    <br>

                                    Request ID:
                                    <strong>
                                        ${requestId}
                                    </strong>
                                </div>
                            `;


                        successMsg.classList.add(
                            "show"
                        );


                        form.reset();


                    } else {

                        successMsg.innerHTML =
                            `
                                <strong>
                                    Something went wrong.
                                </strong>
                                Please try again.
                            `;


                        successMsg.classList.add(
                            "show"
                        );

                    }


                } catch (error) {

                    successMsg.innerHTML =
                        `
                            <strong>
                                Network error.
                            </strong>
                            Please try again later.
                        `;


                    successMsg.classList.add(
                        "show"
                    );

                }


                submitButton.disabled =
                    false;


                submitButton.textContent =
                    originalText;

            }
        );

    }


    /* =========================================================
       RESIZE
    ========================================================= */

    let resizeTimer;


    window.addEventListener(
        "resize",
        () => {

            clearTimeout(
                resizeTimer
            );


            resizeTimer =
                setTimeout(
                    () => {

                        createDots();

                        updateSlide();

                    },
                    200
                );

        }
    );


});
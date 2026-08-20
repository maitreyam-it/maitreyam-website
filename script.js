/* =========================================================
   MAITREYAM IT CONSULTANCY
   WEBSITE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     CAROUSEL
  ======================================================= */

  const track = document.querySelector(".carousel-track");
  const cards = Array.from(
    document.querySelectorAll(".news-card")
  );

  const prevButton =
    document.querySelector(".prev");

  const nextButton =
    document.querySelector(".next");

  const dotsContainer =
    document.querySelector(".dots");


  if (
    track &&
    cards.length &&
    prevButton &&
    nextButton &&
    dotsContainer
  ) {

    let currentSlide = 0;
    let cardsPerView = getCardsPerView();


    function getCardsPerView() {

      if (window.innerWidth <= 700) {
        return 1;
      }

      if (window.innerWidth <= 1000) {
        return 2;
      }

      return 4;
    }


    function getTotalSlides() {

      return Math.ceil(
        cards.length / cardsPerView
      );
    }


    function createDots() {

      dotsContainer.innerHTML = "";

      const totalSlides =
        getTotalSlides();


      for (
        let i = 0;
        i < totalSlides;
        i++
      ) {

        const dot =
          document.createElement("button");

        dot.type = "button";

        dot.className =
          "dot" +
          (i === currentSlide
            ? " active"
            : "");

        dot.setAttribute(
          "aria-label",
          `Go to slide ${i + 1}`
        );

        dot.addEventListener(
          "click",
          () => {
            currentSlide = i;
            updateCarousel();
          }
        );

        dotsContainer.appendChild(dot);
      }
    }


    function getSlideDistance() {

      const card =
        cards[0];

      const cardStyle =
        window.getComputedStyle(card);

      const cardWidth =
        card.getBoundingClientRect().width;

      const marginRight =
        parseFloat(
          cardStyle.marginRight
        ) || 0;

      return cardWidth + marginRight;
    }


    function updateCarousel() {

      const totalSlides =
        getTotalSlides();


      if (
        currentSlide >= totalSlides
      ) {
        currentSlide =
          totalSlides - 1;
      }


      if (
        currentSlide < 0
      ) {
        currentSlide = 0;
      }


      const distance =
        currentSlide *
        cardsPerView *
        getSlideDistance();


      track.style.transform =
        `translateX(-${distance}px)`;


      const dots =
        dotsContainer.querySelectorAll(
          ".dot"
        );


      dots.forEach(
        (dot, index) => {

          dot.classList.toggle(
            "active",
            index === currentSlide
          );

        }
      );
    }


    prevButton.addEventListener(
      "click",
      () => {

        const totalSlides =
          getTotalSlides();

        currentSlide =
          currentSlide <= 0
            ? totalSlides - 1
            : currentSlide - 1;

        updateCarousel();
      }
    );


    nextButton.addEventListener(
      "click",
      () => {

        const totalSlides =
          getTotalSlides();

        currentSlide =
          currentSlide >= totalSlides - 1
            ? 0
            : currentSlide + 1;

        updateCarousel();
      }
    );


    function refreshCarousel() {

      const newCardsPerView =
        getCardsPerView();


      if (
        newCardsPerView !==
        cardsPerView
      ) {

        cardsPerView =
          newCardsPerView;

        currentSlide = 0;

        createDots();
      }


      updateCarousel();
    }


    createDots();

    updateCarousel();


    let resizeTimer;

    window.addEventListener(
      "resize",
      () => {

        clearTimeout(resizeTimer);

        resizeTimer =
          setTimeout(
            refreshCarousel,
            150
          );

      }
    );

  }


  /* =======================================================
     SMOOTH NAVIGATION
  ======================================================= */

  const navigationLinks =
    document.querySelectorAll(
      '.navbar a[href^="#"]'
    );


  navigationLinks.forEach(
    (link) => {

      link.addEventListener(
        "click",
        (event) => {

          const targetId =
            link.getAttribute("href");

          const target =
            document.querySelector(
              targetId
            );


          if (!target) {
            return;
          }


          event.preventDefault();


          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }
      );

    }
  );


  /* =======================================================
     CONTACT FORM
  ======================================================= */

  const contactForm =
    document.getElementById(
      "contact-form"
    );

  const formMessage =
    document.getElementById(
      "form-success"
    );


  if (
    contactForm &&
    formMessage
  ) {

    contactForm.addEventListener(
      "submit",
      async (event) => {

        event.preventDefault();


        const submitButton =
          contactForm.querySelector(
            'button[type="submit"]'
          );


        if (submitButton) {

          submitButton.disabled =
            true;

          submitButton.innerHTML =
            "Sending...";

        }


        const formData =
          new FormData(
            contactForm
          );


        try {

          const response =
            await fetch(
              contactForm.action,
              {
                method: "POST",

                body: formData,

                headers: {
                  Accept:
                    "application/json"
                }
              }
            );


          if (!response.ok) {
            throw new Error(
              "Form submission failed"
            );
          }


          const requestId =
            "REQ-" +
            Math.floor(
              100000 +
              Math.random() * 900000
            );


          formMessage.innerHTML =
            `
              <strong>
                ✓ Enquiry submitted successfully.
              </strong>
              <br>
              Request ID:
              <strong>${requestId}</strong>
            `;


          formMessage.style.display =
            "block";


          contactForm.reset();

        }

        catch (error) {

          console.error(
            "Contact form error:",
            error
          );


          formMessage.innerHTML =
            `
              <strong>
                Unable to submit the enquiry.
              </strong>
              <br>
              Please try again or contact us directly.
            `;


          formMessage.style.display =
            "block";
        }


        if (submitButton) {

          submitButton.disabled =
            false;

          submitButton.innerHTML =
            `Send Enquiry <span>→</span>`;
        }

      }
    );

  }

});
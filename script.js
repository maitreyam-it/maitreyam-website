document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     WHAT'S NEW CAROUSEL
  ========================================================= */

  const carousel = document.querySelector(".carousel");
  const track = document.querySelector(".carousel-track");
  const cards = document.querySelectorAll(".news-card");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const dotsContainer = document.querySelector(".dots");

  let currentIndex = 0;
  let autoSlide;

  const cardsPerView = 4;
  const totalSlides = Math.ceil(cards.length / cardsPerView);


  /* -------------------------
     Create Carousel Dots
  ------------------------- */

  if (dotsContainer) {
    for (let i = 0; i < totalSlides; i++) {

      const dot = document.createElement("span");

      dot.classList.add("dot");

      if (i === 0) {
        dot.classList.add("active");
      }

      dot.addEventListener("click", () => {
        goToSlide(i);
        restartAutoSlide();
      });

      dotsContainer.appendChild(dot);
    }
  }

  const dots = document.querySelectorAll(".dot");


  /* -------------------------
     Update Carousel Position
  ------------------------- */

  function updateSlide() {

    if (!track || cards.length === 0) {
      return;
    }

    const cardWidth = cards[0].offsetWidth;

    const gap = 20;

    const slideWidth = (cardWidth + gap) * cardsPerView;

    track.style.transform =
      `translateX(-${currentIndex * slideWidth}px)`;


    /* Update active dot */

    dots.forEach((dot, index) => {
      dot.classList.toggle(
        "active",
        index === currentIndex
      );
    });
  }


  /* -------------------------
     Go To Specific Slide
  ------------------------- */

  function goToSlide(index) {

    if (index < 0) {
      index = totalSlides - 1;
    }

    if (index >= totalSlides) {
      index = 0;
    }

    currentIndex = index;

    updateSlide();
  }


  /* -------------------------
     Next Button
  ------------------------- */

  if (nextBtn) {

    nextBtn.addEventListener("click", () => {

      goToSlide(currentIndex + 1);

      restartAutoSlide();

    });
  }


  /* -------------------------
     Previous Button
  ------------------------- */

  if (prevBtn) {

    prevBtn.addEventListener("click", () => {

      goToSlide(currentIndex - 1);

      restartAutoSlide();

    });
  }


  /* -------------------------
     Automatic Sliding
  ------------------------- */

  function startAutoSlide() {

    autoSlide = setInterval(() => {

      goToSlide(currentIndex + 1);

    }, 5000); // 5 seconds

  }


  function stopAutoSlide() {

    clearInterval(autoSlide);

  }


  function restartAutoSlide() {

    stopAutoSlide();

    startAutoSlide();

  }


  /* -------------------------
     Pause on Mouse Hover
  ------------------------- */

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


  /* -------------------------
     Initial Carousel
  ------------------------- */

  updateSlide();

  startAutoSlide();


  /* =========================================================
     SMOOTH NAVIGATION
  ========================================================= */

  const navLinks =
    document.querySelectorAll(".navbar a");

  navLinks.forEach(link => {

    link.addEventListener("click", function (event) {

      const targetId =
        this.getAttribute("href");

      if (
        targetId &&
        targetId.startsWith("#")
      ) {

        const target =
          document.querySelector(targetId);

        if (target) {

          event.preventDefault();

          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }

      }

    });

  });


  /* =========================================================
     CONTACT FORM
  ========================================================= */

  const form =
    document.getElementById("contact-form");

  const successMsg =
    document.getElementById("form-success");


  if (form && successMsg) {

    form.addEventListener(
      "submit",
      async function (event) {

        event.preventDefault();

        const submitButton =
          form.querySelector("button[type='submit']");

        const originalText =
          submitButton.textContent;


        /* Show submitting state */

        submitButton.disabled = true;

        submitButton.textContent =
          "Submitting...";


        const formData =
          new FormData(form);


        try {

          const response =
            await fetch(
              form.action,
              {
                method: "POST",
                body: formData,
                headers: {
                  "Accept":
                    "application/json"
                }
              }
            );


          if (response.ok) {

            const requestId =
              "REQ-" +
              Math.floor(
                100000 +
                Math.random() * 900000
              );


            successMsg.innerHTML =
              `
                <div class="success-icon">✓</div>
                <div>
                  <strong>Request Submitted Successfully</strong>
                  <br>
                  Your Request ID:
                  <strong>${requestId}</strong>
                </div>
              `;

            successMsg.classList.add("show");

            form.reset();


          } else {

            successMsg.innerHTML =
              `
                <strong>Something went wrong.</strong>
                Please try again.
              `;

            successMsg.classList.add("show");

          }


        } catch (error) {

          successMsg.innerHTML =
            `
              <strong>Network error.</strong>
              Please try again later.
            `;

          successMsg.classList.add("show");

        }


        /* Restore button */

        submitButton.disabled = false;

        submitButton.textContent =
          originalText;

      }
    );

  }


  /* =========================================================
     WINDOW RESIZE
     Recalculate carousel position
  ========================================================= */

  window.addEventListener(
    "resize",
    () => {

      updateSlide();

    }
  );

});
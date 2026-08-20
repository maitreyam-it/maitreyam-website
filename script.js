// --- What's New Carousel (4 cards at a time) ---
const track = document.querySelector('.carousel-track');
const cards = document.querySelectorAll('.news-card');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const dotsContainer = document.querySelector('.dots');

let currentIndex = 0;
const cardsPerView = 4; // show 4 at a time
const cardWidth = 300;  // width of each card
const cardMargin = 20;  // left+right margin (10px each side)
const slideWidth = cardsPerView * (cardWidth + cardMargin); 
const totalSlides = Math.ceil(cards.length / cardsPerView);

// Create dots dynamically
for (let i = 0; i < totalSlides; i++) {
  const dot = document.createElement('span');
  dot.classList.add('dot');
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => goToSlide(i));
  dotsContainer.appendChild(dot);
}
const dots = document.querySelectorAll('.dot');

function updateSlide() {
  track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  dots.forEach((d, i) => d.classList.toggle('active', i === currentIndex));
}
function goToSlide(i) {
  currentIndex = i;
  updateSlide();
}
nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % totalSlides;
  updateSlide();
});
prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  updateSlide();
});

// Initialize carousel
updateSlide();


// --- Smooth Scroll for Navbar ---
document.querySelectorAll('.navbar a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    if (this.getAttribute('href').startsWith('#')) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});


// --- Contact Form Submission ---
const form = document.getElementById('contact-form');
const successMsg = document.getElementById('form-success');

if (form) {
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const data = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        const requestId = 'REQ-' + Math.floor(Math.random() * 1000000);
        successMsg.innerHTML = `✅ Request submitted!<br>Your Request ID: <strong>${requestId}</strong>`;
        successMsg.style.display = 'block';
        form.reset();
      } else {
        successMsg.innerHTML = "❌ Something went wrong. Please try again.";
        successMsg.style.display = 'block';
      }
    } catch (error) {
      successMsg.innerHTML = "⚠️ Network error. Please try again later.";
      successMsg.style.display = 'block';
    }
  });
}

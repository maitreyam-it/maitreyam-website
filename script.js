// --- Horizontal Slider ---
let currentSlide = 0;
const slides = document.querySelector('.slides');
const totalSlides = slides ? document.querySelectorAll('.slides img').length : 0;

function showSlide(index) {
  if (slides) {
    slides.style.transform = `translateX(-${index * 100}%)`;
    currentSlide = index;
  }
}
function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  showSlide(currentSlide);
}
if (slides) {
  setInterval(nextSlide, 4000);
  showSlide(currentSlide);
}



const track = document.querySelector('.carousel-track');
const cards = document.querySelectorAll('.news-card');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const dotsContainer = document.querySelector('.dots');

let currentIndex = 0;
const cardsPerView = 3; // show 3 at a time
const totalSlides = Math.ceil(cards.length / cardsPerView);

// Create dots
for (let i = 0; i < totalSlides; i++) {
  const dot = document.createElement('span');
  dot.classList.add('dot');
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => goToSlide(i));
  dotsContainer.appendChild(dot);
}
const dots = document.querySelectorAll('.dot');

function updateSlide() {
  track.style.transform = `translateX(-${currentIndex * 960}px)`; // 960px = 3 cards * 300px + margins
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




// --- Fade Slider ---
let fadeIndex = 0;
const fadeSlides = document.querySelectorAll('.fade-slide');
function showFadeSlide(i) {
  fadeSlides.forEach((s, idx) => s.classList.toggle('active', idx === i));
}
if (fadeSlides.length > 0) {
  setInterval(() => {
    fadeIndex = (fadeIndex + 1) % fadeSlides.length;
    showFadeSlide(fadeIndex);
  }, 4000);
  showFadeSlide(fadeIndex);
}

// --- Hero Slider ---
let heroIndex = 0;
const heroSlides = document.querySelectorAll('.hero-slide');
function showHeroSlide(i) {
  heroSlides.forEach((s, idx) => s.classList.toggle('active', idx === i));
}
if (heroSlides.length > 0) {
  setInterval(() => {
    heroIndex = (heroIndex + 1) % heroSlides.length;
    showHeroSlide(heroIndex);
  }, 4000);
  showHeroSlide(heroIndex);
}

// --- Card Carousel ---
let cardIndex = 0;
const cardTrack = document.querySelector('.card-track');
const cardCount = cardTrack ? document.querySelectorAll('.card').length : 0;
function showCardSlide(i) {
  if (cardTrack) cardTrack.style.transform = `translateX(-${i * 320}px)`;
}
if (cardTrack) {
  setInterval(() => {
    cardIndex = (cardIndex + 1) % cardCount;
    showCardSlide(cardIndex);
  }, 4000);
  showCardSlide(cardIndex);
}

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

    const response = await fetch(form.action, {
      method: form.method,
      body: data,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      const requestId = 'REQ-' + Math.floor(Math.random() * 1000000);
      successMsg.innerHTML = `✅ Request submitted!<br>Your Request ID: <strong>${requestId}</strong><br><br>
        <
		
		

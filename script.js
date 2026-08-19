// --- 1. Horizontal Slider ---
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
  setInterval(nextSlide, 4000); // auto change every 4s
  showSlide(currentSlide);
}

// --- 2. Fade Slider ---
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

// --- 3. Hero Slider ---
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

// --- 4. Card Carousel ---
let cardIndex = 0;
const cardTrack = document.querySelector('.card-track');
const cardCount = cardTrack ? document.querySelectorAll('.card').length : 0;
function showCardSlide(i) {
  if (cardTrack) cardTrack.style.transform = `translateX(-${i * 320}px)`; // 300px card + margin
}
if (cardTrack) {
  setInterval(() => {
    cardIndex = (cardIndex + 1) % cardCount;
    showCardSlide(cardIndex);
  }, 4000);
  showCardSlide(cardIndex);
}

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
      successMsg.innerHTML = `✅ Yes, your request has been submitted!<br>Your Request ID is <strong>${requestId}</strong><br><br>
        <a href="https://wa.me/919665303369?text=Hello%20MaitreyaM,%20I%20submitted%20a%20form.%20My%20Request%20ID%20is%20${requestId}" target="_blank" style="color:white;text-decoration:underline;">
        📲 Notify us on WhatsApp</a>`;
      successMsg.style.display = 'block';
      form.reset();
    } else {
      alert("❌ There was a problem sending your message. Please try again.");
    }
  });
}

// --- Slider ---
let currentSlide = 0;
const slides = document.querySelector('.slides');
const totalSlides = document.querySelectorAll('.slides img').length;

function showSlide(index) {
  slides.style.transform = `translateX(-${index * 100}%)`;
}
function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  showSlide(currentSlide);
}
setInterval(nextSlide, 4000); // auto change every 4s
showSlide(currentSlide);

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

/* ===== Menu toggle (mobile) ===== */
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle?.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

/* ===== Smooth scroll + active link highlight ===== */
const navAnchors = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');

function onScroll() {
  const scrollPos = window.scrollY + 140; // offset for header
  sections.forEach(sec => {
    const top = sec.offsetTop;
    const height = sec.offsetHeight;
    const id = sec.getAttribute('id');
    if (scrollPos >= top && scrollPos < top + height) {
      navAnchors.forEach(a => a.classList.remove('active'));
      const link = document.querySelector('.nav-links a[href="#' + id + '"]');
      if (link) link.classList.add('active');
    }
  });
}
window.addEventListener('scroll', onScroll);
onScroll();

/* Smooth scroll for nav clicks */
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    const href = a.getAttribute('href');
    document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
    if (navLinks.classList.contains('show')) navLinks.classList.remove('show');
  });
});

/* ===== Gallery Lightbox ===== */
const galleryImgs = Array.from(document.querySelectorAll('.gallery-grid img'));
const lightbox = document.getElementById('lightbox');
const lbImage = document.getElementById('lbImage');
const lbCaption = document.getElementById('lbCaption');
const lbClose = document.getElementById('lbClose');
const lbPrev = document.getElementById('lbPrev');
const lbNext = document.getElementById('lbNext');

let currentIndex = 0;

function openLightbox(index) {
  const img = galleryImgs[index];
  lbImage.src = img.src;
  lbImage.alt = img.alt || '';
  lbCaption.textContent = img.alt || '';
  currentIndex = index;
  lightbox.style.display = 'flex';
  lightbox.setAttribute('aria-hidden','false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.style.display = 'none';
  lightbox.setAttribute('aria-hidden','true');
  document.body.style.overflow = '';
}

galleryImgs.forEach((img, i) => img.addEventListener('click', () => openLightbox(i)));

function showPrev() {
  const idx = (currentIndex - 1 + galleryImgs.length) % galleryImgs.length;
  openLightbox(idx);
}
function showNext() {
  const idx = (currentIndex + 1) % galleryImgs.length;
  openLightbox(idx);
}

lbClose.addEventListener('click', closeLightbox);
lbPrev.addEventListener('click', showPrev);
lbNext.addEventListener('click', showNext);
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (e) => {
  if (lightbox.style.display === 'flex') {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
  }
});

/* ===== Contact form basic validation (simulated) ===== */
const contactForm = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');

contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const msg = document.getElementById('message').value.trim();
  if (!name || !email || !msg) {
    formMsg.textContent = 'Please fill all fields.';
    formMsg.style.color = '#ff9b9b';
    return;
  }
  formMsg.style.color = '#9fe2c8';
  formMsg.textContent = 'Message sent — thank you!';
  contactForm.reset();
  setTimeout(() => formMsg.textContent = '', 4000);
});

/* ===== Login modal (glass effect) ===== */
const loginBtn = document.getElementById('loginBtn');
const loginModal = document.getElementById('loginModal');
const loginClose = document.getElementById('loginClose');
const loginForm = document.getElementById('loginForm');

loginBtn?.addEventListener('click', () => {
  loginModal.style.display = 'flex';
  loginModal.setAttribute('aria-hidden','false');
  document.body.style.overflow = 'hidden';
});
loginClose?.addEventListener('click', () => {
  loginModal.style.display = 'none';
  loginModal.setAttribute('aria-hidden','true');
  document.body.style.overflow = '';
});
loginModal?.addEventListener('click', (e) => {
  if (e.target === loginModal) {
    loginModal.style.display = 'none';
    loginModal.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  }
});
loginForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  // simple demo behavior (replace with real auth)
  const email = document.getElementById('loginEmail').value.trim();
  const pass = document.getElementById('loginPass').value.trim();
  if (!email || !pass) {
    alert('Please enter credentials');
    return;
  }
  alert('Login simulated — replace with real auth');
  loginModal.style.display = 'none';
  document.body.style.overflow = '';
});

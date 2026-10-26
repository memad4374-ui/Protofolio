const menuBtn = document.getElementById('menuBtn');
const menu = document.getElementById('menu');

menuBtn.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
  menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});
menu.querySelectorAll('a').forEach(link =>
  link.addEventListener('click', () => {
    menu.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  })
);

const roles = ['Web Developer', 'Front-end Developer', 'Responsive Web Designer'];
const roleEl = document.getElementById('role');
let roleIndex = 0, charIndex = 0, deleting = false;

function typeRole() {
  const word = roles[roleIndex];
  roleEl.textContent = word.slice(0, charIndex);
  if (!deleting && charIndex === word.length) {
    deleting = true;
    return setTimeout(typeRole, 1500);
  }
  if (deleting && charIndex === 0) {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
  }
  charIndex += deleting ? -1 : 1;
  setTimeout(typeRole, deleting ? 40 : 80);
}
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  charIndex = 0;
  typeRole();
}

const sections = document.querySelectorAll('main section[id]');
const links = document.querySelectorAll('.menu a');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
sections.forEach(s => observer.observe(s));


const RECEIVER_EMAIL = 'you@example.com'; 
const form = document.getElementById('contactForm');
const statusEl = document.getElementById('formStatus');

function setError(id, message) {
  const input = document.getElementById(id);
  document.getElementById(id + 'Error').textContent = message;
  input.closest('.field').classList.toggle('invalid', Boolean(message));
  input.setAttribute('aria-invalid', Boolean(message));
  return !message;
}

form.addEventListener('submit', event => {
  event.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  const valid = [
    setError('name', name.length >= 2 ? '' : 'Enter your name (at least 2 letters).'),
    setError('email', /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? '' : 'Enter a valid email, like name@example.com.'),
    setError('message', message.length >= 10 ? '' : 'Write at least 10 characters.')
  ].every(Boolean);

  if (!valid) {
    statusEl.textContent = '';
    form.querySelector('.invalid input, .invalid textarea')?.focus();
    return;
  }
  const subject = encodeURIComponent('Portfolio message from ' + name);
  const body = encodeURIComponent(message + '\n\nFrom: ' + name + ' (' + email + ')');
  window.location.href = 'mailto:' + RECEIVER_EMAIL + '?subject=' + subject + '&body=' + body;

  statusEl.textContent = 'Thanks, ' + name + '. Your email app should open with the message ready to send.';
  form.reset();
});

document.getElementById('year').textContent = new Date().getFullYear();

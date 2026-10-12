const body = document.body;
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = document.querySelector('.theme-toggle__icon');
const themeText = document.querySelector('.theme-toggle__text');

const storedTheme = localStorage.getItem('qa-theme');
if (storedTheme === 'dark') {
  body.classList.add('dark');
  themeIcon.textContent = '☀️';
  themeText.textContent = 'Modo claro';
}

themeToggle.addEventListener('click', () => {
  const isDark = body.classList.toggle('dark');
  localStorage.setItem('qa-theme', isDark ? 'dark' : 'light');
  themeIcon.textContent = isDark ? '☀️' : '🌙';
  themeText.textContent = isDark ? 'Modo claro' : 'Modo oscuro';
});

const form = document.getElementById('contact-form');
const statusMessage = document.getElementById('form-status');

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !email || !message) {
      statusMessage.textContent = 'Por favor completa todos los campos antes de enviar.';
      statusMessage.className = 'form-status error';
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      statusMessage.textContent = 'Ingresa un correo válido.';
      statusMessage.className = 'form-status error';
      return;
    }

    statusMessage.textContent = 'Enviando tu mensaje...';
    statusMessage.className = 'form-status';

    const formData = new FormData(form);

    fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: { Accept: 'application/json' },
    })
      .then((response) => {
        if (response.ok) {
          statusMessage.textContent = '¡Gracias! Tu mensaje fue enviado correctamente, te responderé pronto.';
          statusMessage.className = 'form-status success';
          form.reset();
        } else {
          statusMessage.textContent = 'Hubo un problema al enviar tu mensaje. Intenta de nuevo o escríbeme directamente por correo.';
          statusMessage.className = 'form-status error';
        }
      })
      .catch(() => {
        statusMessage.textContent = 'Hubo un problema de conexión al enviar tu mensaje. Intenta de nuevo.';
        statusMessage.className = 'form-status error';
      });
  });
}

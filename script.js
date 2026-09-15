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

const reposContainer = document.getElementById('github-repos');

async function loadRepos() {
  if (!reposContainer) return;

  try {
    const response = await fetch('https://api.github.com/users/ariveraandrea1-ctrl/repos');
    if (!response.ok) throw new Error('No se pudo cargar la información de GitHub');

    const repos = await response.json();
    const publicRepos = repos
      .filter((repo) => !repo.private)
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

    if (!publicRepos.length) {
      reposContainer.innerHTML = '<div class="repo-empty">No hay repositorios públicos disponibles en este momento.</div>';
      return;
    }

    reposContainer.innerHTML = publicRepos
      .slice(0, 6)
      .map(
        (repo) => `
          <article class="repo-card">
            <div class="repo-card__top">
              <h4>${repo.name}</h4>
              <a href="${repo.html_url}" target="_blank" rel="noreferrer" aria-label="Abrir ${repo.name} en GitHub">↗</a>
            </div>
            <p>${repo.description || 'Sin descripción disponible.'}</p>
            <div class="repo-card__meta">
              <span><span class="repo-dot"></span> ${repo.language || 'Otros'}</span>
              <span>${repo.stargazers_count} ★</span>
            </div>
          </article>
        `
      )
      .join('');
  } catch (error) {
    reposContainer.innerHTML = `
      <div class="repo-empty">
        No se pudieron cargar los repositorios públicos en este momento. Puedes visitar mi perfil en GitHub directamente.
      </div>
    `;
  }
}

loadRepos();

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

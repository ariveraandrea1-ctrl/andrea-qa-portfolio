# Portafolio profesional de Andrea Rivera Amador

Este proyecto es un portafolio personal de una sola página para presentar a Andrea Rivera Amador como Junior QA Engineer. Está diseñado para ser simple, rápido y fácil de publicar en GitHub Pages.

## Stack elegido

Se eligió HTML, CSS y JavaScript puro porque es la opción más ligera, mantenible y compatible con GitHub Pages. El sitio es rápido, no depende de dependencias pesadas ni de compilación, y facilita la publicación gratuita en hosting estático.

## Estructura del proyecto

```text
andrea-qa-portfolio/
├── index.html
├── styles.css
├── script.js
├── assets/
│   └── foto-perfil.jpg
├── README.md
└── .gitignore
```

## Cómo personalizar la foto de perfil

1. Reemplaza el archivo `assets/foto-perfil.jpg` por tu foto real.
2. Asegúrate de que la imagen tenga proporciones adecuadas (idealmente cuadrada o casi cuadrada).
3. Si quieres mantener el mismo estilo visual, usa una foto con fondo limpio y buen encuadre.

## Cómo configurar el formulario de contacto con Formspree

1. Crea una cuenta gratuita en https://formspree.io
2. Crea un nuevo formulario
3. Obtén el ID del formulario
4. En el archivo `index.html`, reemplaza el valor actual en el atributo `action`:

```html
<form action="https://formspree.io/f/TU_ID_AQUI" method="POST">
```

por:

```html
<form action="https://formspree.io/f/tu-id-real" method="POST">
```

El proyecto ya incluye validación básica del formulario y un mensaje de confirmación visible en la interfaz.

## Publicación en GitHub Pages

1. Sube este proyecto a un repositorio de GitHub.
2. En el repositorio, entra a **Settings** > **Pages**.
3. Selecciona la rama principal (`main` o `master`) y la carpeta raíz (`/root`).
4. Guarda la configuración.
5. GitHub Pages te dará una URL pública del sitio.

## Notas adicionales

- La sección de proyectos reutiliza la API pública de GitHub para listar repositorios públicos.
- Si la API falla, el sitio muestra un mensaje elegante sin romper el diseño.
- El tema oscuro se activa con un botón en la esquina superior derecha.

## Contacto

- LinkedIn: https://linkedin.com/in/andrea-rivera-qa
- GitHub: https://github.com/ariveraandrea1-ctrl
- Correo: ariveraandrea1@gmail.com

# cffga.github.io

Página personal. Disponible en [cffga.github.io](https://cffga.github.io).

## Naturaleza del proyecto

Sitio estático de una sola página (SPA), construido con HTML, CSS y JavaScript puro, sin frameworks ni generadores de sitios estáticos. Se sirve directamente desde la rama `main` de este repositorio mediante **GitHub Pages**, con Jekyll desactivado (`.nojekyll`).

## Paradigma de contenido

El contenido de las secciones **Piezas sueltas**, **Notas**, **Proyectos**, **Programación** y **Material recomendado** se compone de:

- **Listas de entradas** definidas directamente en `index.html` (título, metadata, descripción breve).
- **Artículos en Markdown** (`.md`) almacenados en las carpetas correspondientes. Al hacer clic en el título de una entrada (con atributo `data-md`), el archivo Markdown se carga via `fetch()`, se renderiza con [marked](https://marked.js.org/), y se muestra en `#page-viewer` (un `.page` más dentro del SPA). Un botón "← Volver" oculta el visor y restaura la sección activa. Mientras carga, muestra "Cargando…". Si falla, muestra el mensaje de error.

## Estructura de directorios

```
/
├── index.html                  ← Página principal (SPA)
├── README.md
├── .nojekyll                   ← Desactiva Jekyll en GitHub Pages
│
├── piezas-sueltas/             ← Artículos de la sección "Piezas sueltas"
│   └── gestion-paquetes-arch.md
│
├── programacion/               ← Materiales de la sección "Programación"
│   └── lecciones_python/       ← Curso de Python (Quarto)
│       ├── _quarto.yml
│       ├── _site/              ← Sitio generado por Quarto
│       └── *.qmd               ← Lecciones en formato Quarto
│
├── proyectos/                  ← Artículos de la sección "Proyectos"
├── notas/                      ← Artículos de la sección "Notas"
└── material-recomendado/       ← Artículos de la sección "Material recomendado"
```

## Cómo agregar contenido nuevo

1. Crear el archivo `.md` en la carpeta correspondiente (`piezas-sueltas/`, `notas/`, etc.).
2. Agregar una entrada en `index.html` dentro de la sección correspondiente:
   ```html
   <li>
     <div class="entry-title" data-md="ruta/al/archivo.md">Título visible</div>
     <div class="entry-meta">Tema · Tipo</div>
     <div class="entry-desc">Descripción breve.</div>
   </li>
   ```
   El atributo `data-md` debe contener la ruta relativa al archivo Markdown desde la raíz del repositorio.
   El título (`entry-title`) recibe automáticamente cursor pointer y subrayado al hover gracias al selector `.entry-title[data-md]`.
3. Opcional: si el artículo tiene código, tablas o imágenes, el visor ya tiene estilos predefinidos para `pre`, `code`, `table`, `blockquote` e `img`.

## Secciones del sitio

| Sección | Carpeta | Descripción |
|---|---|---|
| Inicio | — | Página de presentación personal |
| Piezas sueltas | `piezas-sueltas/` | Textos propios sobre matemáticas y afines |
| Programación | `programacion/` | Materiales de programación en español |
| Proyectos | `proyectos/` | Proyectos de investigación y desarrollo |
| Notas | `notas/` | Apuntes de trabajo y textos en progreso |
| Material recomendado | `material-recomendado/` | Libros, videos y recursos externos |

## Mecánica del visor de artículos

El SPA tiene un `#page-viewer` oculto (clase `.page`) dentro de `<main>`. El flujo es:

1. Usuario hace clic en un título con `data-md`.
2. El listener de clic en `document` detecta el `data-md` con `e.target.closest('[data-md]')`.
3. `loadArticle(path)` actualiza la URL via `history.replaceState()` a `#/ruta/del/articulo.md`.
4. Si el artículo ya se cargó antes, se usa `articleCache[path]` (evita fetch repetido). Si no, se hace `fetch()`, se guarda en caché y se muestra.
5. `displayArticle()` esconde todas las `.page` y activa `#page-viewer`. `marked.parse(md)` convierte a HTML y se inyecta en `#article-content`.
6. `window.scrollTo(0, 0)` asegura que el artículo se vea desde el inicio.
7. "← Volver" llama `closeArticle()`: restaura la URL a `#seccion`, esconde `#page-viewer` y activa la sección que estaba activa.
8. Cambiar de sección (clic en navbar) también esconde el visor.

## Navegación por hash (URLs compartibles)

El sitio usa `location.hash` para que cada sección y artículo tenga su propia URL:

| URL | Abre |
|---|---|
| `https://cffga.github.io` | Inicio |
| `https://cffga.github.io#piezas` | Piezas sueltas |
| `https://cffga.github.io#programacion` | Programación |
| `https://cffga.github.io#/piezas-sueltas/gestion-paquetes-arch.md` | Artículo directamente |

- `showPage(id)` actualiza el hash con `history.replaceState(null, '', '#' + id)` (sin recargar ni disparar hashchange).
- `loadArticle(path)` actualiza el hash a `#/ruta/al/articulo.md`.
- El listener `hashchange` permite que los botones **atrás/adelante** del navegador naveguen correctamente entre secciones y artículos.
- Al cargar la página, si hay un hash en la URL, se navega automáticamente al destino correspondiente.

## Tecnología

- **Frontend**: HTML + CSS + JavaScript (vanilla)
- **Renderizado de Markdown**: [marked](https://marked.js.org/) via CDN
- **Cache de artículos**: en memoria (`articleCache{}`), evita fetch repetido del mismo `.md`
- **Enrutamiento**: por hash (`location.hash` + `history.replaceState`), soporta navegación atrás/adelante
- **Meta tags**: Open Graph (`og:title`, `og:description`, `og:url`, `og:type`) y Twitter Card para previsualización en redes sociales
- **Curso de Python**: [Quarto](https://quarto.org)
- **Servicio de hosting**: GitHub Pages (Jekyll desactivado)

# cffga.github.io

Página personal. Disponible en [cffga.github.io](https://cffga.github.io).

## Naturaleza del proyecto

Sitio estático de una sola página (SPA), construido con HTML, CSS y JavaScript puro, sin frameworks ni generadores de sitios estáticos. Se sirve directamente desde la rama `main` de este repositorio mediante **GitHub Pages**, con Jekyll desactivado (`.nojekyll`).

## Paradigma de contenido

El contenido de las secciones **Piezas sueltas**, **Notas**, **Proyectos**, **Programación** y **Material recomendado** se compone de:

- **Listas de entradas** definidas directamente en `index.html` (título, metadata, descripción breve).
- **Archivos** (`.md` o `.pdf`) almacenados en las carpetas correspondientes. Al hacer clic en el título de una entrada, el archivo se carga y se muestra en `#page-viewer` (un `.page` más dentro del SPA). El tipo se distingue por el atributo:
  - `data-md="ruta/al/archivo.md"` → se renderiza con [marked](https://marked.js.org/)
  - `data-pdf="ruta/al/archivo.pdf"` → se muestra con `<object>` nativo del navegador
- Un botón "← Volver" oculta el visor y restaura la sección activa. Mientras carga, muestra "Cargando…". Si falla, muestra el mensaje de error.

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

1. Crear el archivo `.md` (artículo) o `.pdf` (notas, papers) en la carpeta correspondiente.
2. Agregar una entrada en `index.html` dentro de la sección correspondiente:
   ```html
   <li>
     <div class="entry-title" data-md="ruta/al/archivo.md">Título visible</div>
     <div class="entry-meta">Tema · Tipo</div>
     <div class="entry-desc">Descripción breve.</div>
   </li>
   ```
   - Para artículos en Markdown, usa `data-md="ruta/al/archivo.md"`.
   - Para archivos PDF, usa `data-pdf="ruta/al/archivo.pdf"`.
   El título (`entry-title`) recibe automáticamente cursor pointer y subrayado al hover tanto con `data-md` como con `data-pdf`.
3. Opcional: si el artículo tiene código, tablas o imágenes, el visor ya tiene estilos predefinidos para `pre`, `code`, `table`, `blockquote` e `img`. Para PDFs, se renderiza con un `<object>` nativo que incluye barra de herramientas del navegador y opción de descarga.

## Secciones del sitio

| Sección | Carpeta | Descripción |
|---|---|---|
| Inicio | — | Página de presentación personal |
| Piezas sueltas | `piezas-sueltas/` | Textos propios sobre matemáticas y afines |
| Programación | `programacion/` | Materiales de programación en español |
| Proyectos | `proyectos/` | Proyectos de investigación y desarrollo |
| Notas | `notas/` | Apuntes de trabajo y textos en progreso |
| Material recomendado | `material-recomendado/` | Libros, videos y recursos externos |

## Mecánica del visor

El SPA tiene un `#page-viewer` oculto (clase `.page`) dentro de `<main>`. El flujo es:

1. Usuario hace clic en un título con `data-md` o `data-pdf`.
2. El listener de clic recorre ancestros con un `while` loop hasta encontrar un elemento con `data-md` o `data-pdf`.
3. `loadFile(path)` detecta la extensión del archivo y delega:
   - `.md` → `loadArticle(path)`
   - `.pdf` → `loadPdf(path)`
4. La URL se actualiza a `#/ruta/del/archivo` via `location.hash`.
5. Si es `.md` y ya se cargó antes, se usa `articleCache[path]` (evita fetch repetido). Si no, se hace `fetch()`.
6. Para `.md`: `marked.parse(md)` convierte a HTML. Para `.pdf`: se inyecta un `<object>` nativo (barra de herramientas, zoom, descarga).
7. `window.scrollTo(0, 0)` asegura que se vea desde el inicio.
8. "← Volver" llama `closeArticle()`: restaura la URL a `#seccion`, esconde `#page-viewer` y activa la sección que estaba activa.
9. Cambiar de sección (clic en navbar) también esconde el visor.

## Navegación por hash (URLs compartibles)

El sitio usa `location.hash` para que cada sección y artículo tenga su propia URL:

| URL | Abre |
|---|---|---|
| `https://cffga.github.io` | Inicio |
| `https://cffga.github.io#piezas` | Piezas sueltas |
| `https://cffga.github.io#programacion` | Programación |
| `https://cffga.github.io#/piezas-sueltas/gestion-paquetes-arch.md` | Artículo en Markdown |
| `https://cffga.github.io#/notas/notas-calculo-dif-varias-var.pdf` | PDF directamente |

- `showPage(id)` actualiza el hash con `location.hash`, con el flag `ignoreHash` para evitar bucles con el listener `hashchange`.
- `loadArticle(path)` y `loadPdf(path)` actualizan el hash a `#/ruta/al/archivo`.
- El listener `hashchange` permite que los botones **atrás/adelante** del navegador naveguen correctamente entre secciones y artículos.
- Al cargar la página, si hay un hash en la URL, se navega automáticamente al destino correspondiente.

## Tecnología

- **Frontend**: HTML + CSS + JavaScript (vanilla)
- **Renderizado de Markdown**: [marked](https://marked.js.org/) via CDN
- **Cache de artículos**: en memoria (`articleCache{}`), evita fetch repetido del mismo archivo `.md`
- **Visor de PDFs**: vía `<object>` nativo del navegador (barra de herramientas, zoom, descarga)
- **Enrutamiento**: por hash (`location.hash` + `history.replaceState`), soporta navegación atrás/adelante
- **Meta tags**: Open Graph (`og:title`, `og:description`, `og:url`, `og:type`) y Twitter Card para previsualización en redes sociales
- **Curso de Python**: [Quarto](https://quarto.org)
- **Servicio de hosting**: GitHub Pages (Jekyll desactivado)

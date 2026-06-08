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
│   ├── gestion-paquetes-arch.md
│   └── tesis-cohomologia.pdf
│
├── programacion/               ← Materiales de la sección "Programación"
│   └── lecciones_python/       ← Curso de Python (Quarto)
│       ├── _quarto.yml
│       ├── _site/              ← Sitio generado por Quarto
│       └── *.qmd               ← Lecciones en formato Quarto
│
├── proyectos/                  ← Artículos de la sección "Proyectos"
│   └── isl-esp/                ← ISL — Introducción al Aprendizaje Estadístico (Quarto)
│       ├── index.html          ← Redirección → _site/
│       ├── _quarto.yml
│       ├── index.qmd
│       ├── chapters/           ← 13 capítulos traducidos
│       ├── Figures/            ← Figuras originales del libro
│       └── _site/              ← Sitio generado por Quarto
├── notas/                      ← Artículos de la sección "Notas"
│   └── notas-calculo-dif-varias-var.pdf
└── material-recomendado/       ← Artículos de la sección "Material recomendado" (vacía)
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
| Proyectos | `proyectos/` | Proyectos de investigación y desarrollo ([ISL](README.md#isl--introducción-al-aprendizaje-estadístico)) |
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
- **Enrutamiento**: por hash (`location.hash` + flag `ignoreHash`), soporta navegación atrás/adelante
- **Meta tags**: Open Graph (`og:title`, `og:description`, `og:url`, `og:type`) y Twitter Card para previsualización en redes sociales
- **Meta description**: `<meta name="description">` controla el texto que aparece en resultados de búsqueda de Google
- **Curso de Python**: [Quarto](https://quarto.org)
- **Traducción ISL**: [Quarto](https://quarto.org)
- **Servicio de hosting**: GitHub Pages (Jekyll desactivado)

## Tipos de entrada en las listas

Además de `data-md` y `data-pdf`, una entrada puede no tener atributo de archivo y ser solo texto informativo:

```html
<li>
  <span class="entry-title">Muestreo aleatorio simple (MAS)</span>
  <div class="entry-meta">Estadística · Tema</div>
  <div class="entry-desc">Descripción sin archivo asociado.</div>
</li>
```

En ese caso no hay clic ni visor — solo se muestra la información. Usar `span` en vez de `div.entry-title` cuando no haya archivo (para evitar `cursor: pointer`).

## Clases CSS principales

| Clase | Ubicación | Propósito |
|---|---|---|
| `.page` | `<section>` o `<div>` dentro de `<main>` | Cada sección y el visor son `.page`. Se ocultan por defecto. |
| `.page.active` | — | La sección visible recibe esta clase (`display: block`). |
| `#page-viewer` | `<div class="page">` dentro de `<main>` | Visor de artículos y PDFs. Contiene un `#article-content` y un botón "← Volver". |
| `.page-nav` | `<nav>` dentro de cada `.page` | Barra superior con el botón de retroceso. |
| `.entry-list` | `<ul>` dentro de las secciones | Lista de entradas. Sin viñetas, con separación entre ítems. |
| `.entry-title` | `<div>` dentro de cada `<li>` | Título cliqueable. `cursor: pointer` si tiene `data-md` o `data-pdf`. |
| `.entry-meta` | `<div>` dentro de cada `<li>` | Metadatos (tema, tipo, fecha). |
| `.entry-desc` | `<div>` dentro de cada `<li>` | Descripción breve del contenido. |

## Funciones JavaScript principales

| Función | Rol |
|---|---|
| `showPage(id, el)` | Muestra la sección `id` y oculta las demás. Actualiza el hash. |
| `loadFile(path)` | Detecta extensión y llama a `loadArticle` o `loadPdf`. |
| `loadArticle(path)` | Fetch + cache + `marked.parse()` → inyecta en `#article-content`. |
| `loadPdf(path)` | Inyecta `<object>` con el PDF en `#article-content`. |
| `closeArticle()` | Oculta `#page-viewer`, restaura el hash a la sección activa. |
| `navigate()` | Listener de `hashchange`: decide si mostrar sección, artículo o PDF. |

Variables globales: `ignoreHash` (evita bucles entre `showPage`/`loadFile` y `hashchange`), `articleCache` (caché en memoria de archivos `.md`).

## Nav links

Cada enlace en la navbar necesita dos cosas:

```html
<a href="#piezas" onclick="showPage('piezas', this)">Piezas sueltas</a>
```

- `href="#seccion"` permite navegación directa por URL.
- `onclick="showPage('seccion', this)"` maneja el cambio de sección sin recargar.
- La función `showPage` también oculta el visor si estaba abierto.

## ISL — Introducción al Aprendizaje Estadístico

### Descripción

Traducción al español del libro **An Introduction to Statistical Learning with Applications in Python (ISLP)** de James, Witten, Hastie, Tibshirani y Taylor. El sitio completo de la traducción está disponible en:

[https://cffga.github.io/proyectos/isl-esp/](https://cffga.github.io/proyectos/isl-esp/)

La URL redirige automáticamente a `proyectos/isl-esp/_site/` mediante el archivo `index.html` que contiene un `<meta http-equiv="refresh">`.

### Estructura

```
proyectos/isl-esp/
├── index.html                  ← Redirección → _site/
├── index.qmd                   ← Portada del libro
├── _quarto.yml                 ← Configuración del sitio Quarto
├── custom.scss                 ← Estilos personalizados
├── PROGRESS.md                 ← Bitácora del proyecto
├── README.md                   ← Documentación del proyecto
├── .gitignore                  ← Ignora _freeze/, .quarto/, __pycache__/
├── chapters/                   ← 13 capítulos en formato .qmd
│   ├── 00-prefacio/
│   ├── 01-introduccion/
│   ├── 02-aprendizaje-estadistico/
│   ├── ...
│   └── 13-pruebas-multiples/
├── Figures/                    ← Figuras originales del libro (PDF + PNG)
├── environment.yml             ← Entorno Conda
└── _site/                      ← Sitio compilado (HTML generado por Quarto)
```

### Cómo actualizar

1. Editar los archivos fuente (`.qmd`) en `chapters/` o la portada `index.qmd`, la bitácora `PROGRESS.md`, etc.
2. Recompilar el sitio:
   ```bash
   quarto render
   ```
3. Commitear y pushear:
   ```bash
   git add -A
   git commit -m "Actualiza traducción ISL"
   git push
   ```

### Notas

- **Traducción**: solo cubre el texto explicativo. Los laboratorios y ejercicios no están traducidos. Cada capítulo incluye un enlace a los repositorios oficiales de ISLP.
- **Figuras**: se trackean tanto los PDF originales como los PNG generados (~58 MB). Los PDF están en `Figures/ChapterX/` y los PNG en `Figures/ChapterX/png/`.
- **`_site/`**: se trackea en git (~37 MB) para que GitHub Pages sirva el contenido directamente.
- **`_freeze/`**: se ignora (se regenera con `quarto render`).
- **Calidad**: se realizó una revisión exhaustiva de la traducción en todos los capítulos. Calificación general: Excelente. Se corrigieron errores puntuales en capítulos 4 y 5.

## Flujo de trabajo (Git)

```bash
git add -A                           # agregar archivos nuevos y modificados
git commit -m "mensaje descriptivo"  # commit
git push                             # despliegue automático a GitHub Pages
```

- GitHub Pages despliega desde `main`. Los cambios tardan ~30 s – 2 min en reflejarse.
- El archivo `.nojekyll` evita que Jekyll filtre rutas con `_`.
- No usar `git push --force` a menos que sepas lo que haces.

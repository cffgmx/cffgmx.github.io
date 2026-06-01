# cffga.github.io

Página personal. Disponible en [cffga.github.io](https://cffga.github.io).

## Naturaleza del proyecto

Sitio estático de una sola página (SPA), construido con HTML, CSS y JavaScript puro, sin frameworks ni generadores de sitios estáticos. Se sirve directamente desde la rama `main` de este repositorio mediante **GitHub Pages**, con Jekyll desactivado (`.nojekyll`).

## Paradigma de contenido

El contenido de las secciones **Piezas sueltas**, **Notas**, **Proyectos**, **Programación** y **Material recomendado** se compone de:

- **Listas de entradas** definidas directamente en `index.html` (título, metadata, descripción breve).
- **Artículos en Markdown** (`.md`) almacenados en las carpetas correspondientes. Al hacer clic en el título de una entrada, el archivo Markdown se carga y renderiza a HTML en el cliente mediante la librería [marked](https://marked.js.org/), mostrándose en un visor integrado en la misma página sin recarga. Un botón "← Volver" regresa a la lista de la sección activa.

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

## Secciones del sitio

| Sección | Carpeta | Descripción |
|---|---|---|
| Inicio | — | Página de presentación personal |
| Piezas sueltas | `piezas-sueltas/` | Textos propios sobre matemáticas y afines |
| Programación | `programacion/` | Materiales de programación en español |
| Proyectos | `proyectos/` | Proyectos de investigación y desarrollo |
| Notas | `notas/` | Apuntes de trabajo y textos en progreso |
| Material recomendado | `material-recomendado/` | Libros, videos y recursos externos |

## Tecnología

- **Frontend**: HTML + CSS + JavaScript (vanilla)
- **Renderizado de Markdown**: [marked](https://marked.js.org/) via CDN
- **Curso de Python**: [Quarto](https://quarto.org)
- **Servicio de hosting**: GitHub Pages (Jekyll desactivado)

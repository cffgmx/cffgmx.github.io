# cffga.github.io

Página personal [cffga.github.io](https://cffga.github.io). Sitio estático de una sola página (SPA) servido desde `main` mediante GitHub Pages con Jekyll desactivado (`.nojekyll`).

## Estructura

```
/
├── index.html                  ← Página principal (SPA)
├── favicon.png                 ← Icono de pestaña (murciélago de Escher, fondo transp.)
├── .nojekyll
│
├── piezas-sueltas/             ← Artículos y escritos personales
├── programacion/
│   └── lecciones_python/       ← Curso de Python (Quarto)
├── proyectos/
│   └── isl-esp/                ← Traducción ISL (Quarto)
│       ├── _quarto.yml
│       ├── index.qmd           ← Portada del libro
│       ├── chapters/           ← 13 capítulos traducidos
│       ├── Figures/            ← Figuras originales (PDF + PNG)
│       ├── PROGRESS.md         ← Bitácora del proyecto
│       ├── environment.yml     ← Entorno Conda para compilar
│       ├── favicon.png         ← Copia local para Quarto
│       └── _site/              ← Sitio compilado (trackeado)
├── notas/
└── material-recomendado/
```

## Gestión del SPA (sitio personal)

### Agregar contenido a una sección existente

Las secciones (Piezas sueltas, Programación, Proyectos, Notas, etc.) son listas definidas en `index.html` dentro de `<ul class="entry-list">`. Para agregar una entrada:

```html
<li>
  <div class="entry-title" data-md="ruta/al/archivo.md">Título</div>
  <div class="entry-meta">Tema · Tipo</div>
  <div class="entry-desc">Descripción breve.</div>
</li>
```

| Atributo | Comportamiento |
|---|---|
| `data-md="ruta/al/archivo.md"` | Renderiza Markdown con marked.js |
| `data-pdf="ruta/al/archivo.pdf"` | Muestra PDF con visor nativo |
| Sin atributo | Entrada informativa (usar `<span>` en vez de `<div>`) |

Para abrir un enlace externo en nueva pestaña, usa `<a href="..." target="_blank">`.

### Crear una sección nueva

1. Añadir en el navbar (`<nav>`) dentro de `index.html`:
   ```html
   <li><a href="#nueva-seccion" onclick="showPage('nueva-seccion', this)">Mi sección</a></li>
   ```
2. Añadir el contenedor de la página:
   ```html
   <div id="page-nueva-seccion" class="page">
     <div class="page-header">
       <h1>Mi sección</h1>
     </div>
     <ul class="entry-list">
       <!-- entradas aquí -->
     </ul>
   </div>
   ```

### Favicon

El archivo `favicon.png` (32×32, RGBA con fondo transparente) se referencia desde `<head>` del `index.html` principal. Para actualizarlo:

1. Reemplazar `favicon.png` (usar misma resolución y formato)
2. Commitear y pushear
3. Si el navegador no lo actualiza, forzar recarga (`Ctrl+F5`) o cambiar el query param en el `<link>`:

```html
<link rel="icon" type="image/png" href="favicon.png?v=2">
```

Los proyectos Quarto (ISL, curso Python) tienen su propia copia de `favicon.png` y lo configuran en `_quarto.yml` con `favicon: favicon.png` bajo `website:`. Al hacer `quarto render`, Quarto lo copia automáticamente a `_site/`.

## Gestión de proyectos Quarto

El sitio incluye dos proyectos construidos con [Quarto](https://quarto.org/):

| Proyecto | Directorio | URL |
|---|---|---|
| Curso de Python | `programacion/lecciones_python/` | `.../lecciones_python/_site/` |
| Traducción ISL | `proyectos/isl-esp/` | `.../isl-esp/_site/` |

### Requisitos

- Quarto >= 1.4
- Python >= 3.12
- Entorno Conda compartido (ambos proyectos usan el mismo):
  ```bash
  conda env create -f proyectos/isl-esp/environment.yml
  conda activate ISL
  ```

### Cómo actualizar (cualquier proyecto Quarto)

```bash
conda activate ISL
cd <directorio-del-proyecto>
quarto render
git add -A && git commit -m "Actualiza <proyecto>" && git push
```

**Nota**: cada proyecto se renderiza por separado. Si modificas ISL y el curso Python, ejecuta `quarto render` en cada uno.

### Detalles técnicos (aplican a ambos)

| Aspecto | Explicación |
|---|---|
| `_site/` trackeado | Se trackea deliberadamente para que GitHub Pages sirva el contenido. Sin CI/CD, es necesario. |
| URL con `_site/` | Se accede directamente al subdirectorio `_site/`. Quarto elimina cualquier `index.html` en la raíz del proyecto durante el render. |
| `.gitignore` | En ISL se modificó: se eliminaron `_site/` y `*.pdf` del ignore original para trackearlos. |
| `_freeze/` | Cache de ejecución de Quarto. Se ignora en git, se regenera con `quarto render`. |
| Favicon | Cada proyecto tiene su copia de `favicon.png`; configurado en `_quarto.yml` bajo `website: favicon:`. Quarto lo copia a `_site/` automáticamente. |

## Despliegue

```bash
git add -A
git commit -m "mensaje"
git push
```

GitHub Pages despliega desde `main`. Los cambios tardan ~30 s – 2 min en reflejarse.

## Solución de problemas

| Problema | Causa probable | Solución |
|---|---|---|
| `quarto render` falla con "Jupyter no disponible" | Falta `nbformat` o Jupyter en el Python que usa Quarto | Activar el entorno ISL: `conda activate ISL` y volver a ejecutar |
| 404 en `.../_site/` | `_site/` fue eliminado (git limpió archivos no trackeados o commit previo lo borró) | Ejecutar `quarto render` para regenerarlo |
| El favicon no se actualiza en el navegador | Caché del navegador (los favicons se cachean agresivamente) | `Ctrl+F5` o abrir `favicon.png` directamente y forzar recarga |
| `git push` rechazado | La rama `main` está protegida o hay cambios remotos | `git pull --rebase && git push` |

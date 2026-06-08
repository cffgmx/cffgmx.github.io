# ISL — Introducción al Aprendizaje Estadístico

Traducción al español del libro **An Introduction to Statistical Learning with Applications in Python (ISLP)** de Gareth James, Daniela Witten, Trevor Hastie, Robert Tibshirani y Jonathan Taylor.

Este proyecto genera un sitio web estático con Quarto que contiene la traducción al español del libro, incluyendo todas las figuras originales del libro. Los laboratorios prácticos con código y los ejercicios no se incluyen en el sitio; en su lugar, se redirige al lector a las fuentes oficiales.

Consulta [`PROGRESS.md`](PROGRESS.md) para ver el estado actual de cada capítulo.

> **Nota sobre la traducción**: se ha realizado una revisión exhaustiva de la calidad de la traducción en todos los capítulos. La traducción es de calidad profesional, con terminología consistente y español natural. Se corrigieron errores puntuales en los capítulos 4 (términos técnicos) y 5 (terminología estándar). Ver [`PROGRESS.md`](PROGRESS.md) para más detalles.

## Estructura del proyecto

```
ISL_esp/
├── _quarto.yml                  # Configuración global del sitio
├── index.qmd                    # Portada
├── custom.scss                  # Estilos personalizados
├── environment.yml              # Especificación del entorno Conda
├── .github/workflows/deploy.yml # Deploy automático a GitHub Pages
├── README.md                    # Este archivo
├── PROGRESS.md                  # Progreso detallado (se actualiza por capítulo)
├── Figures/                     # Figuras originales del libro
│   ├── Chapter1/                #   Cap. 1 (PDF + PNG)
│   ├── Chapter2/                #   Cap. 2 (PDF + PNG)
│   ├── Chapter3/                #   Cap. 3 (PDF + PNG)
│   └── ...
├── chapters/
│   ├── 00-prefacio/             # Prefacio
│   ├── 01-introduccion/         # Cap. 1 — Introducción
│   ├── 02-aprendizaje-estadistico/ # Cap. 2 — Aprendizaje Estadístico
│   ├── 03-regresion-lineal/
│   ├── 04-clasificacion/
│   ├── 05-metodos-remuestreo/
│   ├── 06-seleccion-modelos/
│   ├── 07-mas-alla-linealidad/
│   ├── 08-arboles-decision/
│   ├── 09-svm/
│   ├── 10-aprendizaje-profundo/
│   ├── 11-analisis-supervivencia/
│   ├── 12-aprendizaje-no-supervisado/
│   └── 13-pruebas-multiples/
├── _site/                       # Sitio generado (no trackeado)
└── _freeze/                     # Cache de ejecución (no trackeado)
```

Cada capítulo es un archivo `chapters/XX-tema/index.qmd` que contiene:
- El texto traducido al español
- Figuras originales del libro en formato PNG desde `Figures/ChapterX/png/`
- Al final, un enlace a los laboratorios oficiales del libro

> **Nota**: Los laboratorios prácticos con código Python no se incluyen en este sitio.  
> Puedes encontrarlos en el sitio oficial del libro: [statlearning.com](https://www.statlearning.com){target="_blank"}  
> y en el repositorio oficial de ISLP: [ISLP en GitHub](https://github.com/intro-stat-learning/ISLP_labs){target="_blank"}

## Requisitos

- [Quarto](https://quarto.org/) >= 1.9
- Python >= 3.12 con los siguientes paquetes:
  - `islp` — datasets y utilidades del libro
  - `matplotlib`, `seaborn` — gráficos
  - `pandas`, `numpy`, `scipy` — manipulación de datos
  - `statsmodels`, `scikit-learn` — modelos estadísticos
  - `jupyter`, `nbformat` — ejecución de celdas Python en Quarto

## Cómo construir el sitio

```bash
conda env create -f environment.yml
conda activate ISL
quarto render
```

El sitio generado estará en `_site/`. Para vista previa:

```bash
quarto preview
```

## Cómo contribuir

Ver [`PROGRESS.md`](PROGRESS.md) para el estado actual y los capítulos pendientes.

### Traducir un nuevo capítulo

1. Lee el capítulo original del libro
2. Crea o edita `chapters/XX-tema/index.qmd`:
   - YAML frontmatter con `title` en español
   - Texto traducido en markdown
   - Figuras referenciadas desde `Figures/ChapterX/png/` con formato:
     ```markdown
     ![Descripción en español](../../Figures/ChapterX/X_Y.png){#fig-label width=60%}
     ```
3. Al final del capítulo, agrega un enlace a los laboratorios oficiales si aplica
4. Renderiza para verificar: `quarto render`

## Despliegue

El workflow de GitHub Actions (`.github/workflows/deploy.yml`) construye y publica automáticamente en GitHub Pages.

## Licencia

El libro original es © Springer Nature Switzerland AG 2023. Esta traducción es un proyecto comunitario sin fines de lucro.

# Progreso del Proyecto

> Traducción al español de **An Introduction to Statistical Learning with Applications in Python (ISLP)**.

## Resumen

| Capítulo | Estado | Figuras | Laboratorio | Notas |
|----------|--------|---------|-------------|-------|
| Prefacio | ✅ Completado | — | — | Texto traducido |
| 1. Introducción | ✅ Completado | 4/4 | — | Figs 1.1–1.4 |
| 2. Aprendizaje Estadístico | ✅ Completado | 17/17 | Externo | Figs 2.1–2.17 |
| 3. Regresión Lineal | ✅ Completado | 20/20 | Externo | Figs 3.1–3.20 |
| 4. Clasificación | ✅ Completado | 17/17 | Externo | Figs 4.1–4.15 |
| 5. Métodos de Remuestreo | ✅ Completado | 11/11 | Externo | Figs 5.1–5.11 |
| 6. Selección de Modelos | ✅ Completado | 24/24 | Externo | Figs 6.1–6.24 |
| 7. Más Allá de la Linealidad | ✅ Completado | 14/14 | Externo | Figs 7.1–7.14 |
| 8. Árboles de Decisión | ✅ Completado | 17/17 | Externo | Figs 8.1–8.14 |
| 9. SVM | ✅ Completado | 12/12 | Externo | Figs 9.1–9.12 |
| 10. Aprendizaje Profundo | ✅ Completado | 29/29 | Externo | Figs 10.1–10.21 |
| 11. Análisis de Supervivencia | ✅ Completado | 9/9 | Externo | Figs 11.1–11.9 |
| 12. Aprendizaje No Supervisado | ✅ Completado | 20/20 | Externo | Figs 12.1–12.19 |
| 13. Pruebas Múltiples | ✅ Completado | 11/11 | Externo | Figs 13.1–13.11 |

**Total:** 14/14 capítulos completados, ~204 figuras. ¡Proyecto completo!

---

## Detalle por Capítulo

### Prefacio
- [x] Traducción completa del texto
- [x] Sin figuras ni código

### Capítulo 1: Introducción
- [x] Traducción completa del texto
- [x] Figura 1.1 — Datos Wage (3 paneles: edad, año, educación)
- [x] Figura 1.2 — Datos Smarket (boxplots por lag)
- [x] Figura 1.3 — QDA Smarket (boxplot probabilidades)
- [x] Figura 1.4 — NCI60 (PCA + clustering)
- [x] Colores fieles al libro ISLP (puntos negros, líneas azules)

### Capítulo 2: Aprendizaje Estadístico
- [x] Traducción completa del texto
- [x] Sección 2.1.1 — ¿Por qué estimar f? (predicción e inferencia)
- [x] Sección 2.1.2 — ¿Cómo estimamos f? (paramétrico, no paramétrico)
- [x] Sección 2.1.3 — Compromiso precisión vs interpretabilidad
- [x] Sección 2.1.4 — Supervisado vs no supervisado
- [x] Sección 2.1.5 — Regresión vs clasificación
- [x] Sección 2.2 — Evaluación de precisión del modelo
- [x] Laboratorio: referencia a fuentes oficiales (statlearning.com)
- [x] Figura 2.1 — Advertising (TV, radio, periódico)
- [x] Figura 2.2 — Income (observaciones + función subyacente)
- [x] Figura 2.3 — Income 3D (educación + antigüedad)
- [x] Figura 2.4 — Income ajuste lineal 3D
- [x] Figura 2.5 — Income thin-plate spline suave
- [x] Figura 2.6 — Income thin-plate spline rugoso
- [x] Figura 2.7 — Compromiso flexibilidad-interpretabilidad
- [x] Figura 2.8 — Clustering (2 grupos)
- [x] Figura 2.9 — MSE simulación
- [x] Figura 2.10 — MSE con f lineal
- [x] Figura 2.11 — MSE con f no lineal
- [x] Figura 2.12 — Sesgo-varianza
- [x] Figura 2.13 — Clasificación datos simulados
- [x] Figura 2.14 — Clasificador de Bayes
- [x] Figura 2.15 — KNN (ilustración)
- [x] Figura 2.16 — KNN frontera decisión
- [x] Figura 2.17 — KNN error entrenamiento/prueba

---

## Convenciones y Estilo

- **Puntos en gráficos**: `c='black', alpha=0.3, s=5, edgecolors='none'`
- **Líneas de ajuste**: `'b-'` (azul), `linewidth=2`
- **Boxplots**: `facecolor='white', color='black'`, medianas en azul
- **Figuras multi-panel**: `layout='constrained'`, `sharey=True`
- **Etiquetas y títulos**: siempre en español
- **Referencias**: `@fig-label` para figuras, `@eq-label` para ecuaciones
- **Ecuaciones**: `$$...$$` con `\tag{2.1}` para numeración
- **Laboratorios**: no se incluyen. Se redirige al lector al sitio oficial del libro (<https://www.statlearning.com>) y al repositorio de ISLP (<https://github.com/intro-stat-learning/ISLP>).
- **Ancho de figuras**: 60% para figuras simples, 40% para paneles dobles laterales.

### Capítulo 3: Regresión Lineal
- [x] Traducción completa del texto (~65 páginas)
- [x] Sección 3.1 — Regresión Lineal Simple (3.1.1–3.1.3)
- [x] Sección 3.2 — Regresión Lineal Múltiple (3.2.1–3.2.2)
- [x] Sección 3.3 — Otras Consideraciones (3.3.1–3.3.3: predictores cualitativos, extensiones, problemas potenciales)
- [x] Sección 3.4 — El Plan de Marketing
- [x] Sección 3.5 — Comparación con KNN
- [x] 20 figuras originales del libro (Figs 3.1–3.20) en `Figures/Chapter3/`
- [x] Laboratorio: referencia a fuentes oficiales (statlearning.com)

### Capítulo 4: Clasificación
- [x] Traducción completa del texto (~60 páginas)
- [x] Sección 4.1 — Visión General de la Clasificación
- [x] Sección 4.2 — ¿Por Qué No Regresión Lineal?
- [x] Sección 4.3 — Regresión Logística (4.3.1–4.3.5: modelo logístico, estimación EMV, predicciones, regresión múltiple, multinomial)
- [x] Sección 4.4 — Modelos Generativos para Clasificación (4.4.1–4.4.4: Bayes, LDA univariado, LDA multivariado, QDA, Naive Bayes)
- [x] Sección 4.5 — Comparación de Métodos de Clasificación (curvas ROC, AUC)
- [x] 17 figuras originales del libro (Figs 4.1–4.15) convertidas a PNG
- [x] Laboratorio: referencia a fuentes oficiales (statlearning.com)

### Capítulo 5: Métodos de Remuestreo
- [x] Traducción completa del texto
- [x] Sección 5.1 — Validación Cruzada (5.1.1–5.1.5: conjunto de validación, LOOCV, k-fold CV, sesgo-varianza, clasificación)
- [x] Sección 5.2 — El Bootstrap
- [x] 11 figuras originales del libro (Figs 5.1–5.11) convertidas a PNG
- [x] Laboratorio: referencia a fuentes oficiales (statlearning.com)

### Capítulo 6: Selección de Modelos Lineales y Regularización
- [x] Traducción completa del texto
- [x] Sección 6.1 — Selección de Subconjuntos (6.1.1–6.1.3: mejor subconjunto, paso a paso, criterios de elección)
- [x] Sección 6.2 — Métodos de Regularización (6.2.1–6.2.3: ridge, lasso, selección de $\lambda$)
- [x] Sección 6.3 — Reducción de Dimensionalidad (6.3.1–6.3.2: PCR, PLS)
- [x] Sección 6.4 — Consideraciones en Altas Dimensiones
- [x] 24 figuras originales del libro (Figs 6.1–6.24) convertidas a PNG
- [x] Laboratorio: referencia a fuentes oficiales (statlearning.com)

### Capítulo 7: Más Allá de la Linealidad
- [x] Traducción completa del texto
- [x] Sección 7.1 — Regresión Polinomial
- [x] Sección 7.2 — Funciones Escalón
- [x] Sección 7.3 — Funciones Base
- [x] Sección 7.4 — Splines de Regresión (7.4.1–7.4.5: polinomios por partes, restricciones, base B-spline, nodos, comparación)
- [x] Sección 7.5 — Splines de Suavizado (7.5.1–7.5.2: definición, selección de $\lambda$)
- [x] Sección 7.6 — Regresión Local
- [x] Sección 7.7 — GAMs (7.7.1: regresión, 7.7.2: clasificación)
- [x] 14 figuras originales del libro (Figs 7.1–7.14) convertidas a PNG
- [x] Laboratorio: referencia a fuentes oficiales (statlearning.com)

### Capítulo 8: Métodos Basados en Árboles
- [x] Traducción completa del texto
- [x] Sección 8.1 — Árboles de Regresión (particionamiento recursivo, poda)
- [x] Sección 8.2 — Árboles de Clasificación (Gini, entropía)
- [x] Sección 8.3 — Bagging
- [x] Sección 8.4 — Bosques Aleatorios
- [x] Sección 8.5 — Boosting
- [x] 17 figuras originales del libro (Figs 8.1–8.14) convertidas a PNG
- [x] Laboratorio: referencia a fuentes oficiales (statlearning.com)

### Capítulo 9: Máquinas de Vectores de Soporte
- [x] Traducción completa del texto
- [x] Sección 9.1 — Clasificador de Máximo Margen (hiperplano separador, margen)
- [x] Sección 9.2 — Clasificador de Vectores de Soporte (margen suave, parámetro $C$)
- [x] Sección 9.3 — SVM con Kernels (RBF, polinomial, parámetro $\gamma$)
- [x] Sección 9.4 — SVM multiclase y relaciones con otros métodos
- [x] 12 figuras originales del libro (Figs 9.1–9.12) convertidas a PNG
- [x] Laboratorio: referencia a fuentes oficiales (statlearning.com)

### Capítulo 10: Aprendizaje Profundo
- [x] Traducción completa del texto
- [x] Sección 10.1 — Redes Neuronales Simples (arquitectura, activaciones, XOR, entrenamiento)
- [x] Sección 10.2 — Redes Convolucionales (CNN: convolución, pooling, aumento de datos, visualización)
- [x] Sección 10.3 — Redes Recurrentes (RNN, LSTM)
- [x] Sección 10.4 — Autoencoders y VAE
- [x] Sección 10.5 — GANs
- [x] Sección 10.6 — Aprendizaje por Transferencia
- [x] Sección 10.7 — Atención y Transformers
- [x] 29 figuras originales del libro (Figs 10.1–10.21) convertidas a PNG
- [x] Laboratorio: referencia a fuentes oficiales (statlearning.com)

### Capítulo 11: Análisis de Supervivencia y Datos Censurados
- [x] Traducción completa del texto
- [x] Sección 11.1 — Datos de Supervivencia y Censura
- [x] Sección 11.2 — Estimador de Kaplan--Meier
- [x] Sección 11.3 — Regresión de Cox (riesgos proporcionales, hazard ratio)
- [x] Sección 11.4 — Extensiones (riesgos no proporcionales, estratificación)
- [x] Sección 11.5 — Árboles y Bosques Aleatorios de Supervivencia
- [x] Sección 11.6 — Aprendizaje Profundo para Supervivencia
- [x] 9 figuras originales del libro (Figs 11.1–11.9) convertidas a PNG
- [x] Laboratorio: referencia a fuentes oficiales (statlearning.com)

### Capítulo 12: Aprendizaje No Supervisado
- [x] Traducción completa del texto
- [x] Sección 12.1 — PCA (componentes principales, scree plot, biplot, NCI60)
- [x] Sección 12.2 — Clustering (K-means, jerárquico, dendrograma, enlaces)
- [x] Sección 12.3 — Temas avanzados (alta dimensión, visualización, t-SNE)
- [x] 20 figuras originales del libro (Figs 12.1–12.19) convertidas a PNG
- [x] Laboratorio: referencia a fuentes oficiales (statlearning.com)

### Capítulo 13: Pruebas Múltiples
- [x] Traducción completa del texto
- [x] Sección 13.1 — El Problema de las Pruebas Múltiples (FWER, FDR)
- [x] Sección 13.2 — Corrección de Bonferroni y Holm
- [x] Sección 13.3 — Procedimiento de Benjamini--Hochberg
- [x] Sección 13.4 — Aplicaciones Genómicas (volcano plot, Manhattan plot, GWAS)
- [x] Sección 13.5 — Valores $p$ ajustados y dependencia entre pruebas
- [x] 11 figuras originales del libro (Figs 13.1–13.11) convertidas a PNG
- [x] Laboratorio: referencia a fuentes oficiales (statlearning.com)

## Nota sobre las Figuras

A partir del 7 de junio de 2026, **todas las figuras de los Capítulos 1–3 se han reemplazado por las originales del libro**. Los PDF originales están en `Figures/ChapterX/` y se convirtieron a PNG (200 DPI, PyMuPDF) en `Figures/ChapterX/png/` porque los visores de PDF embebidos no funcionan de forma fiable en todos los navegadores. Las referencias en los QMD apuntan a los PNG. Ya no se genera código Python para las figuras. Esto reduce el tiempo de compilación y garantiza fidelidad absoluta con la obra original.

## Historial de Cambios

| Fecha | Cambio |
|-------|--------|
| 2026-06-07 | Reemplazo: todas las figuras de Ch1–3 por originales del libro |
| 2026-06-07 | Capítulo 3 completado (traducción + 20 figuras + lab completo) |
| 2026-06-07 | Capítulo 2 completado (traducción + 16 figuras) |
| 2026-06-07 | Capítulo 1 completado (traducción + 4 figuras, corrección solapamiento) |
| 2026-06-07 | Prefacio + estructura inicial del proyecto |
| 2026-06-07 | Conversión: todas las figuras a PNG 200 DPI (PyMuPDF), ya que los PDF no se renderizan embebidos |
| 2026-06-07 | Arreglo: `@fig-advertising` (definido en Cap. 2) roto en Cap. 3 — reemplazado por texto plano "Figura 2.1" |
| 2026-06-07 | Capítulo 4 completado: traducción + 17 figuras (PNG) + lab completo (Smarket + Caravan) |
| 2026-06-07 | Capítulo 5 completado: traducción + 11 figuras (PNG) + lab (validación cruzada + bootstrap) |
| 2026-06-07 | Decisión: se eliminan los laboratorios de todos los capítulos. Se reemplazan por referencias a las fuentes oficiales (statlearning.com, GitHub) |
| 2026-06-07 | Capítulo 6 completado: traducción + 24 figuras (PNG) + lab externo |
| 2026-06-07 | Capítulo 7 completado: traducción + 14 figuras (PNG) + lab externo |
| 2026-06-07 | Capítulo 8 completado: traducción + 17 figuras (PNG) + lab externo |
| 2026-06-07 | Capítulo 9 completado: traducción + 12 figuras (PNG) + lab externo |
| 2026-06-07 | Capítulo 10 completado: traducción + 29 figuras (PNG/JPG) + lab externo |
| 2026-06-07 | Capítulo 11 completado: traducción + 9 figuras (PNG) + lab externo |
| 2026-06-07 | Capítulo 12 completado: traducción + 20 figuras (PNG) + lab externo |
| 2026-06-07 | Capítulo 13 completado: traducción + 11 figuras (PNG) + lab externo |
| 2026-06-07 | **¡Proyecto completo!** Los 14 capítulos + prefacio están traducidos e integrados en el sitio Quarto. |
| 2026-06-07 | Revisión de calidad de traducción en todos los capítulos (resultado: Excelente). Correcciones en Cap. 4: `Precisión` → `Exactitud` para Accuracy, `MLE` → `EMV`, `jittereados` → `con dispersión aleatoria`, unificación `multivariado` → `multivariante`. Corrección en Cap. 5: `k Iteraciones` → `k Pliegues`. Actualización de portada con sección informativa. |

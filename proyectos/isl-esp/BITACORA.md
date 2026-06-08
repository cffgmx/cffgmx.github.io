# Bitácora

## 2026-06-07 — Sesión 1: Completar Capítulos 1–3

### Capítulo 1 (Introducción)
Se detectaron secciones faltantes del PDF páginas 12–24. Se tradujeron e insertaron:
- **Este Libro**: descripción del contenido y enfoque del texto
- **Quién Debería Leer Este Libro**: audiencia objetivo y prerrequisitos
- **Notación y Álgebra Matricial Simple**: convenciones notacionales completas (Tabla 1.1)
- **Organización de Este Libro**: guía de navegación por capítulos
- **Conjuntos de Datos Utilizados en Laboratorios y Ejercicios**: Tabla 1.1 con descripciones de datasets
- **Sitio Web del Libro** y **Agradecimientos**

### Capítulo 2 (Aprendizaje Estadístico)
Se identificaron y corrigieron múltiples problemas en la traducción original:
- **Contenido faltante**: se añadió el párrafo introductorio del conjunto Income ("Como otro ejemplo, considere el panel izquierdo..."), el párrafo sobre las líneas verticales de error ε, y el párrafo puente "En esencia, el aprendizaje estadístico se refiere a un conjunto de enfoques..."
- **Reestructuración**: se movieron las secciones de Income (Figuras 2.2 y 2.3) y el texto asociado desde dentro de 2.1.1–2.1.2 a su posición original en la introducción de 2.1 (antes de 2.1.1), eliminando duplicados
- **Notación**: se corrigió `^T` → `^{\mathsf T}` en la línea 74 para consistencia con el Capítulo 1
- **README**: se añadió subsección "Consistencia en la notación" con las convenciones del Capítulo 1

### Capítulo 3 (Regresión Lineal)
Se expandió significativamente la traducción (~93 líneas nuevas, de 541 a 634 líneas totales):

**Sección 3.2.2 — Preguntas Importantes**
- Discusión completa del estadístico F: interpretación cuando F ≈ 1, dependencia de n y p, distribución F
- Prueba de subconjuntos de coeficientes: Ecuación (3.24) para probar q coeficientes específicos
- Relación entre estadísticos t y F: equivalencia con q=1
- Problema de pruebas múltiples: por qué no inspeccionar valores p individuales cuando p es grande
- Ajuste del modelo: R² siempre aumenta al añadir predictores, penalización del RSE con n-p-1
- Predicciones: intervalo de confianza vs predicción con ejemplos numéricos del Advertising

**Sección 3.3.2 — Extensiones del Modelo Lineal**
- Supuestos aditivo y lineal explicados en detalle
- Interacciones: reescritura (3.32), interpretación del coeficiente efectivo
- Principio jerárquico: justificación de incluir efectos principales con interacciones
- Regresión polinomial: aclaración de que sigue siendo un modelo lineal, comparación grado 2 vs 5

**Sección 3.3.3 — Problemas Potenciales** (expansión mayor)
- 1. No linealidad: detección con gráficos de residuales, forma de U, transformaciones log/raíz
- 2. Correlación de errores: tracking en series de tiempo, ejemplo de datos duplicados, diseño experimental
- 3. Varianza no constante: heterocedasticidad, forma de embudo, transformación log, mínimos cuadrados ponderados
- 4. Valores atípicos: impacto en RSE/R², residuales estudentizados (>3 en valor absoluto)
- 5. Alto apalancamiento: estadístico h_i (Ecuación 3.37), problema con predictores múltiples, combinación peligrosa atípico+apalancamiento
- 6. Colinealidad: diagramas de contorno RSS, multicolinealidad, VIF (Ecuación 3.38), valores >5/10

**Sección 3.4 — Plan de Marketing**: respuestas detalladas a las 7 preguntas con referencias cruzadas

**Sección 3.5 — Comparación KNN**: sesgo/varianza de K, contexto donde gana regresión lineal vs KNN, maldición de la dimensionalidad. Se añadieron las definiciones de figuras 3-16 a 3-20 que faltaban.

### Notas técnicas
- Todos los capítulos renderizan correctamente con `quarto render` sin warnings
- Notación `^{\mathsf T}` consistente en todos los capítulos traducidos
- Separador de miles con llaves `3{,}000}` aplicado donde corresponde
- Las figuras referenciadas existen en `Figures/ChapterX/png/`

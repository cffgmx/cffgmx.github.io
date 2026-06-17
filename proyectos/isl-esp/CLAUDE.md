# INSTRUCCIONES DE TRADUCCIÓN — LÉASE SIEMPRE ANTES DE TRADUCIR

> **Referencia:** El PDF original del libro es `ISL (Python).pdf`. Las páginas indicadas corresponden a la numeración absoluta del archivo digital.

> **Propósito:** Este archivo contiene las directivas que toda IA debe leer y acatar rigurosamente cuando se le solicite cualquier tarea de traducción en este proyecto. No debe ser modificado sin autorización explícita.

---

# ⚠️ REGLA 0 — PRESERVACIÓN DE FORMATO ORIGINAL (LÉASE PRIMERO)

**Esta es la regla más importante del proyecto. Su incumplimiento invalida cualquier traducción.**

Antes de dar por terminada una traducción, el traductor debe **obligatoriamente**:

## 0.1 Extraer el formato real del PDF original

Usar `pdftohtml` para obtener el HTML del rango de páginas a traducir, que preserva las etiquetas `<i>` (cursiva) y permite identificar términos en monoespaciado:

```bash
pdftohtml -f {pag_inicio} -l {pag_fin} -noframes -stdout "ISL (Python).pdf" 2>/dev/null
```

## 0.2 Verificar TODAS las cursivas

**Cada** fragmento de texto encerrado en `<i>...</i>` en el HTML extraído del PDF **debe** aparecer en cursiva en la traducción Markdown mediante `*...*`.

> ❌ **ERROR GRAVE:** Omitir una cursiva del original.
> ❌ **ERROR GRAVE:** Añadir una cursiva que no está en el original.
>
> Ejemplo real (Prefacio): el original tiene `<i>making sense of complex datasets</i>` y `<i>everyone</i>`. Ambos **deben** ser `*dotar de sentido a conjuntos de datos complejos*` y `*todos*` en la traducción. No hacerlo es un error de traducción.
>
> ⚠️ **Las cursivas NO se traducen sin cursiva. Una palabra en `<i>` en el original DEBE ser `*palabra*` en la traducción. Sin excepciones.**

## 0.3 Verificar TODOS los términos en monoespaciado (`backticks`)

Todo término que en el PDF original aparezca en fuente monoespaciada (tipo `Latin Modern Mono` o similar, identificable con `pdffonts`) **debe** preservarse entre backticks en la traducción. Esto incluye, sin excepción:

* **Variables de datasets:** `wage`, `age`, `education`, `year`, `Z1`, `Z2` y cualquier columna de un conjunto de datos. **En la traducción se conserva el nombre original en inglés con backticks:** `wage`, `age`, `education`, `year`. **NO se traducen los nombres de variables dentro de backticks.** El texto circundante está en español, pero los nombres de columna del dataset permanecen en inglés.
* **Nombres de conjuntos de datos:** `Wage`, `Smarket`, `NCI60`, `Default`, `Boston`
* **Nombres de lenguajes de programación:** `R`, `Python`
* **Nombres de paquetes/librerías:** `ISLP`, `sklearn`, `statsmodels`, `pandas`
* **Nombres de funciones, clases y métodos:** `lm()`, `predict()`, `summary()`, `Pipeline()`
* **Parámetros y variables matemáticas referenciadas en texto:** `Y`, `X`, `X_1`, `x_{ij}`, `alpha`
* **Etiquetas de categorías:** `Up`, `Down`
* **Rutas de archivos y comandos de terminal**

> ❌ **ERROR GRAVE:** Escribir `Python` (sin backticks) cuando el original usa monoespaciado.
> ❌ **ERROR GRAVE:** Escribir `R` (sin backticks) para referirse al lenguaje de programación.
> ❌ **ERROR GRAVE:** Referirse a una variable de un dataset sin backticks (ej: escribir "salario" en vez de `` `salario` `` o "age" en vez de `` `age` ``).
>
> ⚠️ **TODA variable de un dataset DEBE llevar backticks. Sin excepción. Esto es una réplica exacta del formato del libro original.**
>
> Ejemplo (Capítulo 1, Wage Data):
> ```markdown
> ... la asociación entre la `age` (edad) y el nivel de `education` (educación) de un empleado,
> así como el `year` (año) natural, y su `wage` (salario).
> ```
> No escribir: "... la asociación entre la edad y el nivel educativo de un empleado, así como el año natural, y su salario." ← **ERROR**
>
> ⚠️ **Las variables de dataset conservan su nombre original en inglés con backticks. NO se traducen dentro de backticks. Sin excepción.**
>
> ⚠️ **En la PRIMERA mención de cada variable en backtick, se añade entre paréntesis la traducción al español:** `` `wage` (salario) ``, `` `age` (edad) ``, etc. En menciones posteriores, solo va el nombre en inglés con backticks.

### 0.3.1 Excepción: NO usar backticks en leyendas de figuras y tablas

El original **NO** usa monoespaciado en los pies de figura ni en las leyendas de tablas. En estos elementos, los nombres de datasets y variables van en fuente normal:

✅ Figura 1.1: Datos Wage, que contienen información de encuestas...
❌ Figura 1.1: Datos `Wage`, que contienen información de encuestas... ← **ERROR**

## 0.4 Checklist de verificación pre-entrega

Antes de marcar una traducción como completada, ejecutar:

```bash
# Listar todas las cursivas del original
pdftohtml -f {inicio} -l {fin} -noframes -stdout "ISL (Python).pdf" 2>/dev/null | grep -oP '<i>[^<]*</i>' | sort

# Listar todos los <code> de la traducción
grep -oP '<code>[^<]*</code>' _site/chapters/{capitulo}/index.html | sort -u
```

Comparar ambas listas y verificar que **cada cursiva del original tiene su correspondiente en la traducción** y que **cada término monoespaciado del original tiene sus backticks en la traducción**.

Además, verificar las notas al pie:

```bash
# Contar notas en la traducción (deben coincidir 1:1 con las del PDF original)
grep -c '\^\[.*\]' chapters/{capitulo}/index.qmd
```

---

# ROL DEL SISTEMA
Eres un traductor académico experto y editor técnico en jefe, especializado en matemáticas, estadística y ciencia de datos. Operas bajo los más altos estándares editoriales de publicaciones científicas (como Springer Nature).

# OBJETIVO PRINCIPAL
Traducir textos técnicos y matemáticos del inglés al español con calidad de publicación oficial. El resultado final no debe parecer una traducción automática ni un apunte de clase; debe leerse exactamente como si la propia editorial original hubiera comisionado y publicado una edición oficial en español. El nivel de redacción debe ser impecable, riguroso y adecuado para la academia de alto nivel (matemáticos, actuarios, investigadores y profesionales).

# CRITERIOS DE TRADUCCIÓN (CUMPLIMIENTO OBLIGATORIO)

## 1. Estándar Editorial y Fluidez Gramatical:
* Utiliza un español culto, formal y neutro, propio de la literatura científica internacional. Evita cualquier regionalismo.
* Prioriza la fluidez y la elegancia discursiva: si la traducción literal del inglés resulta en una estructura torpe, excesivamente pasiva o robótica, reestructura la oración por completo. Debe fluir con la naturalidad de un libro de texto escrito originalmente en español, manteniendo intacto el significado subyacente.

## 2. Rigor Intelectual y Fidelidad Científica:
* No simplifiques los conceptos, no resumas ni omitas detalles técnicos.
* Mantén intactas las estructuras lógicas de las explicaciones matemáticas (relaciones de causa y efecto, condicionales, demostraciones y deducciones).

## 3. Aislamiento de Elementos Técnicos y de Código:
* **Matemáticas:** Preserva cualquier bloque matemático, ecuación, variable aislada o delimitador (como LaTeX o Markdown) exactamente como aparece. La matemática es intocable.
* **Código:** Si el texto incluye fragmentos de código, NO traduzcas la sintaxis, los nombres de funciones, librerías ni las variables. Traduce ÚNICAMENTE los comentarios explicativos dentro del código y las cadenas de texto (strings) destinadas a ser leídas por el usuario final, manteniendo el tono profesional.

## 4. Manejo de Terminología Especializada:
* Emplea la terminología estándar y formalmente consensuada en la literatura matemática y estadística hispanohablante.
* En el caso de neologismos o términos técnicos de frontera sin una traducción unánimemente aceptada, utiliza la opción académica más rigurosa y añade el término original en inglés entre paréntesis y en cursiva la primera vez que aparezca en la sección.

## 5. Glosario de Proyecto [Opcional]:
Respeta rigurosamente las siguientes traducciones para mantener la consistencia en todo el manuscrito:
* *Trade-off* -> Compromiso, balance o dilema
* *Overfitting / Underfitting* -> Sobreajuste / Subajuste
* *Features / Predictors / Inputs* -> Predictores, características o variables independientes
* *Target / Response / Output* -> Variable respuesta o variable objetivo
* *Framework* -> Marco de trabajo o marco teórico
* *Likelihood* -> Verosimilitud
* *Mapping* -> Mapeo o aplicación

## 6. Preservación de Formato Textual:
* **Negritas y cursivas:** Todo énfasis tipográfico del original (*cursiva*, **negrita**) debe conservarse exactamente en la traducción.
* **Monospace (`backticks`):** Los nombres de variables (`Y`, `X`, `X_1`), conjuntos de datos (`Wage`, `Smarket`, `NCI60`), funciones (`lm()`, `predict()`, `summary()`), parámetros y cualquier término que aparezca en fuente monoespaciada en el original debe preservarse con backticks. No se traducen ni se eliminan.

## 7. Numeración de Secciones:
* Los títulos de sección y subsección deben incluir el numeral explícito del original:
  ```markdown
  ## 2.1 ¿Qué es el Aprendizaje Estadístico?
  ### 2.1.1 ¿Por Qué Estimar $f$?
  ```
* La numeración debe coincidir 1:1 con el PDF original.

## 8. Consistencia Notacional:
* Todas las traducciones deben respetar las convenciones notacionales de [`NOTATION.md`](./NOTATION.md), extraídas del Capítulo 1 del original.
* Verificar en cada capítulo: $n$, $p$, $x_{ij}$, $\mathbf{X}$, $\hat{\beta}$, $\hat{y}$, separador de miles `3{,}000`, etc.

## 9. Referencias a Figuras y Tablas:

### 9.1 ⚠️ REGLA CRÍTICA — NO USAR NUNCA `@fig` NI `{#fig-X-Y}`

**Quarto genera numeración plana** (`Figura 1`, `Figura 2`) para `{#fig-X-Y}`, que **no coincide** con el formato `Figura 1.1` del original. Por tanto:

> ❌ **NUNCA** usar `@fig-1-1` (muestra "Figura 1").
> ❌ **NUNCA** usar `{#fig-1-1}` en imágenes (genera "Figura 1:" en la leyenda).
> ❌ **NUNCA** usar `{#tbl-1-1}` en tablas (genera "Tabla 1:" en la leyenda).

### 9.2 Formato correcto de referencias en el texto

Usar enlaces HTML explícitos con la clase `quarto-xref` para preservar el tooltip hover:

```markdown
<a href="#fig-1-1" class="quarto-xref">Figura&nbsp;1.1</a>
<a href="#tbl-1-1" class="quarto-xref">Tabla&nbsp;1.1</a>
```

La clase `quarto-xref` es necesaria para que el sistema de tooltip hover (`figures-map.json`) funcione.

### 9.3 Formato correcto de leyendas de figuras

Usar HTML con `id` explícito en un `<div>` contenedor y una leyenda en `<p class="figure-caption">`. **No usar** las clases `quarto-float`, `figure`, `<figure>` ni `<figcaption>` — estas activan el procesamiento automático de Quarto y generan leyendas duplicadas con numeración incorrecta:

```html
<div id="fig-1-1" style="text-align:center; margin:1.5em 0;">
<img src="../../Figures/Chapter1/png/1_1.png" class="img-fluid" style="width:65.0%" alt="">
<p class="figure-caption" style="margin-top:0.5em; text-align:center;">Figura&nbsp;1.1: Descripción de la figura. <em>Izquierda:</em> ...</p>
</div>
```

> ⚠️ **IMPORTANTE:** Aunque se eviten las clases Quarto, el patrón `id="fig-X-Y"` **igualmente** activa el crossref de Quarto, que genera una leyenda automática duplicada (`<figcaption class="quarto-uncaptioned">Figura 1</figcaption>`). Estas se suprimen vía CSS en `custom.scss` (ver 9.9).

### 9.4 Formato correcto de leyendas de tablas

Añadir `<a id="tbl-X-Y">` antes de la tabla y escribir la leyenda con número explícito:

```markdown
<a id="tbl-1-1"></a>

| ... | ... |

: Tabla 1.1: Descripción de la tabla.
```

> ⚠️ **No poner** `{#tbl-1-1}` al final de la leyenda porque Quarto genera "Tabla 1:" automáticamente.

### 9.5 Backticks en las leyendas de figuras

El original **NO** usa monoespaciado (`backticks`) para los nombres de conjuntos de datos dentro de las leyendas. Usar fuente normal sin backticks.

✅ **CORRECTO:** `Figura&nbsp;1.1: Datos Wage, que contienen...`
❌ **ERROR:** `Figura&nbsp;1.1: Datos \`Wage\`, que contienen...`

### 9.6 Tamaño de las imágenes

Incluir `style="width:65.0%"` en la etiqueta `<img>` para reducir su tamaño. Complementar con regla CSS en `custom.scss`:

```scss
.figure img {
  max-width: 80%;
  height: auto;
}
```

### 9.7 Numeración de secciones

Las secciones y subsecciones deben incluir el numeral completo capítulo.sección:

```markdown
## 1.1 Una Visión General del Aprendizaje Estadístico
### 1.1.1 Datos Salariales
## 1.2 Una Breve Historia del Aprendizaje Estadístico
```

### 9.8 Verificación de referencias

Antes de entregar una traducción:

```bash
# Comprobar que NO hay @fig- ni {#fig-X-Y}
grep -rn '@fig-' chapters/XX-capitulo/ && echo "ERROR: usa @fig en vez de HTML link"
grep -rn '{#fig-' chapters/XX-capitulo/ && echo "ERROR: usa {#fig- en vez de id HTML"
grep -rn '{#tbl-' chapters/XX-capitulo/ && echo "ERROR: usa {#tbl- en vez de id HTML"

# Comprobar que las leyendas NO incluyen backticks en datasets
grep -rn '\`Wage\`\|\`Smarket\`\|\`NCI60\`' chapters/XX-capitulo/ && echo "ERROR: backticks en leyenda"

# Verificar que leyendas y referencias tienen el mismo número
grep -oP 'Figura&nbsp;\d+\.\d+' _site/chapters/XX-capitulo/index.html | sort -u
```

### 9.9 CSS para suprimir auto-captions de Quarto

Quarto genera automáticamente `<figcaption class="quarto-uncaptioned">Figura N</figcaption>` para cada `id="fig-X-Y"`. La regla en `custom.scss` las oculta:

```scss
/* Suprimir captions automáticas de Quarto (usamos HTML manual) */
.quarto-uncaptioned {
  display: none !important;
}
```

## 10. Manejo de Notas al Pie de Página

### 10.1 Regla general

Toda nota al pie del PDF original **debe** traducirse y preservarse. No se omite ninguna.

### 10.2 Sintaxis Quarto

Usar la sintaxis inline de Quarto `^[...]` colocada inmediatamente después del texto al que hace referencia, sin espacio:

```markdown
...la verdadera relación entre $X$ e $Y$.^[La suposición de linealidad es a menudo un modelo de trabajo útil.]
```

### 10.3 Contenido de la nota

- El contenido se traduce **íntegramente** al español.
- Se preserva **todo** el formato: cursivas (`*...*`), negritas, backticks (`` `...` ``), y matemáticas (`$...$`).
- Si la nota contiene referencias a figuras o tablas, se usa el mismo formato de enlace HTML explícito:

```markdown
...los coeficientes para $\hat{\beta}_0$ y $\hat{\beta}_1$ son muy grandes.^[En la Tabla 3.1, un valor p pequeño para el intercepto indica que podemos rechazar la hipótesis nula...]
```

### 10.4 Numeración

Quarto numera las notas automáticamente (1, 2, 3...) y las recopila al final del documento bajo el encabezado "Notas". No es necesario numerarlas manualmente.

### 10.5 Ubicación en el párrafo

La nota `^[...]` se coloca **inmediatamente** después de la palabra o signo de puntuación al que se adosa, sin espacio. Si va tras una palabra: pegada. Si va tras un punto: pegada al punto.

```markdown
✅ ...sigue una distribución $F$.^[Incluso si los errores no están distribuidos normalmente...]
✅ ...exactamente equivalente^[El cuadrado de cada estadístico $t$ es el estadístico $F$ correspondiente.] a la prueba $F$...
```

### 10.6 Verificación

```bash
# Contar notas en el original (marcadores de superíndice en PDF)
# Comparar con el conteo en la traducción:
grep -c '\^\[.*\]' chapters/XX-capitulo/index.qmd
```

---

## 11. Referencias a Ecuaciones con Vista Previa al Hover

### 11.1 Regla general

Toda ecuación numerada del PDF original **debe** poder mostrarse como vista previa al pasar el ratón sobre su referencia en el texto. El mecanismo es idéntico al de figuras: se usan enlaces `<a href="#eq-X-Y" class="quarto-xref">` y el sistema tippy de Quarto muestra la ecuación al hacer hover.

### 11.2 Numeración de ecuaciones

Las ecuaciones heredan la numeración del original (capítulo.ecuación):
- Capítulo 1: `\tag{1.1}`
- Capítulo 2: `\tag{2.1}`, `\tag{2.2}`, etc.
- Capítulo 3: `\qquad (3.1)`, `\qquad (3.2)`, etc.

> ⚠️ **No se usa** `{#eq-X-Y}` de Quarto porque genera numeración automática que interferiría con la numeración manual.

### 11.3 Envoltorio de ecuación con `id`

Cada ecuación numerada se envuelve en un `<div id="eq-X-Y">`:

```markdown
<div id="eq-3-5">
$$Y = \beta_0 + \beta_1 X + \epsilon. \qquad (3.5)$$
</div>
```

Para ecuaciones de varias líneas (`\begin{aligned}`, `\begin{cases}`, etc.):

```markdown
<div id="eq-3-22">
$$
\begin{aligned}
\text{RSS} &= \sum_{i=1}^{n} (y_i - \hat{y}_i)^2 \\
           &= \sum_{i=1}^{n} (y_i - \hat{\beta}_0 - \hat{\beta}_1 x_{i1} - \cdots)^2. \qquad (3.22)
\end{aligned}
$$
</div>
```

### 11.4 Formato de referencias en el texto

Se usa el mismo formato de enlaces HTML explícitos que para figuras y tablas:

```markdown
<a href="#eq-3-5" class="quarto-xref">Ecuación&nbsp;3.5</a>
<a href="#eq-3-5" class="quarto-xref">(3.5)</a>
```

La clase `quarto-xref` activa el tooltip hover de Quarto.

### 11.5 Verificación pre-entrega

```bash
# Contar ecuaciones envueltas (deben coincidir con las del PDF original)
grep -c 'id="eq-3-' chapters/XX-capitulo/index.qmd

# Contar referencias enlazadas
grep -c 'href="#eq-3-' chapters/XX-capitulo/index.qmd

# Verificar que NO hay \qquad ni \tag sin envoltorio en texto (deben quedar 0 coincidencias)
grep -n '\\qquad\|\\tag{' chapters/XX-capitulo/index.qmd | grep -v '<div id="eq-'
# NOTA: Todo \qquad o \tag debe estar dentro de <div id="eq-X-Y">. Si hay coincidencias, falta envolver alguna ecuación.
```

### 11.6 Script de automatización

Para capítulos con numeración `\qquad (N.X)` (ej. Capítulo 3):

```python
import re
# Match $$ ... \qquad (N.X) ... $$ (multiline)
pattern = r'\$\$\s*\n?(.*?\\qquad\s*\((\d+)\.(\d+)\).*?)\s*\$\$'
# Wrap: <div id="eq-N-X">\n$$\n{content}\n$$\n</div>
```

Para capítulos con numeración `\tag{N.X}` (ej. Capítulos 1 y 2):

```python
pattern = r'\$\$\s*\n?(.*?\\tag\{(\d+)\.(\d+)\}.*?)\s*\$\$'
```

Referencias: reemplazar `Ecuación N.X` y `(N.X)` por `<a href="#eq-N-X" class="quarto-xref">...</a>`.

---

# ALCANCE POR CAPÍTULO (PÁGINAS DEL PDF ORIGINAL)

La siguiente tabla detalla los rangos de páginas del PDF original `ISL (Python).pdf` que corresponden al contenido teórico a traducir. El bloque de laboratorios y ejercicios se omite siempre.

| Cap. | Título Original | Teoría (págs.) | Omitir (Lab+Ej.) |
| :--: | :--- | :---: | :---: |
| 1 | Introduction | 12–24 | *N/A* |
| 2 | Statistical Learning | 25–49 | 50–77 |
| 3 | Linear Regression | 78–124 | 125–144 |
| 4 | Classification | 145–182 | 183–210 |
| 5 | Resampling Methods | 211–224 | 225–238 |
| 6 | Linear Model Selection and Regularization | 239–276 | 277–298 |
| 7 | Moving Beyond Linearity | 299–318 | 319–339 |
| 8 | Tree-Based Methods | 340–363 | 364–376 |
| 9 | Support Vector Machines | 377–396 | 397–408 |
| 10 | Deep Learning | 409–444 | 445–478 |
| 11 | Survival Analysis and Scale Results | 479–498 | 499–512 |
| 12 | Unsupervised Learning | 513–544 | 545–552 |
| 13 | Multiple Testing | 553–592 | 593–605 |

---

# 12. Layout: Espacio a la Derecha en Desktop

El grid de Quarto en `body.docked.fullcontent` deja un `5fr` de espacio vacío a la derecha del contenido (porque la regla de ancho completo está solo dentro de `@media(max-width: 767.98px)`).

## Fix en `custom.scss`

Se añadió una regla en `@media(min-width: 768px)` que:

- **Preserva** el área izquierda del sidebar (`screen-start` → `body-start`): `1.5em + minmax(50px, 100px) + 50px + 50px + 1.5em` ≈ 250–300 px.
- **Elimina** el `5fr` de la derecha; solo queda `1.5em` de margen antes de `screen-end`.
- **Contenido**: cambia de `minmax(500px, calc(1000px - 3em))` a `minmax(500px, 1fr)`, usando todo el ancho disponible.
- **Sin `!important`**: la regla aparece al final del CSS compilado (porque `custom.scss` es el último theme) y vence por orden de cascada.

### Verificación

```bash
# En el CSS compilado debe aparecer:
grep 'minmax(500px, 1fr)' _site/site_libs/bootstrap/bootstrap-*.min.css

# Confirmar que la regla está dentro de @media(min-width: 768px):
grep -A2 '@media(min-width: 768px)' _site/site_libs/bootstrap/bootstrap-*.min.css | grep 'docked.fullcontent'
```

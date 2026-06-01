# Gestión de paquetes en Arch Linux

---

Instalar un programa en Arch Linux es diferente a lo que quizás conoces de Windows o de otras distribuciones. No hay un instalador que te haga clic en "siguiente, siguiente, finalizar". En cambio, hay un sistema más poderoso, más transparente y (una vez que lo entiendes) más cómodo. Esta guía te explica cómo funciona ese sistema desde cero. Verás qué son los paquetes, de dónde vienen, cómo se instalan y cómo mantener tu sistema en buen estado.

No necesitas ser programador para entender esto. Solo necesitas leer con calma.

---

## 1. ¿De dónde viene un programa?

Antes de hablar de cómo se instalan los programas, conviene entender de dónde salen. Esto nos va a servir para que todo lo demás tenga sentido.

### El código fuente: el programa tal como lo escribe una persona

Todo programa comienza como un archivo de texto. Un programador lo escribe en algún lenguaje de programación (Python, C, C++, Java, etc.) usando instrucciones que un ser humano puede leer y entender. A ese texto se le llama **código fuente**.

El código fuente, por sí solo, no hace nada. Es como una receta de cocina que describe qué hay que hacer, pero no es la comida terminada.

### La compilación: traducir para que la máquina entienda

Las computadoras no entienden inglés ni ningún lenguaje de programación. Solo entienden secuencias de ceros y unos, el llamado **código binario** o **lenguaje máquina**. Para que el código fuente pueda ejecutarse, hay que traducirlo a ese lenguaje. Ese proceso de traducción se llama **compilación**, y lo realiza un programa especializado llamado **compilador**.

Siguiendo con la analogía, si el código fuente es la receta, la compilación es cocinarla. El resultado es el plato terminado.

### Los archivos binarios: el programa listo para usarse

El resultado de la compilación es un conjunto de **archivos binarios**. Si intentaras abrir uno con un editor de texto, verías un montón de caracteres sin sentido, porque están escritos en el lenguaje de la máquina, no en el de las personas. Pero la computadora sí los entiende, y puede ejecutarlos.

Entre esos archivos hay uno principal (usualmente con el nombre del programa) que al ejecutarse inicia la aplicación.

En principio, con esos archivos binarios ya podrías usar el programa. Entonces, ¿para qué existe el proceso de "instalación"? La respuesta a eso es precisamente lo que vamos a explorar.

---

## 2. ¿Qué es un paquete Arch?

### El problema de distribuir programas

Imagina que compilas un programa y quieres compartirlo con otros usuarios. Podrías simplemente enviarles los archivos binarios. Pero eso genera varios problemas:

- ¿Dónde ponen esos archivos en su sistema?
- ¿El programa necesita otros archivos para funcionar que no están incluidos?
- ¿Cómo sabe el sistema que ese programa está instalado?
- ¿Cómo lo actualizan o desinstalan limpiamente más adelante?

Para resolver estos problemas existe el concepto de **paquete**.

### Un paquete es mucho más que un contenedor de archivos

En Arch Linux, los programas no se distribuyen sueltos, sino dentro de un **paquete Arch**. Un paquete es un único archivo que contiene todo lo necesario para instalar un programa de forma ordenada. Incluye los archivos binarios, información sobre el programa, sus dependencias y las instrucciones para que el sistema sepa exactamente qué está instalando.

Técnicamente, un paquete Arch es un archivo con extensión `.tar.zst`. Eso significa que los archivos fueron primero **empaquetados** (reunidos en un solo archivo) con la herramienta `tar`, y luego **comprimidos** (reducidos de tamaño) con `zstd`.

> **Analogía:** empaquetar es como meter varias hojas en un sobre. Comprimir es aplastar ese sobre para que ocupe menos espacio en el cajón. El resultado es un archivo compacto que contiene todo lo que necesita el programa.

Anteriormente se usaba `gzip` para comprimir, por lo que aún pueden encontrarse algunos paquetes con extensión `.tar.gz`. Con el tiempo estos están siendo reemplazados por `.tar.zst`.

---

## 3. ¿Qué hay dentro de un paquete Arch?

Abramos un paquete real para ver qué contiene. Usaremos Firefox como ejemplo.

El archivo del paquete se llama algo así como `firefox-88.0-1-x86_64.pkg.tar.zst`. Para abrirlo manualmente se hacen dos pasos. Primero se descomprime con `unzstd`, y luego se desempaqueta con `tar -xf`. Al hacerlo, obtenemos lo siguiente:

```
firefox-88.0-1-x86_64.pkg.tar.zst   ← el paquete original
firefox-88.0-1-x86_64.pkg.tar       ← después de descomprimir
├── usr/                             ← los archivos del programa
│   └── lib/
│       └── firefox/
│           ├── firefox              ← el ejecutable principal
│           ├── libmozgtk.so
│           ├── libmozsandbox.so
│           └── ... (más librerías y recursos)
├── .PKGINFO                         ← información del paquete
├── .BUILDINFO                       ← información de compilación
├── .MTREE                           ← hashes de verificación
└── .INSTALL  (opcional)             ← script de post-instalación
```

> **Nota:** en GNU/Linux, los archivos cuyo nombre empieza con punto (`.`) están ocultos por defecto. Para verlos en la terminal se usa `ls -a`.

Veamos qué hace cada parte.

### La carpeta `usr/`: el programa en sí

Esta carpeta contiene los archivos binarios del programa, organizados exactamente como deben quedar dentro de tu sistema cuando se instale. Cuando `pacman` instala un paquete, lo que hace es tomar esta carpeta y copiar su contenido en el lugar correspondiente del sistema de archivos real.

Por ejemplo, dentro de `usr/lib/firefox/` está el ejecutable `firefox`. Podrías ejecutarlo directamente desde ahí con `./firefox` y el navegador abriría sin problema. La diferencia es que haciéndolo así, el sistema no sabe que Firefox está instalado. No aparece en los menús, no hay forma limpia de desinstalarlo, y otras aplicaciones que necesiten Firefox no podrían encontrarlo. La instalación formal, a través de `pacman`, es lo que registra el programa en el sistema y lo integra correctamente.

La estructura de `usr/` sigue la **jerarquía estándar del sistema de archivos de Linux** (FHS, *Filesystem Hierarchy Standard*). Esto garantiza que cada archivo del paquete sepa exactamente a dónde tiene que ir.

### El archivo `.PKGINFO`: la ficha de identidad del paquete

Es un archivo de texto con toda la información que `pacman` necesita para gestionar el paquete. Incluye el nombre, la versión, la descripción, la arquitectura, las dependencias, el mantenedor, la licencia y más. Cuando ejecutas `pacman -Qi firefox` para ver la información de un paquete instalado, `pacman` lee precisamente este archivo.

### El archivo `.MTREE`: el guardián de la integridad

Contiene **hashes criptográficos** (huellas digitales matemáticas) y marcas de tiempo de todos los archivos del paquete. Un hash es un número que se calcula a partir del contenido de un archivo. Si el archivo cambia aunque sea en un solo bit, el hash cambia completamente.

`pacman` usa este archivo para verificar que el paquete no ha sido alterado ni corrompido durante la descarga. Si alguien intentara modificar el paquete para incluir código malicioso, el hash no coincidiría y `pacman` rechazaría la instalación.

### El archivo `.BUILDINFO`: para reproducibilidad técnica

Contiene información sobre el entorno exacto en que fue compilado el paquete, como qué versión del compilador se usó y qué dependencias de compilación estaban instaladas. Esto sirve para garantizar que el mismo código fuente siempre produzca exactamente el mismo binario. Es un detalle técnico avanzado. Como usuario no necesitas interactuar con él.

### El archivo `.INSTALL` (opcional): instrucciones post-instalación

Algunos programas necesitan pasos adicionales después de copiarse al sistema, como crear un usuario especial, registrar un servicio o regenerar una caché. Si el paquete requiere eso, incluye un script `.INSTALL` que `pacman` ejecuta automáticamente al instalar, actualizar o desinstalar el paquete. Muchos paquetes, como Firefox, no lo necesitan y no lo incluyen.

---

## 4. Librerías y dependencias

Ahora que sabemos cómo está hecho un paquete, podemos entender uno de los conceptos más importantes de cualquier sistema GNU/Linux, las **dependencias**.

### ¿Qué es una librería?

Un programa rara vez hace todo desde cero. En cambio, usa **librerías**, que son archivos con código preescrito y listo para usar, que realizan tareas comunes. Por ejemplo, mostrar una ventana en pantalla, reproducir audio, conectarse a internet o descomprimir archivos son cosas que muchos programas necesitan hacer. En lugar de que cada programa escriba ese código desde cero, todos comparten las mismas librerías.

Cuando un programa necesita una librería para funcionar, decimos que ese programa **depende** de esa librería. La librería es una **dependencia** del programa.

Si la librería no está instalada en el sistema, el programa no puede arrancar. A eso se le llama un **problema de dependencias**, y es algo que `pacman` se encarga de resolver automáticamente.

> **Nota:** una dependencia no siempre es una librería. A veces un programa necesita que otro programa ya esté instalado para funcionar. Ese otro programa también es una dependencia.

### Librerías estáticas vs. librerías dinámicas

Hay dos formas en que un programa puede usar una librería:

**Librerías estáticas** (extensión `.a` en Linux y `.lib` en Windows): la librería se copia e integra dentro del propio programa durante la compilación. El programa es autosuficiente porque lleva todo consigo. La desventaja es que si diez programas usan la misma librería, hay diez copias de ella ocupando espacio, y si la librería tiene un fallo de seguridad, hay que recompilar y redistribuir los diez programas.

**Librerías dinámicas** (extensión `.so` en Linux y `.dll` en Windows): la librería existe como un archivo separado en el sistema, y todos los programas que la necesitan la usan en tiempo de ejecución, compartiendo una sola copia. Si se actualiza la librería para corregir un error de seguridad, todos los programas que la usan se benefician automáticamente.

Arch Linux, como la mayoría de las distribuciones Linux, favorece el uso de librerías dinámicas. Esto es más eficiente en espacio y en mantenimiento, aunque introduce la complejidad de gestionar qué versión de cada librería está instalada.

### El problema de las versiones

Las librerías dinámicas pueden causar conflictos. Imagina que el programa A necesita la versión 2.0 de cierta librería, pero el programa B necesita la versión 3.0 de esa misma librería, y ambas versiones son incompatibles entre sí. Arch Linux no permite tener instaladas dos versiones de una misma librería al mismo tiempo, así que puede surgir un conflicto.

Resolver estos conflictos manualmente sería un dolor de cabeza. Para eso existe `pacman`.

---

## 5. Repositorios: la tienda de paquetes de Arch

### ¿De dónde se descargan los paquetes?

Un **repositorio** es un servidor remoto que aloja una colección de paquetes Arch listos para instalar. Desde tu computadora te conectas a ese servidor, buscas el programa que quieres, y `pacman` lo descarga e instala automáticamente. Es parecido a una tienda de aplicaciones, pero sin interfaces gráficas ni botones de pago. Todo desde la terminal.

### Los repositorios oficiales

Arch Linux mantiene actualmente siete repositorios oficiales:

| Repositorio | Para qué sirve |
|---|---|
| `core` | El núcleo del sistema. Incluye herramientas básicas, el kernel de Linux y gestores de arranque. Sin esto, Arch no funciona. |
| `extra` | Programas adicionales mantenidos por el equipo de Arch, como entornos de escritorio, navegadores y editores. |
| `community` | Paquetes mantenidos por los *Trusted Users* (usuarios de confianza de la comunidad), no por el equipo principal. |
| `multilib` | Versiones de 32 bits de librerías, necesarias en sistemas de 64 bits para ejecutar algunas aplicaciones antiguas o juegos. |
| `testing` | Versiones nuevas de paquetes de `core` y `extra` que aún están siendo probadas. No recomendado para uso diario. |
| `community-testing` | Lo mismo que `testing`, pero para paquetes de `community`. |
| `multilib-testing` | Lo mismo, para paquetes de `multilib`. |

Para la mayoría de los usuarios, los repositorios relevantes son `core`, `extra` y `community`. Los repositorios `testing` solo deberían activarse si quieres contribuir a Arch reportando errores, ya que pueden contener paquetes inestables.

Más información sobre los repositorios oficiales:  
https://wiki.archlinux.org/index.php/Official_repositories_(Español)

### El AUR: el repositorio de la comunidad

Además de los repositorios oficiales, existe el **AUR** (Arch User Repository, o repositorio de usuarios de Arch). Es una plataforma donde cualquier usuario puede publicar instrucciones para construir paquetes que no están en los repositorios oficiales. El AUR no distribuye paquetes ya compilados, sino **recetas** (archivos `PKGBUILD`, que veremos más adelante) para que tú los compiles en tu propia máquina.

El AUR es enorme (contiene decenas de miles de paquetes) y es una de las razones por las que Arch tiene fama de tener software disponible para casi cualquier cosa. Sin embargo, dado que cualquier persona puede publicar ahí, es importante revisar el contenido de los `PKGBUILD` antes de usarlos, especialmente en paquetes poco populares.

`pacman` no puede interactuar con el AUR directamente. Para eso existen herramientas auxiliares como `yay` o `paru`, que funcionan de forma similar a `pacman` pero también gestionan paquetes del AUR.

---

## 6. Pacman: el gestor de paquetes

`pacman` es la herramienta que coordina todo. Busca paquetes en los repositorios, los descarga, verifica su integridad, resuelve dependencias, los instala en el lugar correcto, registra qué hay instalado y gestiona actualizaciones y desinstalaciones. Todo desde la terminal.

Vamos a ver cómo se usa con un ejemplo completo.

---

### Antes de todo: sincronizar los repositorios

Los repositorios cambian constantemente. Se añaden paquetes, se actualizan versiones, se corrigen errores. Tu computadora tiene una copia local de la lista de paquetes disponibles, pero esa lista puede quedarse desactualizada. Antes de instalar cualquier cosa, sincronízala:

```bash
sudo pacman -Sy
```

Verás algo como esto:

```
:: Sincronizando las bases de datos de los paquetes...
 core        1600.8 KiB  238 MiB/s  100%
 extra          5.5 MiB  925 KiB/s  100%
 community   (está actualizado)
 multilib    150.4 KiB  4.90 MiB/s  100%
```

Cada línea representa un repositorio. Si ya estaba actualizado, aparece "está actualizado" y no descarga nada. Si había cambios, los descarga. Ahora `pacman` conoce el estado actual de todos los repositorios.

> **Importante:** no uses `-Sy` solo, antes de instalar. Usa siempre `-Syu` (que sincroniza *y* actualiza) para evitar instalar paquetes que requieren versiones de dependencias más nuevas de las que tienes. Esto se explica más adelante.

---

### Buscar un paquete

Supongamos que quieres un editor de video pero no sabes qué opciones existen. Busca así:

```bash
pacman -Ss video editor
```

`pacman` buscará en todos los repositorios paquetes cuyo nombre o descripción contenga esas palabras. El resultado se ve así:

```
extra/kdenlive 21.04.0-1 (kde-applications kde-multimedia)
    A non-linear video editor for Linux using the MLT video framework
community/openshot 2.5.1-3
    An award-winning free and open-source video editor
community/shotcut 21.03.21-1
    Cross-platform Qt based Video Editor
community/flowblade 2.0.0.3-1
    Multitrack non-linear video editor
```

El formato de cada resultado es:

```
repositorio/nombre_del_paquete  versión  (grupos a los que pertenece)
    Descripción breve
```

Supongamos que nos llama la atención `kdenlive`. Antes de instalarlo, podemos ver más información.

---

### Ver información de un paquete

```bash
pacman -Si kdenlive
```

La salida es una ficha detallada:

```
Repositorio           : extra
Nombre                : kdenlive
Versión               : 21.04.0-1
Descripción           : A non-linear video editor for Linux using the MLT video framework
Arquitectura          : x86_64
URL                   : https://apps.kde.org/kdenlive/
Licencias             : GPL
Depende de            : qt5-networkauth  knewstuff  knotifyconfig  kfilemetadata  mlt  ...
Dependencias opcionales: ffmpeg: para soporte de FFmpeg
                         vlc: para previsualización de DVD
                         opencv: para seguimiento de movimiento
Tamaño de la descarga : 12.02 MiB
Tamaño de instalación : 62.96 MiB
Encargado             : Antonio Rojas <arojas@archlinux.org>
```

Esto proviene del archivo `.PKGINFO` del paquete. Fíjate en el campo **"Depende de"**, que lista las librerías y programas que `kdenlive` necesita para funcionar. `pacman` los instalará automáticamente si no los tienes.

---

### Instalar un paquete

```bash
sudo pacman -S kdenlive
```

`pacman` analiza las dependencias, verifica que no haya conflictos, y muestra un resumen antes de pedir confirmación:

```
resolviendo dependencias...
buscando conflictos entre paquetes...

Paquetes a instalar (30):
   accounts-qml-module  breeze-icons  kaccounts-integration
   kfilemetadata  mlt  purpose  qt5-networkauth  ...  kdenlive

Tamaño total de la descarga:    19.25 MiB
Tamaño total de la instalación: 353.24 MiB

:: ¿Continuar con la instalación? [S/n]
```

Escribe `s` y presiona Enter. `pacman` descargará los 30 paquetes (kdenlive y sus 29 dependencias), verificará su integridad comparando los hashes, y los instalará en el orden correcto.

---

### Actualizar el sistema

La forma correcta de actualizar todos los programas instalados es:

```bash
sudo pacman -Syu
```

Este comando hace tres cosas en secuencia:
1. Sincroniza la base de datos local con los repositorios (`-Sy`)
2. Comprueba qué paquetes instalados tienen versiones más nuevas disponibles
3. Los actualiza todos (`-u`)

`pacman` mostrará la lista de paquetes a actualizar y pedirá confirmación. Este es el comando que debes ejecutar regularmente para mantener tu sistema al día.

> **¿Por qué no usar `-Sy` y luego `-S` por separado?**
>
> Si sincronizas la base de datos (`-Sy`) pero no actualizas el sistema (`-u`), puedes terminar en una situación problemática: la base de datos sabe que existe una versión nueva de una librería, pero tú tienes la vieja. Si luego instalas un programa que ya requiere la versión nueva, `pacman` intentará instalarlo con dependencias que son más nuevas que lo que hay en tu sistema. Esto puede romper cosas. Usar `-Syu` siempre evita este problema.

---

### Desinstalar un paquete

Cuando ya no necesitas un programa, desinstálalo así:

```bash
sudo pacman -Rns kdenlive
```

- `-R` indica que se va a eliminar un paquete
- `-n` también elimina los archivos de configuración que el programa haya dejado
- `-s` también elimina las dependencias que se instalaron junto con él y que ningún otro programa necesita ahora

`pacman` mostrará qué se va a eliminar y pedirá confirmación. Este es el comando recomendado para una desinstalación limpia.

---

### La caché de pacman

Cada vez que `pacman` descarga un paquete, guarda una copia en `/var/cache/pacman/pkg/`. Esto tiene una ventaja importante. Si en algún momento necesitas reinstalar un paquete o volver a una versión anterior (*downgrade*), `pacman` puede usar la copia local sin necesidad de descargar nada.

La desventaja es que esa carpeta crece con el tiempo. Para limpiarla:

```bash
sudo pacman -Sc     # elimina los paquetes de la caché que ya no están instalados
sudo pacman -Scc    # elimina TODA la caché (pide confirmación antes)
```

En general, `-Sc` es suficiente para un mantenimiento regular.

---

### Instalar desde un archivo local

Si tienes un paquete Arch descargado manualmente (por ejemplo, desde el AUR o desde la caché), puedes instalarlo así:

```bash
sudo pacman -U /ruta/al/archivo.pkg.tar.zst
```

Por ejemplo, para instalar un paquete guardado en la caché:

```bash
sudo pacman -U /var/cache/pacman/pkg/kdenlive-21.04.0-1-x86_64.pkg.tar.zst
```

---

## 7. Mantenimiento regular del sistema

Además de actualizar e instalar programas, hay algunas tareas de mantenimiento que conviene hacer periódicamente.

### Buscar paquetes huérfanos

Cuando desinstalar un programa con `-Rs`, `pacman` elimina sus dependencias siempre que ningún otro programa las necesite. Pero a veces quedan dependencias que ya nadie usa. A esas se les llama **paquetes huérfanos**. Para encontrarlos:

```bash
pacman -Qdt
```

Si hay resultados, puedes eliminarlos todos de una vez:

```bash
sudo pacman -Rns $(pacman -Qdtq)
```

> Antes de ejecutar ese comando, revisa la lista para asegurarte de que realmente no necesitas ninguno de esos paquetes.

### Verificar la integridad de la base de datos

Si sospechas que algo anda mal con los paquetes instalados:

```bash
pacman -Dk
```

Esto verifica que todos los paquetes instalados tengan sus archivos en su lugar, que las dependencias estén satisfechas y que no haya conflictos. `-Dkk` hace además una verificación cruzada con los repositorios.

---

## 8. Instalación manual de emergencia

Esto es algo que probablemente nunca necesitarás, pero que es útil entender porque revela cómo funciona el sistema por dentro.

Dado que un paquete Arch no es más que un archivo comprimido que refleja la estructura de directorios del sistema, puede instalarse manualmente sin necesidad de `pacman`. Basta con extraer su contenido en la raíz `/` del sistema.

```bash
tar -xf paquete.pkg.tar -C /
```

Como `tar` preserva las rutas relativas de los archivos, cada componente va exactamente a donde corresponde.

¿Cuándo sirve esto? Imagina que por algún error `pacman` fue eliminado del sistema. No puedes reinstalarlo usando `pacman` porque... ya no existe. Pero puedes descargar el paquete de `pacman` manualmente y extraerlo en la raíz, reinstalándolo sin necesitar ningún gestor de paquetes.

**Dicho esto, la instalación manual no debe usarse en condiciones normales.** Al hacerlo, `pacman` no registra el paquete en su base de datos, no verifica dependencias, no ejecuta scripts de post-instalación y no sabrá que ese programa está instalado. Resérvalo para situaciones de emergencia.

---

## 9. ¿Cómo se crea un paquete Arch?

Esta sección es para entender el ecosistema, no para aprender a crear paquetes desde cero (para eso está la wiki oficial de Arch Linux).

### El PKGBUILD: la receta del paquete

Todo paquete Arch nace de un archivo llamado **PKGBUILD**. Es un script de shell (un archivo de texto ejecutable con instrucciones para la terminal) que actúa como receta de construcción. En él se especifica:

- El nombre, versión y descripción del programa
- De dónde descargar el código fuente
- Qué dependencias necesita
- Cómo compilarlo
- Qué archivos incluir en el paquete final

Para crear un PKGBUILD se parte de una plantilla en blanco que viene en `/usr/share/pacman/` y se rellena con la información del programa.

### makepkg: el cocinero que sigue la receta

Una vez que tienes el PKGBUILD, ejecutas `makepkg` desde la misma carpeta:

```bash
makepkg
```

Este script (de cerca de 1500 líneas de código) lee el PKGBUILD y hace todo el trabajo:

1. Descarga el código fuente desde la URL indicada
2. Verifica su integridad
3. Lo compila siguiendo las instrucciones del PKGBUILD
4. Empaqueta y comprime los archivos binarios resultantes
5. Genera los archivos de metadatos (`.PKGINFO`, `.MTREE`, `.BUILDINFO`, etc.)

El resultado es un archivo `.tar.zst`, es decir, un paquete Arch completo listo para instalar con `pacman -U`.

**La clave es que todos los paquetes Arch se construyen exactamente de la misma manera.** Esa uniformidad es lo que permite a `pacman` gestionarlos, compararlos y relacionarlos de forma coherente. Independientemente de quién haya creado el paquete o cuándo, todos hablan el mismo idioma.

El script `makepkg` completo puede consultarse en:  
https://git.archlinux.org/pacman.git/tree/scripts/makepkg.sh.in

---

## Referencia rápida de pacman

### Buscar e instalar

| Comando | Qué hace |
|---|---|
| `pacman -Ss término` | Busca paquetes en los repositorios |
| `pacman -Si paquete` | Muestra información de un paquete (en los repositorios) |
| `pacman -S paquete` | Instala un paquete y sus dependencias |
| `pacman -U archivo.pkg.tar.zst` | Instala un paquete desde un archivo local |

### Actualizar

| Comando | Qué hace |
|---|---|
| `pacman -Sy` | Sincroniza la base de datos local con los repositorios |
| `pacman -Syu` | Sincroniza **y** actualiza todos los paquetes instalados ← usa siempre este |

### Desinstalar

| Comando | Qué hace |
|---|---|
| `pacman -R paquete` | Elimina el paquete (conserva dependencias y configuración) |
| `pacman -Rs paquete` | Elimina el paquete y sus dependencias huérfanas |
| `pacman -Rns paquete` | Elimina el paquete, sus dependencias huérfanas y sus archivos de configuración ← recomendado |

### Consultar lo que tienes instalado

| Comando | Qué hace |
|---|---|
| `pacman -Q paquete` | Comprueba si el paquete está instalado y qué versión |
| `pacman -Qs término` | Busca entre los paquetes instalados |
| `pacman -Qi paquete` | Muestra información detallada del paquete instalado |
| `pacman -Qd` | Lista los paquetes instalados como dependencias |
| `pacman -Qdt` | Lista los paquetes huérfanos (dependencias que ya nadie necesita) |
| `pacman -Qm` | Lista los paquetes instalados desde fuera de los repositorios oficiales (ej. AUR) |

### Limpiar y verificar

| Comando | Qué hace |
|---|---|
| `pacman -Sc` | Elimina de la caché los paquetes que ya no están instalados |
| `pacman -Scc` | Vacía toda la caché |
| `pacman -Sw paquete` | Descarga un paquete sin instalarlo (lo guarda en la caché) |
| `pacman -Dk` | Verifica la integridad de la base de datos local |
| `pacman -Dkk` | Verifica la integridad también contra los repositorios |

---

## Para seguir aprendiendo

La **wiki de Arch Linux** es uno de los recursos de documentación más completos del mundo Linux. Aunque está pensada para Arch, mucha de su información aplica a cualquier distribución:

- Página principal de la wiki: https://wiki.archlinux.org
- Pacman en detalle: https://wiki.archlinux.org/title/Pacman_(Español)
- Repositorios oficiales: https://wiki.archlinux.org/index.php/Official_repositories_(Español)
- El AUR: https://wiki.archlinux.org/title/Arch_User_Repository_(Español)
- PKGBUILD: https://wiki.archlinux.org/title/PKGBUILD_(Español)

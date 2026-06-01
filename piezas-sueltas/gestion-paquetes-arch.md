# Gestión de paquetes en Arch Linux

---

Arch Linux administra sus programas de una forma distinta a lo que quizás conoces de Windows o de otras distribuciones. Aquí no hay instaladores con botones de "siguiente, siguiente, finalizar". En cambio, hay un sistema pensado para que quien lo usa entienda lo que está haciendo. Esa comprensión es exactamente lo que esta guía busca construir.

El objetivo no es memorizar comandos. Es entender por qué el sistema funciona como funciona, de modo que cuando algo falle, sepas qué está pasando y cómo resolverlo. Cada sección de este texto existe para resolver un problema concreto que la sección anterior dejó sin respuesta.

No se asume ninguna experiencia previa. Si es la primera vez que escuchas términos como "terminal" o "paquete", estás en el lugar correcto.

---

## 0. La terminal y los comandos

Antes de entrar en materia, conviene entender el escenario donde va a ocurrir todo lo que sigue.

La **terminal** es un programa que te permite comunicarte con el sistema operativo escribiendo texto. En lugar de hacer clic en botones e íconos, escribes instrucciones directamente y el sistema responde, también con texto. En Arch Linux es la herramienta principal para administrar el sistema.

A cada instrucción que escribes en la terminal se le llama **comando**. Un comando tiene un nombre y, opcionalmente, palabras adicionales que le dicen qué hacer exactamente. Por ejemplo, en el comando `ls -a`, la palabra `ls` es el nombre del programa que se ejecuta, y `-a` es una indicación adicional que le dice cómo comportarse. A lo largo de esta guía verás muchos comandos; la lógica siempre es la misma. Primero el nombre del programa, luego las indicaciones.

### Quién puede hacer qué: usuarios y el administrador

Imagina una computadora que usan todos en la familia. La mamá tiene su cuenta, el papá tiene la suya, los hijos tienen las suyas. Cada quien puede entrar a su sesión, guardar sus archivos, escuchar su música y personalizar su escritorio sin afectar a los demás. Hasta ahí todo es territorio propio.

Pero hay decisiones que afectan a toda la familia: instalar un programa nuevo para que todos puedan usarlo, cambiar configuraciones del sistema, o eliminar algo que ya no sirve. Esas decisiones no pueden tomarlas cualquiera, porque un error ahí puede afectar a todos. Por eso existe una cuenta especial con más autoridad que las demás, llamada **administrador** o **superusuario**, que es la única que puede hacer ese tipo de cambios.

En Arch Linux funciona exactamente así. Cada persona que usa la computadora tiene su propia cuenta con acceso a sus cosas, pero las operaciones que afectan al sistema completo, como instalar o eliminar programas, requieren la autorización del administrador.

La herramienta que permite dar esa autorización se llama **`sudo`**. Cuando un comando necesita permisos de administrador, se escribe `sudo` antes de él. El sistema pedirá la contraseña del administrador para confirmar que quien está dando esa instrucción tiene autoridad para hacerlo, y luego la ejecutará. No todos los comandos de esta guía lo requieren, solo los que hacen cambios que afectan a todo el sistema.

Con eso claro, ya podemos construir lo que realmente importa.

---

## 1. Qué hay dentro de un programa

Todo empieza con una pregunta que rara vez nos hacemos. ¿Qué es exactamente un programa? No el ícono que hacemos clic, sino el objeto que vive en el disco y que la computadora ejecuta.

Un programador escribe instrucciones en algún lenguaje de programación, ya sea Python, C, C++ u otro. Esas instrucciones forman un archivo de texto que cualquier persona con conocimiento del lenguaje puede leer. A ese archivo se le llama **código fuente**. Piénsalo como una receta escrita que describe con precisión qué debe hacerse, en qué orden y con qué ingredientes.

El problema es que una computadora no puede leer esa receta directamente. Las computadoras no entienden español ni ningún lenguaje de programación. Solo procesan secuencias de ceros y unos, lo que se conoce como **código binario** o **lenguaje máquina**. Para que la receta se convierta en algo ejecutable, hay que traducirla. Ese proceso de traducción se llama **compilación** y lo realiza un programa especializado llamado **compilador**.

El resultado de compilar el código fuente es un conjunto de **archivos binarios**. Si intentaras abrirlos con un editor de texto, verías pura basura visual, porque están escritos en el idioma de la máquina, no en el de las personas. Pero la computadora sí los entiende y puede ejecutarlos.

Dentro de ese conjunto hay un archivo especial, al que se le llama **ejecutable**. Es el que, al abrirse, pone en marcha el programa. Los demás archivos binarios existen para apoyarlo, pero ese es el que da la orden de inicio. En el caso de Firefox, ese archivo se llama simplemente `firefox`. Si lo localizaras en tu disco y le dijeras a la computadora que lo abra, el navegador aparecería en pantalla, listo para usarse, exactamente igual que si lo hubieras instalado por los medios normales.

Eso plantea una pregunta razonable. Si el ejecutable ya existe después de compilar, y la computadora puede abrirlo directamente, ¿para qué existe el proceso de instalación? ¿No bastaría con tener ese archivo y ejecutarlo?

---

## 2. Por qué no basta con copiar archivos

Imagina que alguien te manda por correo los archivos binarios de un programa y te dice que los pongas en tu computadora. Lo primero que no sabes es dónde ponerlos. ¿En el escritorio? ¿En alguna carpeta del sistema? Si los pones en el lugar equivocado, otros programas que necesiten encontrarlos no podrán hacerlo. Si los pones en el lugar correcto pero el sistema no sabe que están ahí, no aparecerán en el menú de aplicaciones ni podrás desinstalarlos limpiamente después.

Pero hay algo más profundo que el problema de dónde poner los archivos.

Imagina que descargas un videojuego y lo intentas abrir. En lugar de arrancar, aparece un mensaje de error: "Falta Microsoft Visual C++ Redistributable". Lo buscas, lo instalas, vuelves a intentarlo. Ahora el error dice que falta un driver, es decir, un programa que le permite al sistema operativo comunicarse con un componente físico de la computadora, en este caso la tarjeta de video. Lo actualizas. Nuevo intento, nuevo mensaje: la versión de DirectX no es compatible. Cada vez que resuelves un problema aparece otro. El juego existe, está ahí, pero no puede funcionar porque le faltan piezas que esperaba encontrar ya instaladas en la computadora.

Con cualquier programa en Linux ocurre lo mismo. Un navegador web, por ejemplo, no lleva dentro todo lo que necesita para funcionar. Muestra imágenes usando otro programa que ya debe estar en el sistema, establece conexiones seguras usando otro, interpreta ciertos formatos de video usando otro más. Ninguno de esos programas auxiliares es el navegador, pero sin ellos el navegador no puede hacer su trabajo.

A esos programas que un programa necesita para funcionar se les llama **dependencias**. Pueden ser programas que el usuario conoce y abre directamente, o pueden ser herramientas que trabajan en segundo plano y que nadie usa de forma directa, pero que otros programas consultan constantemente.

El problema no termina en tenerlas. Imagina que tienes instalado un programa que funciona con la versión 2.0 de cierta dependencia, y quieres instalar otro que requiere la versión 3.0 de esa misma dependencia, siendo ambas incompatibles entre sí. Instalar la nueva versión podría romper el programa que ya tenías. Es el mismo dilema de quien actualiza una app en el teléfono y de repente otra app deja de funcionar porque ambas dependían de algo compartido. Gestionar todo eso manualmente, para cada programa que quieras instalar, sería un trabajo interminable. Por eso existe el concepto de **paquete**.

---

## 3. Qué es un paquete

Un paquete es la solución estandarizada al problema de distribuir programas. No es simplemente un archivo comprimido con los binarios adentro. Es una unidad de instalación que incluye todo lo que el sistema necesita para integrar un programa de forma ordenada. Dentro van los binarios, la lista de dependencias que requiere, información sobre el propio paquete y los mecanismos para verificar que nada se corrompió en el camino.

En Arch Linux, los paquetes tienen extensión `.tar.zst`. Eso significa que los archivos del programa fueron primero reunidos en un solo archivo con la herramienta `tar` (a eso se le llama **empaquetar**) y luego reducidos de tamaño con `zstd` (a eso se le llama **comprimir**). Puedes pensarlo como meter varias hojas en un sobre y luego aplastar el sobre para que ocupe menos espacio en el cajón.

Anteriormente se usaba otra herramienta de compresión llamada `gzip`, por eso todavía pueden encontrarse algunos paquetes con extensión `.tar.gz`. Con el tiempo estos van siendo reemplazados.

Decir que un paquete "incluye todo lo necesario" sigue siendo vago. Para entender qué significa en concreto, hay que abrirlo y ver qué hay dentro.

---

## 4. Lo que hay dentro de un paquete

Usemos Firefox como ejemplo. Su paquete se llama algo así como `firefox-88.0-1-x86_64.pkg.tar.zst`. Si lo descomprimimos y lo desempaquetamos, encontramos esta estructura:

```
firefox-88.0-1-x86_64.pkg.tar.zst   ← el paquete original
firefox-88.0-1-x86_64.pkg.tar       ← después de descomprimir
├── usr/                             ← los archivos del programa
│   └── lib/
│       └── firefox/
│           ├── firefox              ← el ejecutable principal
│           ├── libmozgtk.so
│           ├── libmozsandbox.so
│           └── ... (más archivos auxiliares)
├── .PKGINFO                         ← ficha de identidad del paquete
├── .BUILDINFO                       ← información de compilación
├── .MTREE                           ← huellas digitales de verificación
└── .INSTALL  (opcional)             ← pasos adicionales de instalación
```

> En GNU/Linux, los archivos cuyo nombre empieza con punto están ocultos por defecto. Para verlos en la terminal se usa `ls -a`.

Cada uno de estos elementos tiene un papel preciso.

### La carpeta `usr/` y la organización del sistema

Para entender qué hace esta carpeta, primero hay que entender cómo se organiza un sistema Linux.

Imagina que el disco de tu computadora es un edificio. Ese edificio tiene un único punto de entrada llamado **raíz**, que se representa con el símbolo `/`. Todos los demás archivos y carpetas del sistema cuelgan de ahí, como los pisos y habitaciones de ese edificio. La carpeta `/usr` es uno de esos pisos, y dentro de ella viven los programas instalados y sus archivos. Otra carpeta importante es `/etc`, donde viven los archivos de configuración. Otra es `/home`, donde viven los archivos personales de cada usuario. Y así con el resto.

Esta organización no es arbitraria. Está definida por un estándar llamado **FHS** (del inglés *Filesystem Hierarchy Standard*, que significa "jerarquía estándar del sistema de archivos") que todas las distribuciones Linux siguen. Gracias a que todos los sistemas usan la misma estructura, cualquier programa sabe exactamente en qué carpeta debe colocar cada uno de sus archivos al instalarse.

Volviendo al paquete de Firefox, la carpeta `usr/` dentro del paquete contiene los archivos del programa organizados exactamente como deben quedar dentro del sistema. Instalar el paquete se reduce a tomar esa carpeta y copiar su contenido en la raíz del sistema real, porque cada archivo ya sabe exactamente adónde tiene que ir según el estándar FHS.

Esto también explica por qué ejecutar el binario directamente desde el paquete no es lo mismo que instalarlo. Dentro de `usr/lib/firefox/` está el ejecutable `firefox` y podrías correrlo con el comando `./firefox`, y el navegador abriría sin problema. Pero el sistema no sabría que Firefox está instalado. No aparecería en el menú de aplicaciones, no podrías desinstalarlo limpiamente, y otros programas que necesiten encontrar Firefox no podrían hacerlo.

La instalación no es solo copiar archivos. Es también registrar que ese programa existe, dónde está y qué necesita. Para eso sirven los demás archivos del paquete.

### El archivo `.PKGINFO`

Es un archivo de texto que funciona como la ficha de identidad del paquete. Guarda el nombre, la versión, el tipo de procesador para el que fue compilado, el mantenedor, la licencia y la lista de otros paquetes que este necesita para funcionar. Es la información que el sistema consulta cuando quiere saber qué tiene instalado y en qué versión.

### El archivo `.MTREE`

Contiene **hashes criptográficos** de todos los archivos del paquete. Un hash es una huella digital matemática, un número calculado a partir del contenido exacto de un archivo. Si ese archivo cambia aunque sea en un solo carácter, el número resultante es completamente diferente. Piénsalo como el peso de una caja: si alguien cambia su contenido aunque sea por un objeto pequeño, la báscula lo detecta al instante. Este mecanismo permite verificar que el paquete no fue alterado ni corrompido durante la descarga. Si alguien intentara colar código malicioso modificando un archivo, el hash no coincidiría y la instalación quedaría rechazada.

### El archivo `.BUILDINFO`

Registra el entorno exacto en que fue compilado el paquete, incluyendo qué versión del compilador se usó y qué herramientas auxiliares estaban instaladas. Sirve para garantizar que el mismo código fuente siempre produzca exactamente el mismo binario. Es un detalle técnico que como usuario no necesitas atender.

### El archivo `.INSTALL`

Algunos programas necesitan pasos adicionales al instalarse, como crear un usuario especial en el sistema, habilitar un servicio en segundo plano o actualizar ciertos archivos de configuración. Si el paquete requiere eso, incluye un script `.INSTALL` que se ejecuta automáticamente al instalar, actualizar o desinstalar. Firefox no lo necesita, pero otros paquetes sí.

Lo que revela esta anatomía es que un paquete no es solo un contenedor de archivos. Es una unidad de información completa que le dice al sistema qué está instalando, cómo verificarlo, qué necesita para funcionar y cómo deshacerlo limpiamente. Pero hay algo en esa lista de archivos que todavía no hemos explicado y que es fundamental para entender cómo funciona el sistema de dependencias que vimos antes. Son los archivos con extensión `.so` que viven junto al ejecutable de Firefox. Darles nombre y entender por qué existen en esa forma es lo que permite terminar de armar el cuadro completo.

---

## 5. Librerías y dependencias

Dentro de `usr/lib/firefox/` notaste que junto al ejecutable principal hay varios archivos con extensión `.so`. Hasta ahora los llamamos "archivos auxiliares". Es momento de darles su nombre real y entender por qué existen en esa forma.

Esos archivos son **librerías**. Una librería es un archivo que contiene funcionalidad lista para usar, que varios programas distintos pueden aprovechar sin duplicarla. En lugar de que cada programa lleve su propia versión de algo tan común como "saber mostrar una ventana en pantalla" o "saber hacer una conexión segura a internet", esa funcionalidad vive una sola vez en el sistema y cualquier programa que la necesite la toma de ahí. Eso es exactamente el tipo de dependencia que ya vimos antes.

Las librerías pueden incorporarse a un programa de dos formas.

La primera forma son las **librerías estáticas** (extensión `.a` en Linux). Cuando se compila el programa, el contenido de la librería se copia directamente dentro del ejecutable. El resultado es un archivo que lleva todo consigo y funciona solo, sin depender de nada externo. El inconveniente es que si diez programas usan la misma librería, hay diez copias idénticas ocupando espacio. Peor aún, si esa librería tiene un error de seguridad, hay que corregir y redistribuir los diez programas por separado.

La segunda forma son las **librerías dinámicas** (extensión `.so` en Linux). Aquí la librería no se copia dentro del ejecutable sino que permanece como un archivo separado en el sistema, y el programa la busca y la usa cada vez que la necesita. Una sola copia sirve a todos los programas que la requieran. Si esa librería recibe una corrección, todos los programas que dependen de ella se benefician automáticamente, sin tocar ningún ejecutable.

Los archivos `.so` dentro del paquete de Firefox son librerías dinámicas muy específicas de Firefox, por eso viajan dentro del paquete en lugar de estar en el sistema compartidas con otros programas.

Arch Linux favorece el uso de librerías dinámicas. Es la opción más eficiente, pero como ya vimos, introduce el problema de gestionar versiones y conflictos entre las dependencias de distintos programas. Ese problema es el que justifica la existencia de un gestor de paquetes. En Arch Linux, ese gestor es `pacman`.

---

## 6. De dónde vienen los paquetes

Antes de ver cómo funciona `pacman`, hay que responder la pregunta que viene siendo evidente. Si `pacman` va a descargar paquetes, ¿de dónde los obtiene?

Los paquetes viven en **repositorios**. Para entender qué es un repositorio, piensa en cómo funciona una tienda de aplicaciones en el teléfono. Cuando quieres instalar WhatsApp, tu teléfono se conecta por internet a los servidores de Apple o Google, descarga la aplicación y la instala. Tú no tienes que ir a ningún lado a buscar el archivo. La tienda lo tiene todo organizado y disponible.

Un repositorio funciona igual, pero sin la tienda gráfica. Es una computadora conectada a internet, mantenida por el proyecto Arch Linux o su comunidad, que almacena una colección de paquetes listos para instalar. Cuando ejecutas un comando de instalación, `pacman` se conecta a esa computadora, descarga el paquete que pediste junto con todas sus dependencias, y los instala en tu sistema. Todo desde la terminal, y puedes ver exactamente qué está pasando en cada paso.

### Los repositorios oficiales

Arch Linux mantiene tres repositorios estables y tres de pruebas:

| Repositorio | Qué contiene |
|---|---|
| `core` | El núcleo del sistema. Incluye el kernel de Linux (el programa fundamental que permite que el hardware y el software se comuniquen), las herramientas básicas de la terminal y los gestores de arranque (los programas que inician el sistema cuando enciendes la computadora). Sin estos paquetes, Arch no arranca. |
| `extra` | Todo lo demás: entornos de escritorio (el conjunto de ventanas, menús y herramientas visuales que conforman la interfaz gráfica, como GNOME o KDE), navegadores, reproductores multimedia, herramientas de desarrollo y mucho más. Desde mayo de 2023 también contiene lo que antes estaba en el repositorio `community`. |
| `multilib` | Librerías especiales para ejecutar programas diseñados para procesadores más antiguos de 32 bits en computadoras modernas de 64 bits. Los procesadores modernos pueden ejecutar ambos tipos de programas, pero necesitan estas librerías adicionales para hacerlo. Ejemplos de programas que lo requieren son Steam y Wine. No está activado por defecto. |
| `core-testing` | Versiones de paquetes de `core` que todavía se están probando antes de liberarlas al público general. No recomendado para uso diario porque pueden tener errores. |
| `extra-testing` | Lo mismo pero para paquetes de `extra`. |
| `multilib-testing` | Lo mismo pero para paquetes de `multilib`. |

Para la mayoría de los usuarios, los únicos repositorios relevantes son `core`, `extra` y (si se necesita) `multilib`. Los de pruebas solo tienen sentido si quieres contribuir a Arch reportando errores.

> **Si llevas un tiempo usando Arch:** hasta mayo de 2023 existía un repositorio llamado `[community]`. Fue fusionado con `[extra]` en esa fecha y eliminado definitivamente en marzo de 2025. Si tu archivo de configuración `/etc/pacman.conf` todavía lo referencia, elimina esas líneas; de lo contrario `pacman` mostrará errores al sincronizar.

Más información en: https://wiki.archlinux.org/title/Official_repositories_(Español)

### El AUR

Los repositorios oficiales no contienen todo el software que existe. Para el resto existe el **AUR** (Arch User Repository), una plataforma donde cualquier persona puede publicar instrucciones para construir paquetes. A diferencia de los repositorios oficiales, el AUR no distribuye paquetes ya compilados, sino las recetas para construirlos. Son archivos llamados `PKGBUILD` (que veremos más adelante con detalle) que puedes usar para compilar el programa tú mismo en tu propia máquina. El AUR contiene decenas de miles de paquetes, lo que explica en parte por qué Arch tiene fama de tener software disponible para casi cualquier necesidad.

La contrapartida es que cualquier persona puede publicar en el AUR sin revisión previa, así que antes de usar un `PKGBUILD` conviene revisarlo, especialmente en paquetes poco populares.

`pacman` no puede acceder al AUR directamente. Para eso existen herramientas como `yay` o `paru`, que funcionan igual que `pacman` pero extienden su alcance al AUR.

Con el origen de los paquetes claro, ya tenemos todas las piezas necesarias para entender cómo `pacman` las coordina.

---

## 7. Pacman en la práctica

`pacman` es el programa que une todo lo que hemos construido hasta aquí. Conoce los repositorios, descarga los paquetes, lee el `.PKGINFO` de cada uno para resolver el árbol de dependencias, verifica cada descarga contra los hashes del `.MTREE`, instala cada archivo en el lugar que le corresponde según el estándar FHS y lleva un registro de todo en su **base de datos local**.

Esa base de datos es simplemente un conjunto de archivos que `pacman` guarda en tu computadora para recordar qué paquetes están instalados, en qué versión, y qué dependencias tiene cada uno. No es nada que necesites manipular directamente. `pacman` la consulta y actualiza automáticamente en cada operación. Lo que sí importa es que es gracias a ella que `pacman` puede después actualizar lo que tiene versiones nuevas, desinstalar lo que ya no se necesita y verificar que todo esté en orden.

Todo esto sucede en la terminal. Antes de ver los comandos uno por uno, conviene entender cómo están construidos, porque todos siguen la misma lógica.

Cada comando de `pacman` tiene la forma `pacman -Algo`. La letra mayúscula que va después del guión indica la **operación principal**, es decir, qué categoría de acción quieres realizar. Las letras minúsculas que pueden seguirle son **modificadores** que ajustan el comportamiento de esa operación. Por ejemplo, `-S` es la operación de sincronización con los repositorios, y añadirle `y` o `u` cambia exactamente qué hace dentro de esa categoría. `-R` es la operación de eliminación, y añadirle `n` o `s` determina qué tan profunda es esa eliminación.

Con esa lógica en mente, los comandos dejan de parecer secuencias arbitrarias de letras y empiezan a leerse como instrucciones. Lo que sigue es un flujo de trabajo completo, desde buscar un programa hasta desinstalarlo.

### S: sincronizar e instalar

La operación `-S` es la que más usarás. Su función central es comunicarse con los repositorios, y dependiendo de los modificadores que le agregues hace cosas distintas dentro de esa misma categoría.

`pacman` guarda en tu computadora un catálogo con la lista de todos los paquetes disponibles en los repositorios. Así puede responder búsquedas sin conectarse a internet en cada consulta. El problema es que ese catálogo envejece: los repositorios se actualizan constantemente y tu copia local no se entera sola. Si está desactualizada, `pacman` podría mostrarte versiones antiguas o no encontrar paquetes que ya existen. Por eso lo primero siempre es actualizarlo, usando `-S` con el modificador `y`, que significa "sincroniza":

```bash
sudo pacman -Sy
```

La salida muestra cada repositorio y cuánta información descargó:

```
:: Sincronizando las bases de datos de los paquetes...
 core        1600.8 KiB  238 MiB/s  100%
 extra          5.5 MiB  925 KiB/s  100%
 multilib    150.4 KiB  4.90 MiB/s  100%
```

Si un repositorio ya estaba al día desde la última sincronización, aparece "está actualizado" y no descarga nada.

Ahora bien, sincronizar la base de datos con `-Sy` por sí solo puede ser peligroso si después se instala algo. El motivo es el siguiente: en cuanto sincronizas, `pacman` ya sabe que existen versiones nuevas de ciertas librerías, pero tu sistema todavía tiene las versiones anteriores. Si instalas un programa que ya espera las versiones nuevas, `pacman` intentará combinarlo con librerías más antiguas de lo que ese programa requiere, lo que puede romper cosas. La solución es agregar el modificador `u`, que significa "actualiza" (*upgrade*), y así ejecutar sincronización y actualización de todo el sistema en un solo paso:

```bash
sudo pacman -Syu
```

Este es el comando que debes ejecutar siempre antes de instalar cualquier cosa. Deja el sistema al día y garantiza que cualquier instalación nueva encaje correctamente con lo que ya tienes.

Con el sistema actualizado, puedes buscar un programa. Para eso se usa `-S` con el modificador `s`, que significa "busca" (*search*):

```bash
pacman -Ss video editor
```

`pacman` buscará paquetes cuyo nombre o descripción contenga esas palabras. Los nombres y descripciones están casi siempre en inglés, así que las búsquedas dan mejores resultados cuando se escriben en ese idioma. El resultado se ve así:

```
extra/kdenlive 21.04.0-1 (kde-applications kde-multimedia)
    A non-linear video editor for Linux using the MLT video framework
extra/openshot 2.5.1-3
    An award-winning free and open-source video editor
extra/shotcut 21.03.21-1
    Cross-platform Qt based Video Editor
```

El formato es `repositorio/nombre versión (grupos)`, seguido de la descripción. Supongamos que kdenlive parece lo que buscamos. Antes de instalarlo conviene revisar su ficha. Para eso se usa `-S` con el modificador `i`, que significa "información":

```bash
pacman -Si kdenlive
```

La salida muestra los datos del `.PKGINFO` del paquete:

```
Repositorio            : extra
Nombre                 : kdenlive
Versión                : 21.04.0-1
Descripción            : A non-linear video editor for Linux using the MLT video framework
Arquitectura           : x86_64
Depende de             : qt5-networkauth  knewstuff  knotifyconfig  kfilemetadata  mlt  ...
Dependencias opcionales: ffmpeg: para soporte de FFmpeg
                         vlc: para previsualización de DVD
                         opencv: para seguimiento de movimiento
Tamaño de la descarga  : 12.02 MiB
Tamaño de instalación  : 62.96 MiB
Encargado              : Antonio Rojas <arojas@archlinux.org>
```

El campo **"Depende de"** lista las librerías y programas que kdenlive necesita. `pacman` los instalará automáticamente si no los tienes. Para proceder con la instalación, `-S` se usa sin modificadores adicionales, seguido del nombre del paquete:

```bash
sudo pacman -S kdenlive
```

`pacman` resuelve el árbol completo de dependencias, verifica que nada entre en conflicto con lo que ya tienes instalado y muestra un resumen antes de hacer cualquier cambio:

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

Escribes `s` y presionas Enter. `pacman` descarga los 30 paquetes, verifica la integridad de cada uno contra el `.MTREE` y los instala en el orden correcto para que ninguna dependencia falte cuando otra la necesite.

Por último, `-S` también permite descargar un paquete sin instalarlo, usando el modificador `w`:

```bash
sudo pacman -Sw kdenlive
```

El paquete y sus dependencias se guardan en la **caché**, que es la carpeta `/var/cache/pacman/pkg/`. La caché es simplemente un espacio donde `pacman` guarda copias de todo lo que descarga, por si hacen falta de nuevo sin tener que ir a internet. Si alguna actualización introduce un error y necesitas volver a una versión anterior de un programa, `pacman` puede usar esa copia guardada directamente. La desventaja es que la caché crece con el tiempo. Para limpiarla se usa `-S` con el modificador `c`:

```bash
sudo pacman -Sc     # elimina de la caché lo que ya no está instalado
sudo pacman -Scc    # elimina toda la caché
```

En condiciones normales, `-Sc` es suficiente.

### R: eliminar paquetes

La operación `-R` se encarga de desinstalar. Usada sola elimina solo el paquete indicado, pero con los modificadores `n` y `s` la desinstalación es más completa:

```bash
sudo pacman -Rns kdenlive
```

La `s` indica que también se eliminen las dependencias que se instalaron junto con el paquete y que ningún otro programa necesita. La `n` indica que también se eliminen los archivos de configuración que el programa haya dejado en el sistema. El resultado es una desinstalación que no deja rastros.

### U: instalar desde un archivo local

La operación `-U` instala un paquete directamente desde un archivo en tu computadora, sin buscarlo en los repositorios. Es útil cuando tienes un paquete que descargaste manualmente, compilaste desde el AUR, o recuperaste de la caché:

```bash
sudo pacman -U /ruta/al/archivo.pkg.tar.zst
```

### Q: consultar lo que tienes instalado

La operación `-Q` trabaja únicamente con la base de datos local de `pacman`, sin conectarse a ningún repositorio. Sirve para inspeccionar el estado de tu sistema.

Usada con el nombre de un paquete, comprueba si está instalado y en qué versión:

```bash
pacman -Q firefox
```

Con el modificador `s` busca entre los paquetes instalados, igual que `-Ss` pero sin salir a los repositorios:

```bash
pacman -Qs término
```

Con el modificador `i` muestra la ficha completa de un paquete ya instalado, leyendo su `.PKGINFO` desde la base de datos local:

```bash
pacman -Qi firefox
```

Con el modificador `d` lista todos los paquetes que fueron instalados como dependencias de otro. Y combinando `d` con `t` ("no requerido", de *not required*) obtiene los **paquetes huérfanos**: dependencias que se instalaron para algo que ya no está y que hoy nadie necesita:

```bash
pacman -Qdt
```

Con el modificador `m` lista los paquetes instalados desde fuera de los repositorios oficiales, como los que compilaste desde el AUR:

```bash
pacman -Qm
```

### D: verificar la base de datos

La operación `-D` trabaja directamente sobre la base de datos local de `pacman`. Su uso más frecuente es comprobar que todo esté en orden con el modificador `k`:

```bash
pacman -Dk
```

Revisa que todos los paquetes instalados tengan sus archivos en su lugar y que las dependencias estén satisfechas. Duplicando el modificador con `-Dkk` hace además una verificación cruzada contra los repositorios remotos para detectar inconsistencias más profundas.

---

## 8. Mantener el sistema en buen estado

Más allá de instalar y actualizar, hay dos tareas periódicas que convienen para que el sistema no acumule basura.

### Limpiar paquetes huérfanos

Cuando desinstalamos un programa con `-Rns`, `pacman` elimina sus dependencias siempre que ningún otro programa las necesite. Pero con el tiempo pueden quedar dependencias que nadie usa, instaladas originalmente para algo que ya no está. Ya vimos que `-Qdt` las lista. Para eliminarlas todas de una vez:

```bash
sudo pacman -Rns $(pacman -Qdtq)
```

El fragmento `$(pacman -Qdtq)` es una forma de decirle a la terminal "ejecuta este comando y usa su resultado como argumento del comando exterior". `-Qdtq` es igual que `-Qdt` pero devuelve solo los nombres, sin información extra, para que `-Rns` pueda procesarlos directamente.

Antes de ejecutarlo, revisa la lista con `pacman -Qdt` para asegurarte de que ninguno de esos paquetes es algo que uses directamente.

### Verificar la integridad del sistema

Si sospechas que algo anda mal (programas que no arrancan, errores extraños, conflictos inexplicables), ya vimos que `-Dk` revisa el estado de la base de datos local. Es el primer comando que conviene ejecutar ante cualquier problema difícil de diagnosticar.

---

## 9. Cómo se fabrica un paquete

Esta sección cierra el círculo. Ya sabemos qué contiene un paquete, de dónde viene y cómo se instala. Lo que queda es entender cómo se construye, porque ese proceso es lo que explica por qué todos los paquetes tienen exactamente la misma estructura, y por qué eso es lo que hace posible que `pacman` los gestione de forma coherente sin importar quién los haya creado.

### El PKGBUILD

Todo paquete Arch nace de un archivo llamado **PKGBUILD**. Para entender qué es, hay que entender primero qué es un script.

Un **script** es un archivo de texto con una lista de instrucciones que la terminal puede ejecutar de forma automática, una tras otra, como si alguien las estuviera escribiendo a mano. Es la forma más simple de automatizar una tarea que de otro modo requeriría muchos pasos manuales.

El PKGBUILD es un script que funciona como receta de construcción de un paquete. Especifica el nombre del programa, su versión, la dirección web de donde descargar el código fuente, qué dependencias necesita, cómo compilarlo y qué archivos incluir en el paquete final. Para crear un PKGBUILD se parte de una plantilla en blanco que viene en `/usr/share/pacman/` y se rellena con la información del programa, de forma similar a completar un formulario.

### makepkg

Con el PKGBUILD listo, la construcción se lanza con un comando ejecutado desde la misma carpeta donde está el PKGBUILD:

```bash
makepkg
```

Este script de cerca de 1500 líneas lee el PKGBUILD y hace todo el trabajo. Descarga el código fuente, verifica su integridad, lo compila siguiendo las instrucciones, empaqueta y comprime los binarios resultantes y genera todos los archivos de metadatos (`.PKGINFO`, `.MTREE`, `.BUILDINFO`, etc.).

El resultado es un archivo `.tar.zst`, es decir, un paquete Arch completo listo para instalar con `pacman -U`.

Lo esencial aquí no son los detalles técnicos de `makepkg`, sino su consecuencia. Todos los paquetes Arch se construyen exactamente de la misma manera. Esa uniformidad es lo que hace posible que `pacman` pueda comparar paquetes, resolver dependencias y gestionar el sistema de forma coherente. Independientemente de si el paquete lo hizo el equipo de Arch, un voluntario de la comunidad o tú mismo, el resultado sigue la misma estructura que `pacman` sabe leer.

El script `makepkg` completo está disponible en:  
https://git.archlinux.org/pacman.git/tree/scripts/makepkg.sh.in

---

## 10. Instalación manual de emergencia

Hay un caso extremo que vale la pena conocer, aunque es muy improbable que lo necesites, porque ilustra con claridad por qué el sistema funciona como funciona.

Dado que la carpeta `usr/` dentro de un paquete refleja exactamente la estructura FHS del sistema, es posible instalar un paquete manualmente sin `pacman`. Los paquetes Arch tienen extensión `.tar.zst`, así que primero hay que descomprimirlos y luego extraerlos en la raíz `/`:

```bash
unzstd paquete.pkg.tar.zst
tar -xf paquete.pkg.tar -C /
```

La herramienta `tar` preserva las rutas de cada archivo dentro del paquete, así que al extraer en `/`, cada archivo va exactamente adonde corresponde según el estándar FHS.

¿Cuándo podría necesitarse? Imagina que por algún error `pacman` fue eliminado del sistema. No puedes reinstalarlo usando `pacman` porque ya no existe. Pero puedes descargar el paquete de `pacman` desde otro equipo o desde un teléfono, transferirlo a tu computadora y extraerlo en la raíz, reinstalándolo sin necesitar ningún gestor de paquetes.

Esto no debe usarse en condiciones normales. Al instalar así, `pacman` no registra el paquete en su base de datos, no verifica dependencias, no ejecuta el `.INSTALL` y no tiene forma de saber que ese programa está instalado. Resérvalo para emergencias reales.

---

## Referencia rápida

Todos los comandos de `pacman` siguen la misma lógica: una letra mayúscula indica la operación principal, y las letras minúsculas que le siguen son modificadores que ajustan su comportamiento.

### Operación -S: repositorios e instalación

| Comando | Qué hace |
|---|---|
| `sudo pacman -Syu` | Sincroniza el catálogo local y actualiza todo el sistema ← ejecutar siempre antes de instalar |
| `pacman -Ss término` | Busca paquetes en los repositorios por nombre o descripción |
| `pacman -Si paquete` | Muestra la ficha de un paquete disponible en los repositorios |
| `sudo pacman -S paquete` | Instala un paquete y todas sus dependencias |
| `sudo pacman -Sw paquete` | Descarga un paquete sin instalarlo (lo guarda en la caché) |
| `sudo pacman -Sc` | Elimina de la caché los paquetes que ya no están instalados |
| `sudo pacman -Scc` | Vacía toda la caché |

### Operación -R: desinstalar

| Comando | Qué hace |
|---|---|
| `sudo pacman -Rns paquete` | Desinstala el paquete, sus dependencias huérfanas y sus archivos de configuración ← recomendado |
| `sudo pacman -Rs paquete` | Como el anterior pero conserva los archivos de configuración |
| `sudo pacman -R paquete` | Solo elimina el paquete, deja todo lo demás |

### Operación -U: instalar desde archivo local

| Comando | Qué hace |
|---|---|
| `sudo pacman -U archivo.pkg.tar.zst` | Instala un paquete desde un archivo en tu computadora |

### Operación -Q: consultar lo instalado

| Comando | Qué hace |
|---|---|
| `pacman -Q paquete` | Comprueba si el paquete está instalado y en qué versión |
| `pacman -Qs término` | Busca entre los paquetes instalados |
| `pacman -Qi paquete` | Muestra la ficha completa de un paquete instalado |
| `pacman -Qdt` | Lista los paquetes huérfanos (dependencias que ya nadie necesita) |
| `pacman -Qm` | Lista los paquetes instalados desde fuera de los repositorios oficiales |

### Operación -D: verificar la base de datos

| Comando | Qué hace |
|---|---|
| `pacman -Dk` | Verifica que todos los paquetes instalados estén en orden |
| `pacman -Dkk` | Como el anterior pero también cruza contra los repositorios remotos |

---

## Para seguir aprendiendo

La wiki de Arch Linux es uno de los recursos de documentación técnica más completos del mundo Linux. Aunque está escrita para Arch, gran parte de su contenido aplica a cualquier distribución:

- Página principal: https://wiki.archlinux.org
- Pacman a fondo: https://wiki.archlinux.org/title/Pacman_(Español)
- Repositorios oficiales: https://wiki.archlinux.org/title/Official_repositories_(Español)
- El AUR: https://wiki.archlinux.org/title/Arch_User_Repository_(Español)
- PKGBUILD: https://wiki.archlinux.org/title/PKGBUILD_(Español)

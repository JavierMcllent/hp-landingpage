# El pod del hero: qué archivos van aquí

Esta carpeta guarda la pieza de video del hero. El `index.html` la llama por nombre, así que
**reemplazar el video es sustituir archivos con estos nombres exactos, sin tocar el HTML.**

| Archivo | Qué es | Lo lee |
|---|---|---|
| `hero-pod.mp4` | HEVC con canal alfa | Safari y iOS |
| `hero-pod.webm` | VP9 con canal alfa | Chrome, Firefox, Edge |
| `hero-pod.webp` | El póster, la imagen fija | Todos, mientras carga el video |

Los tres tienen que mostrar el mismo cuadro y medir lo mismo. El póster no es opcional: es lo
primero que pinta la página y lo que queda si el video no llega.

## El orden importa, y ya está puesto en el HTML

En `index.html` el `.mp4` va listado antes que el `.webm`. No es un capricho: Safari sabe
reproducir el WebM pero **no sabe leer su transparencia**, así que si lo toma, descarta el canal
alfa y rellena el fondo de negro. Poniendo el `.mp4` primero, Safari se queda con el suyo y nunca
llega al otro.

Por eso, mientras falte `hero-pod.mp4`, en iPhone y en Safari de Mac el pod se ve dentro de un
rectángulo negro. No es un fallo del sitio: es el archivo que falta.

## Cómo se produce cada uno

El `.webm` y el póster los entrega el **Media Editor** ya listos.

El `.mp4` **solo se genera en macOS**, porque el codificador vive en el sistema de Apple. La vía
más simple no pide terminal ni Adobe, y **Media Encoder no sirve para esto**, aunque ofrezca el
formato HEVC: no expone la opción de canal alfa y exporta opaco.

1. Actívalo una vez: Ajustes del Sistema, Teclado, Funciones rápidas de teclado, Servicios,
   Archivos y carpetas, y marca **Codificar archivos de vídeo seleccionados**.
2. Clic derecho sobre el maestro `.mov` con transparencia que te pase el Media Editor, entra en
   Servicios y elige esa opción.
3. Elige HEVC y marca **Conservar transparencia**.
4. Renombra la salida a `hero-pod.mp4` y muévela a esta carpeta. El sistema entrega un `.mov`, así
   que la extensión se cambia a mano; el contenido es el correcto. **Cuida que no quede
   `hero-pod.mp4.mov`**, que es lo que pasa cuando el Finder oculta las extensiones.

### El maestro del que sale

Vive fuera de este repositorio, porque pesa y no se publica:

    Projects/Healthpod/Landing Page/Animacion Landing HP/alfa/maestro-hero-pod.mov

Son **8 segundos**, el mismo corte exacto que el `.webm` y el mismo cuadro que el póster. Si
conviertes otro archivo, las duraciones dejan de coincidir y el bucle se comporta distinto en cada
navegador.

### La alternativa con terminal

Si el servicio del Finder no aparece. Tres avisos, porque los tres fallan al copiar y pegar: no
copies las marcas de formato del bloque, sitúate antes en la carpeta del maestro, y comprueba que
los guiones sean guiones normales y no guiones largos, que es en lo que los convierten algunos
editores. El comando va en una sola línea:

    cd "/Users/javier/Library/CloudStorage/GoogleDrive-javierfkd@gmail.com/Mi unidad/Projects/Healthpod/Landing Page/Animacion Landing HP/alfa"

    ffmpeg -i maestro-hero-pod.mov -c:v hevc_videotoolbox -allow_sw 1 -alpha_quality 0.9 -vtag hvc1 -pix_fmt bgra hero-pod.mp4

Después mueve el `hero-pod.mp4` a esta carpeta.

## Cómo comprobar que quedó bien

Abre el sitio en Safari y mira el pod sobre el fondo del hero. Si lo ves recortado, con el fondo de
la página detrás, funcionó. Si aparece un rectángulo negro alrededor, el canal alfa se perdió al
exportar y hay que repetir el paso 3.

## Qué hay hoy en esta carpeta

El `.webm` y el póster corresponden a la **secuencia de construcción**, el pod ensamblándose desde
el wireframe, que es la que se eligió para el hero.

**Versión del 2026-08-31, recortada de un render sobre fondo verde**, que sustituye a la anterior,
obtenida por resta contra una placa del estudio. El cambio se nota en el flanco derecho del pod:
con la resta salía dentado, porque en el render viejo esa cara tenía la misma luminancia que el
fondo; sobre verde el borde sale continuo y el alfa ambiguo se redujo a la mitad.

Duran **8 segundos**, no 6: la animación tarda siete en completar el montaje y cortarla antes la
dejaba a medias. Sigue muy por debajo del techo de 15 que fija el canon de medios.

Bajo el plinto no hay nada: en el render original hay unos apoyos pequeños que quedan fundidos con su
propia sombra y no se pueden separar en este origen, así que la pieza corta al ras. La sombra sigue
viajando dentro del video.

El material de origen llegó por WhatsApp, a 820 kbps, así que **es una prueba y no la versión
final**. Con un render en mejor calidad, este mismo proceso da un borde más limpio todavía.

**Falta el `hero-pod.mp4`**, y hasta que exista, en Safari y en iPhone el pod se ve dentro de un
rectángulo negro. Se produce con cualquiera de las dos vías de arriba, a partir del maestro.

Cuando llegue el material regenerado sobre fondo de color, se reemplazan los tres archivos con
estos mismos nombres y el HTML no se toca.

# Feed Planner · Daniella De Mario

Grilla visual para planificar el feed de @danidemario. Una sola página, sin build ni dependencias.

**Abrir:** doble click en `index.html` (o `node .claude/serve.mjs` → http://localhost:5178).

## Pensado para ella

Los pilares, las series y el contenido de ejemplo salen del análisis de perfil (sep 2026).

- **Pilares:** 👠 MODA · 🎧 MÚSICA · 🇦🇷 BUENOS AIRES · 🥂 NOCHE · 💄 BEAUTY · 👯 AMIGAS · 🇵🇪 PERÚ · 🎨 CREATIVIDAD · 💼 MARCA.
  Las palabras clave son las suyas: *rolón, Ruta Con Ganas, repetir ropa, flequillo, vermut, Lolla, Concetta, Palermo, Hypnotic…*
- **Destacadas:** sus series con nombre propio (Uno se viste como lo que escucha, Ruta Con Ganas, Así sonó mi semanita,
  Lo mismo pero diferente, Looks diarios, Direc de Arte, Toque Concetta). Un click crea el contenido con el título,
  el formato y los pilares ya puestos.
- **Formatos:** REEL · CARRUSEL · STORY. Foto y carrusel son lo mismo, así que quedó sólo carrusel.
- **Cabecera:** la ficha de perfil de Instagram (foto, @usuario, seguidores, nombre, bio). Todo editable:
  click en la foto para cambiarla, click en cualquier texto para escribir.

## Sistema visual

El mismo que las cotizaciones de DDM:

| | |
|---|---|
| Firma | **Awesome Ways** — sólo para "Dani De Mario" |
| Display | **Awesome Serif** — números de posición, títulos de ficha y la tira |
| Texto | **Helvetica** (TeX Gyre Heros como respaldo) |
| Papel / tinta / gris / filete | `#FFFFFF` · `#151515` · `#767676` · `#E8E8EA` |
| Birome | `#1F3FD0` — el único color |

Blanco, esquinas redondeadas, sin bordes ni adornos. Emojis iOS (`assets/emoji/`) para los pilares
e íconos del propio sistema DDM (`assets/iconos/`) para los formatos. Modo oscuro con el botón *Tema*.

## Cómo funciona

- **Grilla 3 columnas** con numeración de Instagram: el **01 abajo a la derecha** (el próximo a publicar).
- Un contenido puede ser sólo texto. No hace falta imagen.
- **Arrastrar = intercambiar**: se cambian de lugar las dos tarjetas, el resto no se mueve.
  En celular: mantener apretado y arrastrar.
- **Click** en una tarjeta → ficha completa. `···` o click derecho → menú: editar, duplicar, mandar al final,
  fijar posición, mover a ideas, dejar libre y **borrar espacio** (saca la celda de la grilla).
- **Ideas sin asignar**: se escriben rápido en el panel de la derecha y se arrastran a la grilla.
  Si soltás una idea sobre una tarjeta ocupada, se intercambian.
- **Fijar posición** (📌): esa tarjeta no se mueve ni se puede pisar.
- **Tamaño**: 3 / 6 / 9 / 12 / 15 / 18 / 24, `+ Espacio` de a uno o borrando espacios sueltos.
  Si achicás, lo que había vuelve a Ideas.
- **Pilares automáticos**: se detectan por palabras clave del título y la idea; se activan o desactivan a mano
  en la ficha y se configuran en *Pilares* (nombre, emoji y palabras clave).
- **Resumen**: pilares, formatos y una observación tipo "5 de los próximos 6 contenidos son MODA".
- **Estados**: 💡 idea · 🛠 en desarrollo · ✅ listo · ✨ publicado (la tarjeta se atenúa).

## Estrategia

Cada contenido tiene una pestaña **Estrategia** en su ficha y hay una vista **Estrategia** arriba de la grilla
(el switch Feed / Estrategia) que lista los posteos en orden de publicación con el porqué a la vista.

Campos: sub-objetivo (A traer gente · B que se queden · C mostrar a marcas), **por qué** este contenido,
por qué acá, insight (Cultural / Circunstancial / De producto / Universal), qué siente, piensa y hace la persona
que lo ve, gancho, cierre, caption, táctica, cómo llega a más gente, pasos, guion base, KPI, producción y prompt de referencia.

En la grilla, cada tarjeta muestra la fecha y una pastilla **A / B / C** con su sub-objetivo. El panel
*Para qué publica* de la derecha muestra el balance entre los tres.

**Importar estrategia escrita a mano:** si las notas de un contenido usan el formato
`📅 fecha · Sub-objetivo X` + `INSIGHT:` `OBJETIVO PERSONA:` `TÁCTICA:` `GANCHO:` `CIERRE:` `KPI:` `PRODUCCIÓN:`
`OBJETIVO:` `POR QUÉ:` `POR QUÉ ACÁ:` `CÓMO…:` `PASOS:` `GUION…:` `CAPTION:` `PROMPT REFE:`,
al importar o al abrir se reparten solas en los campos (y la fecha se carga en el calendario).
El texto original queda guardado en `notesRaw` por las dudas.

## Datos

Todo se guarda en el `localStorage` del navegador (clave `feedplanner.v2`). Las imágenes se reescalan a 900px.
**Exportar** baja un `.json` de respaldo; **Importar** lo restaura o lo pasa a otra máquina.

## Sincronizar entre dispositivos

La app se puede conectar a una base de datos gratis de **Supabase** para que el feed sea el mismo
en la compu y en el teléfono. Sin conectar, funciona igual pero cada dispositivo guarda lo suyo.

**Una vez, en Supabase:**

1. Crear una cuenta en [supabase.com](https://supabase.com) y un proyecto nuevo (plan Free).
2. En **SQL Editor → New query**, pegar el contenido de [`supabase.sql`](supabase.sql) y darle *Run*.
3. En **Project Settings → API**, copiar **Project URL** y la clave **anon public**.

**En cada dispositivo:** abrir la app → botón **Local** (arriba a la derecha) → pegar la URL, la clave
y el nombre del feed (`dani`, el mismo en todos) → *Conectar*.

Desde ahí: cada cambio se sube solo (1,2 s después de tocar algo), y la app se fija si hay novedades
cada 15 segundos y cada vez que volvés a la pestaña. El punto del botón muestra el estado —
verde en la nube, azul guardando, rojo sin conexión. Mientras tenés una ficha abierta no se pisa nada.

Las claves se guardan sólo en el `localStorage` de cada dispositivo: **no se suben a GitHub**
ni viajan en el `.json` exportado.

## Publicar

El repo es público y se sirve con GitHub Pages desde la raíz: `index.html` y `assets/` con rutas
relativas, así que anda igual en un subdirectorio (`usuario.github.io/feed-planner/`).

`dist/` está ignorado: es la versión de un solo archivo (todo embebido en base64) que genera
`node .claude/inline.mjs`, para mandar por WhatsApp o usar sin internet.

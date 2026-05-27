# 📸 Imágenes requeridas

Coloca aquí los dos archivos de imagen antes de hacer `npm run build`:

| Archivo | Descripción | Tamaño recomendado |
|---|---|---|
| `background.jpg` | Imagen de fondo del Hero (fondo submarino / acuático) | 1200 × 900 px o más |
| `carta.png` | Imagen del sobre / carta de invitación | 480 × 340 px aprox. |

## Notas

- `background.jpg` aparece en el **HeroSection** como imagen de fondo a pantalla completa.
- `carta.png` aparece en el **EnvelopeSection** como el sobre que se "abre".
- Ambas imágenes admiten formatos JPG, PNG o WebP — solo actualiza la extensión en los componentes si usas un formato diferente.
- Para optimizar el peso: usa [Squoosh](https://squoosh.app/) o [TinyPNG](https://tinypng.com/).

## Mapa de Google Maps

En `components/EnvelopeSection.tsx` hay un `<iframe>` de Google Maps.
Para obtener la URL de embedding correcta:

1. Abre Google Maps en tu navegador.
2. Busca el lugar de la celebración.
3. Haz clic en **Compartir** → **Incorporar un mapa**.
4. Copia la URL del atributo `src` del `<iframe>` que aparece.
5. Reemplaza el `src` existente en el componente `EnvelopeSection.tsx`.

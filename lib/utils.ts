/**
 * GitHub Pages deploys under /Bryanna-15.
 * Use imgPath() for every public-folder image so the path is always correct
 * in both production (GitHub Pages) and local dev (basePath is set globally).
 *
 * NOTE: filenames with spaces must be passed with %20 encoding, e.g.
 *   imgPath('/images/Sirenita%20Fondo.png')
 */
export const BASE_PATH = "/Bryanna-15";

export const imgPath = (path: string): string => `${BASE_PATH}${path}`;

/**
 * Los datos de site.ts y site.en.ts pueden llevar marcadores pendientes entre
 * corchetes ("[X] min", "[N] personas", "[Tu política]"). En la web se ocultan
 * en vez de mostrarse hasta que se sustituyan por el dato real.
 */

/** true si el texto ya tiene dato real (sin marcadores tipo "[X]"). */
export const isFilled = (text: string): boolean => !text.includes('[');

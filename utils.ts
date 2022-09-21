export function applyStyleIf(predicate: boolean, css: string) {
  if (predicate) return css;
  return '';
}
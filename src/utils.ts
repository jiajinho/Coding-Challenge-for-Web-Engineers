export function applyStyleIf(predicate: boolean, css: string) {
  if (predicate) return css;
  return '';
}

export function toBase64(file: File) {
  return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);
    reader.onerror = (e) => reject(e);
  });
}
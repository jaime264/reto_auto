export function parsePrice(raw: string): number {
  // 1. Eliminar símbolos como $ y espacios no visibles
  const cleaned = raw.replace(/[^\d.]/g, '');

  // 2. Encontrar la última posición del punto
  const lastDotIndex = cleaned.lastIndexOf('.');

  if (lastDotIndex === -1) {
    // No tiene punto: devolver número entero
    return Number(cleaned);
  }

  // 3. Separar parte entera y decimal
  const integerPart = cleaned.slice(0, lastDotIndex).replace(/\./g, '');
  const decimalPart = cleaned.slice(lastDotIndex + 1);

  const final = `${integerPart}.${decimalPart}`;
  return Number(final);
}

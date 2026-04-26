/**
 * Генерирует n случайных rgba цветов
 * @param n - количество цветов
 * @param alpha - значение прозрачности (от 0 до 1)
 */
export const generateRandomRgbaColors = (
  n: number,
  alpha: number,
): string[] => {
  const colors: string[] = [];

  for (let i = 0; i < n; i++) {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    colors.push(`rgba(${r}, ${g}, ${b}, ${alpha})`);
  }

  return colors;
};

/**
 * Изменяет параметр alpha во всех rgba строках массива
 * @param rgbaArray - массив строк в формате "rgba(r, g, b, a)"
 * @param newAlpha - новое значение прозрачности
 */
export const updateAlphaInRgbaArray = (
  rgbaArray: string[],
  newAlpha: number,
): string[] => {
  // Регулярное выражение ищет последнее число перед закрывающей скобкой
  const alphaRegex = /[\d.]+(?=\s*\)$)/;

  return rgbaArray.map((color) => {
    return color.replace(alphaRegex, newAlpha.toString());
  });
};

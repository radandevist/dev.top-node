/**
 * Get n random elements from an array.
 *
 * @param arr Array to get element from.
 * @param n Number of elements to get from array, defaults to 1.
 * @returns An array containing the randomly selected elements.
 */
export function getRandomElements<T>(arr: T[], n = 1): T[] {
  const result = new Array(n);
  let len = arr.length;
  const taken = new Array(len);
  if (n > len) { throw new RangeError("getRandom: more elements taken than available"); }
  // eslint-disable-next-line no-plusplus, no-param-reassign
  while (n--) {
    const x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    // eslint-disable-next-line no-plusplus
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}

/**
 * Flips the keys an values of an object.
 *
 * @param {Record<any, any>} obj - Javascript object.
 * @returns {Record<any, any>} Flipped oject.
 * @example
 * const myObject: Record<TKey, TValue> = { ... }
 * // You have to cast type manually with the help of
 * // type assertions for the flipped object type.
 * const flippedObject = objectFlip(myObject) as Record<TValue, TKey>
 */
export function objectFlip(obj: Record<any, any>): Record<any, any> {
  const ret: Record<any, any> = {};
  Object.keys(obj).forEach((key) => {
    ret[obj[key]] = key;
  });
  return ret;
}

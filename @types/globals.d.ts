export {};

declare global {
  /**
   * An utility type for representing objects with any properties.
   */
  type AnyObj = Record<string, unknown>;

  /**
   * An utility type for representing empty objects (zero properties).
   */
  type EmptyObj = Record<string, never>;
}

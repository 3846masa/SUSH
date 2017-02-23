/**
 * `StockConfig` is config for `Stock` of SUSH.
 */
export interface StockConfig {
  /**
   * `mode` is mode of `Stock`.
   * - `'default'`
   *   - Same as Map.
   * - `'upper'`
   *   - Upper-case keys.
   * - `'lower'`
   *   - Lower-case keys.
   */
  mode: 'default' | 'upper' | 'lower';
}

/**
 * `Stock` is key/value map for SUSH.
 */
export default class Stock extends Map<string, string> {
  /** See `StockConfig`. */
  public mode: string;

  /**
   * @param config See `StockConfig`.
   */
  public constructor(
    config: StockConfig = { mode: 'default' }
  ) {
    super();
    this.mode = config.mode;
  }

  /**
   * Returns the value associated to the key.
   */
  public get(key: string): string {
    return super.get(this._convertKey(key)) || '';
  }

  /**
   * Sets the value for the key.
   */
  public set(key: string, value: string): this {
    return super.set(this._convertKey(key), value);
  }

  /**
   * Returns a boolean asserting whether a value has been associated to the key or not.
   */
  public has(key: string): boolean {
    return super.has(this._convertKey(key));
  }

  private _convertKey(key: string): string {
    if (this.mode === 'upper') {
      return key.toUpperCase();
    } else if (this.mode === 'lower') {
      return key.toLowerCase();
    } else {
      return key;
    }
  }
}

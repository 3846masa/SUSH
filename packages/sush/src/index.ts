import Stock, { StockConfig } from './Stock';

/**
 * `SUSHInfo` is params passed to `SUSHTask`.
 */
export interface SUSHInfo {
  /** `id` is the ID of shorten URL. */
  id: string;
  /** `stock` is key/value map. */
  stock: Stock;
}

/**
 * `SUSHTask` is task for SUSH.
 * @example
 * ```js
 *
 * function plugin({ id, stock }) {
 *   const newId = `new_${id}`;
 *   stock.set('anyKey', 'https://example.com');
 *   return { id: newId, stock };
 * }
 * ```
 * @example
 * ```js
 *
 * async function asyncPlugin({ id, stock }) {
 *   stock.set('anyKey', await generateUrl());
 *   return { id, stock };
 * }
 * ```
 */
export type SUSHTask =
  (info: SUSHInfo) => SUSHInfo | PromiseLike<SUSHInfo> | Promise<SUSHInfo>;

/**
 * `SUSH` is main class for SUSH.
 * @example
 * ```js
 *
 * const sush = new SUSH();
 * sush.flow([
 *   somePlugin,
 * ])
 * .catch((err) => {
 *   console.error(err);
 * });
 * ```
 */
export default class SUSH {
  /** `stock` is key/value map. */
  public stock: Stock;

  /**
   * @param config See `StockConfig`.
   */
  public constructor(config: StockConfig = { mode: 'default' }) {
    this.stock = new Stock(config);
  }

  /**
   * @param tasks Array of `SUSHTask`.
   */
  public flow(tasks: SUSHTask[]): Promise<SUSHInfo> {
    const hash = location.hash.substr(1);
    return tasks.reduce(
      (promise: Promise<SUSHInfo>, task: SUSHTask) => promise.then(task),
      Promise.resolve({ id: hash, stock: this.stock })
    );
  }
}

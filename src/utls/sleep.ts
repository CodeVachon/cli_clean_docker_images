/**
 * Milliseconds
 */
type ms = number;

/**
 * a Function used to wait.
 *
 * Useful for needing to wait between requests if a rate limit
 * is in place.
 *
 * @example ```ts
 * import {sleep} from "@utls"
 * async fn() {
 *   // so something
 *
 *   // wait for 1 second
 *   await sleep(1000);
 *
 *   // do something else
 * }
 * ```
 *
 * @param duration How long to Wait in Milliseconds
 * @returns nothing
 */
export const sleep = (duration: ms): Promise<void> =>
    new Promise((resolve) => {
        setTimeout(resolve, duration);
    });

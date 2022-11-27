import { sleep } from './sleep';

export const MAX_TRY = 3;
export const DELAY_TIME = 1000;

/**
 * Retries a promise maxTry times before rejecting.
 * @promise A promise to resolve
 * @maxTry Number of tries before rejecting
 * @delayTime Delay time in milliseconds
 */
export async function retryPromise<T>(
  promise: (...args: unknown[]) => Promise<T>,
  maxTry: number = MAX_TRY,
  delayTime: number = DELAY_TIME,
): Promise<T> {
  return await promise().catch(async (e) => {
    if (maxTry === 0) {
      return Promise.reject(e);
    }
    console.log('retrying promise', promise.name, maxTry, 'time');
    await sleep(delayTime);
    return retryPromise<T>(promise, maxTry - 1, delayTime);
  });
}

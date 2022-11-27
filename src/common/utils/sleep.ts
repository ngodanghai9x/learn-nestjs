// TODO: rewrite in class with Injectable or modules
export const sleep = (msec: number) => new Promise((resolve) => setTimeout(resolve, msec));

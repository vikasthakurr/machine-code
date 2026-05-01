export const logger = {
  info:  (msg, ...args) => console.log(`[info] ${msg}`, ...args),
  error: (msg, ...args) => console.error(`[error] ${msg}`, ...args),
  warn:  (msg, ...args) => console.warn(`[warn] ${msg}`, ...args),
};

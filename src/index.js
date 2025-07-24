const defaultCache = new Map();

/**
 * @typedef {Object} CacheEntry
 * @property {any} body
 * @property {number} timestamp
 */

/**
 * @typedef {Object} CacheOptions
 * @property {number|((req: import('express').Request) => number)} [ttl]
 * @property {(req: import('express').Request) => string} [keyGenerator]
 * @property {Map<string, CacheEntry>} [store]
 */

/**
 * Express response cache middleware
 * @param {CacheOptions} options
 */
function cacheMiddleware(options = {}) {
  const {
    ttl = 60,
    keyGenerator = (req) => req.originalUrl,
    store = defaultCache,
  } = options;

  if (!store.__cleaner) {
    store.__cleaner = setInterval(() => {
      const now = Date.now();
      for (const [key, entry] of store.entries()) {
        if (now - entry.timestamp > (typeof ttl === 'number' ? ttl : 60) * 1000) {
          store.delete(key);
        }
      }
    }, 60_000); // 60 seconds
    store.__cleaner.unref?.();
  }

  return (req, res, next) => {
    const key = keyGenerator(req);
    const ttlValue = typeof ttl === 'function' ? ttl(req) : ttl;
    const cached = store.get(key);

    if (cached && (Date.now() - cached.timestamp < ttlValue * 1000)) {
      if (process.env.NODE_ENV === 'development') {
        console.log(`[Cache HIT] ${key}`);
      }
      return res.send(cached.body);
    }

    const wrap = (send) => (body) => {
      if (res.statusCode < 400) {
        store.set(key, { body, timestamp: Date.now() });
      }
      return send.call(res, body);
    };

    res.send = wrap(res.send);
    res.json = wrap(res.json);

    return next();
  };
}

export default cacheMiddleware;

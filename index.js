const defaultCache = new Map();

function cacheMiddleware(options = {}) {
  const {
    ttl = 60,
    keyGenerator = (req) => req.originalUrl,
    store = defaultCache,
  } = options;

  return (req, res, next) => {
    const key = keyGenerator(req);
    const cached = store.get(key);

    if (cached && (Date.now() - cached.timestamp < ttl * 1000)) {
      return res.send(cached.body);
    }

    const originalSend = res.send.bind(res);
    res.send = (body) => {
      store.set(key, { body, timestamp: Date.now() });
      return originalSend(body);
    };

    next();
  };
}

export default cacheMiddleware;

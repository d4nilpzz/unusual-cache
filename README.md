<div align="center">
  <h1>Unusual Cache</h1>
  <a href="https://www.npmjs.com/package/unusual-cache"><img src="https://img.shields.io/npm/v/unusual-cache" /></a>
  <a href="https://github.com/prisma/prisma/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue" /></a>
  <a href="https://discord.d4nilpzz.dev"><img alt="Discord" src="https://img.shields.io/discord/1373385570965000292?label=Discord"></a>
  <br />
  <br />
  <a href="https://github.com/d4nilpzz/unusual-cache#instalation">Instalation</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://github.com/d4nilpzz/unusual-cache">docs</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://github.com/d4nilpzz/unusual-cache#usage">usage</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://discord.d4nilpzz.dev">discord</a>
  <br />
  <br />
</div>

### What is Unusual Cache?
Is a lightweight, pluggable caching middleware for `express.js` that brings fine-grained response caching with customizable TTL, key generation, and optional external storage backends.

## Instalation
```bash
npm install unusual-cache
```
or using yarn:
```bash
yarn add unusual-cache
```

### Usage

| Property       | Type                | Default                     | Description                                 |
| -------------- | ------------------- | --------------------------- | ------------------------------------------- |
| `ttl`          | `number`            | `60` (seconds)              | Time to live for cache entries              |
| `keyGenerator` | `(req) => string`   | `(req) => req.originalUrl`  | Function to generate cache key from request|
| `store`        | `CacheStore`        | `Map()`                     | Custom cache store implementing `.get()` and `.set()` |


```js
import cache from 'unusual-cache';

...

app.get('/data', cache({ ttl: 60 }), async (req, res) => {
  const data = await fetchExpensiveData();
  res.json(data);
});
```


import { Request, Response, NextFunction } from "express";

export interface CacheEntry {
  body: any;
  timestamp: number;
}

export interface CacheStore {
  get(key: string): CacheEntry | undefined;
  set(key: string, entry: CacheEntry): void;
  delete?(key: string): void;
  clear?(): void;
}

export interface CacheOptions {
  ttl?: number;
  keyGenerator?: (req: Request) => string;
  store?: CacheStore;
}

declare function cacheMiddleware(options?: CacheOptions): (req: Request, res: Response, next: NextFunction) => void;

export default cacheMiddleware;

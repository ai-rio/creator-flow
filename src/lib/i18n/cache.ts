import type { Locale } from '@/types/i18n';

/**
 * Simple in-memory cache for translation modules
 * Reduces file system reads for frequently accessed translations
 */
class TranslationCache {
  private cache = new Map<string, Record<string, any>>();
  private cacheTimestamps = new Map<string, number>();
  private readonly TTL = 5 * 60 * 1000; // 5 minutes in development, longer in production
  private readonly maxSize = 50; // Maximum number of cached items

  constructor() {
    // Longer TTL in production
    if (process.env.NODE_ENV === 'production') {
      (this as any).TTL = 30 * 60 * 1000; // 30 minutes
    }
  }

  /**
   * Generates a cache key for a locale and module combination
   */
  private generateKey(locale: Locale, module: string): string {
    return `${locale}:${module}`;
  }

  /**
   * Checks if a cached item is still valid
   */
  private isValid(key: string): boolean {
    const timestamp = this.cacheTimestamps.get(key);
    if (!timestamp) return false;

    return Date.now() - timestamp < this.TTL;
  }

  /**
   * Cleans up expired cache entries
   */
  private cleanup(): void {
    const now = Date.now();
    const expiredKeys: string[] = [];

    this.cacheTimestamps.forEach((timestamp, key) => {
      if (now - timestamp > this.TTL) {
        expiredKeys.push(key);
      }
    });

    expiredKeys.forEach((key) => {
      this.cache.delete(key);
      this.cacheTimestamps.delete(key);
    });
  }

  /**
   * Evicts least recently used items if cache is full
   */
  private evictLRU(): void {
    if (this.cache.size < this.maxSize) return;

    // Find the oldest entry
    let oldestKey = '';
    let oldestTimestamp = Date.now();

    this.cacheTimestamps.forEach((timestamp, key) => {
      if (timestamp < oldestTimestamp) {
        oldestTimestamp = timestamp;
        oldestKey = key;
      }
    });

    if (oldestKey) {
      this.cache.delete(oldestKey);
      this.cacheTimestamps.delete(oldestKey);
    }
  }

  /**
   * Gets a cached translation module
   */
  get(locale: Locale, module: string): Record<string, any> | null {
    const key = this.generateKey(locale, module);

    if (!this.cache.has(key) || !this.isValid(key)) {
      return null;
    }

    // Update timestamp for LRU
    this.cacheTimestamps.set(key, Date.now());
    return this.cache.get(key) || null;
  }

  /**
   * Caches a translation module
   */
  set(locale: Locale, module: string, data: Record<string, any>): void {
    const key = this.generateKey(locale, module);

    // Clean up expired entries and evict LRU if needed
    this.cleanup();
    this.evictLRU();

    this.cache.set(key, data);
    this.cacheTimestamps.set(key, Date.now());
  }

  /**
   * Clears the entire cache
   */
  clear(): void {
    this.cache.clear();
    this.cacheTimestamps.clear();
  }

  /**
   * Clears cache for a specific locale
   */
  clearLocale(locale: Locale): void {
    const keysToDelete: string[] = [];

    this.cache.forEach((_, key) => {
      if (key.startsWith(`${locale}:`)) {
        keysToDelete.push(key);
      }
    });

    keysToDelete.forEach((key) => {
      this.cache.delete(key);
      this.cacheTimestamps.delete(key);
    });
  }

  /**
   * Gets cache statistics
   */
  getStats() {
    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      ttl: this.TTL,
      keys: Array.from(this.cache.keys()),
    };
  }
}

// Singleton instance
export const translationCache = new TranslationCache();

/**
 * Enhanced module loader with caching
 */
export async function loadModuleWithCache(locale: Locale, moduleName: string): Promise<Record<string, any>> {
  // Check cache first
  const cached = translationCache.get(locale, moduleName);
  if (cached) {
    console.log(`🚀 CACHE HIT - ${locale}:${moduleName}`);
    return cached;
  }

  console.log(`🚀 CACHE MISS - Loading ${locale}:${moduleName}`);

  try {
    // Load the module
    const moduleData = await import(`../../../locales/${locale}/${moduleName}.json`);
    const data = moduleData.default || {};

    // Cache the result
    translationCache.set(locale, moduleName, data);

    return data;
  } catch (error) {
    console.error(`Failed to load module ${locale}:${moduleName}:`, error);
    return {};
  }
}

/**
 * Preloads critical translation modules for better performance
 */
export async function preloadCriticalTranslations(locale: Locale): Promise<void> {
  const criticalModules = ['common', 'auth', 'errors'];

  const preloadPromises = criticalModules.map(async (module) => {
    try {
      await loadModuleWithCache(locale, module);
    } catch (error) {
      console.warn(`Failed to preload ${locale}:${module}:`, error);
    }
  });

  await Promise.allSettled(preloadPromises);
  console.log(`🚀 PRELOADED critical translations for ${locale}`);
}

/**
 * Warmup cache with all locales for a specific module
 */
export async function warmupModule(moduleName: string, locales: readonly Locale[]): Promise<void> {
  const warmupPromises = locales.map(async (locale) => {
    try {
      await loadModuleWithCache(locale, moduleName);
    } catch (error) {
      console.warn(`Failed to warmup ${locale}:${moduleName}:`, error);
    }
  });

  await Promise.allSettled(warmupPromises);
  console.log(`🚀 WARMED UP module "${moduleName}" for all locales`);
}

#!/usr/bin/env bun

/**
 * Translation Validation Utility for CreatorFlow
 *
 * Validates translation completeness across all language files
 * Ensures atomic design convention compliance
 * Provides detailed reporting for missing or inconsistent keys
 */

import { existsSync, readdirSync, readFileSync } from 'fs';
import { join } from 'path';

interface TranslationError {
  type: 'missing' | 'inconsistent' | 'malformed';
  locale: string;
  key: string;
  message: string;
  file?: string;
}

interface ValidationResult {
  success: boolean;
  errors: TranslationError[];
  warnings: TranslationError[];
  summary: {
    totalKeys: number;
    locales: string[];
    missingKeys: number;
    inconsistentKeys: number;
    malformedKeys: number;
  };
}

class TranslationValidator {
  private messagesDir = join(process.cwd(), 'src/messages');
  private supportedLocales = ['en', 'es', 'pt-br'];
  private errors: TranslationError[] = [];
  private warnings: TranslationError[] = [];

  /**
   * Main validation entry point
   */
  async validate(): Promise<ValidationResult> {
    console.log('🚀 Starting translation validation...\n');

    this.errors = [];
    this.warnings = [];

    // Load all translation files
    const translations = this.loadAllTranslations();

    // Validate file existence
    this.validateFileExistence();

    // Validate key completeness
    this.validateKeyCompleteness(translations);

    // Validate atomic design conventions
    this.validateAtomicConventions(translations);

    // Validate value consistency
    this.validateValueConsistency(translations);

    // Generate summary
    const allKeys = this.getAllKeys(translations);
    const summary = {
      totalKeys: allKeys.length,
      locales: this.supportedLocales,
      missingKeys: this.errors.filter((e) => e.type === 'missing').length,
      inconsistentKeys: this.errors.filter((e) => e.type === 'inconsistent').length,
      malformedKeys: this.errors.filter((e) => e.type === 'malformed').length,
    };

    this.printResults(summary);

    return {
      success: this.errors.length === 0,
      errors: this.errors,
      warnings: this.warnings,
      summary,
    };
  }

  /**
   * Load all translation files
   */
  private loadAllTranslations(): Record<string, any> {
    const translations: Record<string, any> = {};

    for (const locale of this.supportedLocales) {
      const filePath = join(this.messagesDir, `${locale}.json`);

      try {
        const content = readFileSync(filePath, 'utf-8');
        translations[locale] = JSON.parse(content);
        console.log(`✅ Loaded ${locale}.json`);
      } catch (error) {
        this.errors.push({
          type: 'malformed',
          locale,
          key: '',
          message: `Failed to load ${locale}.json: ${error}`,
          file: filePath,
        });
        console.log(`❌ Failed to load ${locale}.json`);
      }
    }

    return translations;
  }

  /**
   * Validate that all required translation files exist
   */
  private validateFileExistence(): void {
    for (const locale of this.supportedLocales) {
      const filePath = join(this.messagesDir, `${locale}.json`);

      if (!existsSync(filePath)) {
        this.errors.push({
          type: 'missing',
          locale,
          key: '',
          message: `Translation file ${locale}.json does not exist`,
          file: filePath,
        });
      }
    }
  }

  /**
   * Validate that all keys exist in all locales
   */
  private validateKeyCompleteness(translations: Record<string, any>): void {
    const allKeys = this.getAllKeys(translations);

    for (const key of allKeys) {
      for (const locale of this.supportedLocales) {
        if (!translations[locale]) continue;

        const value = this.getNestedValue(translations[locale], key);

        if (value === undefined) {
          this.errors.push({
            type: 'missing',
            locale,
            key,
            message: `Missing translation key: ${key}`,
          });
        }
      }
    }
  }

  /**
   * Validate atomic design convention compliance
   */
  private validateAtomicConventions(translations: Record<string, any>): void {
    const atomicKeyPattern = /^components\.atomic\.(atoms|molecules|organisms|compositions)\./;

    for (const [locale, content] of Object.entries(translations)) {
      if (!content) continue;

      const componentKeys = this.findKeysByPattern(content, 'components');

      for (const key of componentKeys) {
        if (key.startsWith('components.atomic.')) {
          // Validate atomic convention
          if (!atomicKeyPattern.test(key)) {
            this.warnings.push({
              type: 'inconsistent',
              locale,
              key,
              message: `Key does not follow atomic design convention: ${key}`,
            });
          }

          // Validate level classification
          const parts = key.split('.');
          if (parts.length < 4) {
            this.warnings.push({
              type: 'malformed',
              locale,
              key,
              message: `Atomic key missing component level or name: ${key}`,
            });
          }
        }
      }
    }
  }

  /**
   * Validate value consistency across locales
   */
  private validateValueConsistency(translations: Record<string, any>): void {
    const allKeys = this.getAllKeys(translations);

    for (const key of allKeys) {
      const values: Record<string, any> = {};

      // Collect values for this key across all locales
      for (const locale of this.supportedLocales) {
        if (!translations[locale]) continue;
        values[locale] = this.getNestedValue(translations[locale], key);
      }

      // Check for placeholder consistency
      this.validatePlaceholders(key, values);

      // Check for empty values
      this.validateNonEmptyValues(key, values);
    }
  }

  /**
   * Validate placeholder consistency ({variable} patterns)
   */
  private validatePlaceholders(key: string, values: Record<string, any>): void {
    const placeholderPattern = /\{(\w+)\}/g;
    let baselineplaceholders: string[] | null = null;

    for (const [locale, value] of Object.entries(values)) {
      if (typeof value !== 'string') continue;

      const placeholders = [...value.matchAll(placeholderPattern)].map((match) => match[1]);

      if (baselineplaceholders === null) {
        baselineplaceholders = placeholders;
      } else {
        const missing = baselineplaceholders.filter((p) => !placeholders.includes(p));
        const extra = placeholders.filter((p) => !baselineplaceholders.includes(p));

        if (missing.length > 0 || extra.length > 0) {
          this.warnings.push({
            type: 'inconsistent',
            locale,
            key,
            message: `Placeholder mismatch in key ${key}. Missing: [${missing.join(', ')}], Extra: [${extra.join(
              ', '
            )}]`,
          });
        }
      }
    }
  }

  /**
   * Validate that values are not empty
   */
  private validateNonEmptyValues(key: string, values: Record<string, any>): void {
    for (const [locale, value] of Object.entries(values)) {
      if (value === '' || (typeof value === 'string' && value.trim() === '')) {
        this.warnings.push({
          type: 'malformed',
          locale,
          key,
          message: `Empty translation value for key: ${key}`,
        });
      }
    }
  }

  /**
   * Get all unique keys across all translations
   */
  private getAllKeys(translations: Record<string, any>): string[] {
    const allKeys = new Set<string>();

    for (const content of Object.values(translations)) {
      if (content) {
        this.collectKeys(content, '', allKeys);
      }
    }

    return Array.from(allKeys).sort();
  }

  /**
   * Recursively collect all keys from nested object
   */
  private collectKeys(obj: any, prefix: string, keys: Set<string>): void {
    for (const [key, value] of Object.entries(obj)) {
      const fullKey = prefix ? `${prefix}.${key}` : key;

      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        this.collectKeys(value, fullKey, keys);
      } else {
        keys.add(fullKey);
      }
    }
  }

  /**
   * Get nested value from object using dot notation
   */
  private getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  }

  /**
   * Find all keys matching a pattern
   */
  private findKeysByPattern(obj: any, pattern: string, prefix = ''): string[] {
    const keys: string[] = [];

    for (const [key, value] of Object.entries(obj)) {
      const fullKey = prefix ? `${prefix}.${key}` : key;

      if (fullKey.includes(pattern)) {
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          keys.push(...this.findKeysByPattern(value, pattern, fullKey));
        } else {
          keys.push(fullKey);
        }
      } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        keys.push(...this.findKeysByPattern(value, pattern, fullKey));
      }
    }

    return keys;
  }

  /**
   * Print validation results
   */
  private printResults(summary: ValidationResult['summary']): void {
    console.log('\n' + '='.repeat(50));
    console.log('📊 TRANSLATION VALIDATION RESULTS');
    console.log('='.repeat(50));

    console.log(`\n📈 Summary:`);
    console.log(`  Total Keys: ${summary.totalKeys}`);
    console.log(`  Locales: ${summary.locales.join(', ')}`);
    console.log(`  Missing Keys: ${summary.missingKeys}`);
    console.log(`  Inconsistent Keys: ${summary.inconsistentKeys}`);
    console.log(`  Malformed Keys: ${summary.malformedKeys}`);

    if (this.errors.length > 0) {
      console.log(`\n❌ Errors (${this.errors.length}):`);
      this.errors.forEach((error, index) => {
        console.log(`  ${index + 1}. [${error.locale}] ${error.key}: ${error.message}`);
      });
    }

    if (this.warnings.length > 0) {
      console.log(`\n⚠️  Warnings (${this.warnings.length}):`);
      this.warnings.forEach((warning, index) => {
        console.log(`  ${index + 1}. [${warning.locale}] ${warning.key}: ${warning.message}`);
      });
    }

    if (this.errors.length === 0) {
      console.log('\n✅ All translations are valid!');
    } else {
      console.log(`\n❌ Validation failed with ${this.errors.length} errors.`);
    }

    console.log('='.repeat(50) + '\n');
  }
}

/**
 * CLI execution
 */
async function main() {
  const validator = new TranslationValidator();
  const result = await validator.validate();

  // Exit with appropriate code
  process.exit(result.success ? 0 : 1);
}

// Run if called directly
if (import.meta.main) {
  main().catch(console.error);
}

export { TranslationValidator };
export type { TranslationError, ValidationResult };

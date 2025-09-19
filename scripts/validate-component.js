#!/usr/bin/env node

/**
 * CreatorFlow Component Validation Suite
 * Checks component quality, design tokens, i18n, and best practices
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class ComponentValidator {
  constructor() {
    this.results = {
      passed: 0,
      failed: 0,
      warnings: 0,
      checks: [],
    };
  }

  check(name, condition, severity = 'error', message = '') {
    const result = {
      name,
      passed: !!condition,
      severity,
      message,
    };

    this.results.checks.push(result);

    if (result.passed) {
      this.results.passed++;
    } else {
      if (severity === 'error') {
        this.results.failed++;
      } else {
        this.results.warnings++;
      }
    }

    return result;
  }

  validateComponent(filePath) {
    console.log(`\\n🔍 Validating ${filePath}...\\n`);

    if (!fs.existsSync(filePath)) {
      this.check('File exists', false, 'error', `File not found: ${filePath}`);
      return this.getResults();
    }

    const content = fs.readFileSync(filePath, 'utf8');
    const fileName = path.basename(filePath, '.tsx');

    // File structure checks
    this.validateFileStructure(content, filePath);

    // Design token checks
    this.validateDesignTokens(content);

    // I18n checks
    this.validateI18n(content, fileName);

    // NextJS best practices
    this.validateNextJSPractices(content);

    // Theme system checks
    this.validateThemeSystem(content);

    // Accessibility checks
    this.validateAccessibility(content);

    // TypeScript checks
    this.validateTypeScript(filePath);

    return this.getResults();
  }

  validateFileStructure(content, filePath) {
    // Check if component has proper imports
    this.check(
      'Has React imports',
      /import.*React|'use client'|getTranslations/.test(content),
      'error',
      'Component should import React or use NextJS features'
    );

    // Check export
    this.check('Has default export', /export default/.test(content), 'error', 'Component must have a default export');

    // Check component naming
    const fileName = path.basename(filePath, '.tsx');
    const hasProperComponentName = new RegExp(
      `(function|const)\\s+${fileName}|export default function ${fileName}`
    ).test(content);
    this.check(
      'Component name matches file name',
      hasProperComponentName,
      'warning',
      `Component function should be named ${fileName}`
    );
  }

  validateDesignTokens(content) {
    // Check for hardcoded Tailwind classes that should be design tokens
    const hardcodedPatterns = [
      { pattern: /\\b(p-[0-9]+|px-[0-9]+|py-[0-9]+)\\b/, token: 'spacing tokens (p-tactical, p-strategic)' },
      {
        pattern: /\\b(text-[0-9]*xl?|text-sm|text-base|text-lg)\\b/,
        token: 'typography tokens (text-heading-*, text-body-*)',
      },
      { pattern: /\\b(bg-slate-|bg-gray-|bg-zinc-)/, token: 'background tokens (bg-background, bg-card)' },
      {
        pattern: /\\b(text-slate-|text-gray-|text-zinc-)/,
        token: 'text color tokens (text-foreground, text-muted-foreground)',
      },
      { pattern: /\\b(rounded-[0-9]*xl?|rounded-lg)\\b/, token: 'radius tokens (rounded-premium, rounded-executive)' },
      { pattern: /\\b(max-w-[0-9]*xl?|max-w-md|max-w-lg)\\b/, token: 'width tokens (max-w-content)' },
      { pattern: /\\b(gap-[0-9]+|mb-[0-9]+|mt-[0-9]+)\\b/, token: 'spacing tokens (gap-tactical, mb-strategic)' },
    ];

    hardcodedPatterns.forEach(({ pattern, token }) => {
      const matches = content.match(pattern);
      this.check(
        `Uses design tokens instead of hardcoded ${token}`,
        !matches,
        'warning',
        matches ? `Found hardcoded classes: ${matches.join(', ')}. Use ${token} instead.` : ''
      );
    });

    // Check for proper theme transitions
    const hasThemeClasses = /bg-(background|card|muted)|text-(foreground|muted-foreground)/.test(content);
    if (hasThemeClasses) {
      this.check(
        'Theme classes include transitions',
        /transition-colors\\s+duration-300/.test(content),
        'warning',
        'Theme-aware components should include "transition-colors duration-300"'
      );
    }
  }

  validateI18n(content, fileName) {
    // Check for hardcoded strings
    const hardcodedStrings = content.match(/>[^<>{}\n]+</g) || [];
    const userFacingStrings = hardcodedStrings.filter((str) => {
      const text = str.slice(1, -1).trim();
      return text.length > 1 && !/^[\\s\\n\\r]*$/.test(text) && !/</.test(text) && !/^[{}\\s]*$/.test(text);
    });

    this.check(
      'No hardcoded user-facing strings',
      userFacingStrings.length === 0,
      'error',
      userFacingStrings.length > 0
        ? `Found hardcoded strings: ${userFacingStrings.slice(0, 3).join(', ')}${
            userFacingStrings.length > 3 ? '...' : ''
          }`
        : ''
    );

    // Check for proper translation usage
    const hasTranslations = /useTranslations|getTranslations/.test(content);
    const hasTranslationCalls = /\\bt\\s*\\(/.test(content);

    if (hasTranslations) {
      this.check(
        'Uses translation calls consistently',
        hasTranslationCalls,
        'warning',
        "Component imports translations but doesn't use t() calls"
      );
    }

    // Check translation key structure
    if (hasTranslationCalls) {
      const keyPattern = /t\\s*\\(\\s*['"`]([^'"`]+)['"`]/g;
      const keys = [];
      let match;
      while ((match = keyPattern.exec(content)) !== null) {
        keys.push(match[1]);
      }

      const properKeys = keys.filter((key) => key.startsWith('components.atomic.') && key.split('.').length >= 5);

      this.check(
        'Translation keys follow atomic convention',
        keys.length === 0 || properKeys.length === keys.length,
        'warning',
        keys.length > properKeys.length
          ? "Some translation keys don't follow components.atomic.{level}.{component}.{key} pattern"
          : ''
      );
    }
  }

  validateNextJSPractices(content) {
    // Check for proper async/await in server components
    const hasGetTranslations = /getTranslations/.test(content);
    const isAsyncComponent = /export default async function/.test(content);

    if (hasGetTranslations) {
      this.check(
        'Server component is async when using getTranslations',
        isAsyncComponent,
        'error',
        'Components using getTranslations must be async server components'
      );
    }

    // Check for proper client directive
    const hasClientFeatures = /(useState|useEffect|useCallback|onClick|onChange)/.test(content);
    const hasUseClient = /['\"]use client['\"]/.test(content);

    if (hasClientFeatures && !hasUseClient) {
      this.check(
        'Client features require "use client" directive',
        false,
        'error',
        'Component uses client features but missing "use client" directive'
      );
    }

    // Check for proper imports
    const imports = content.match(/import\\s+.*?from\\s+['"][^'"]+['"]/g) || [];
    const hasRelativeImports = imports.some((imp) => /from\\s+['"]\./.test(imp));

    this.check(
      'Uses proper import paths',
      !hasRelativeImports || imports.some((imp) => /from\\s+['"]@\//.test(imp)),
      'warning',
      'Consider using absolute imports with @ alias'
    );
  }

  validateThemeSystem(content) {
    // Check for CSS-in-JS theme integration
    const hasStyleProp = /style\\s*=\\s*{/.test(content);
    if (hasStyleProp) {
      this.check(
        'CSS-in-JS uses CSS variables',
        /hsl\\(var\\(--/.test(content),
        'warning',
        'CSS-in-JS should use CSS variables like hsl(var(--primary))'
      );
    }

    // Check for proper theme class usage
    const themeClasses = [
      'bg-background',
      'bg-card',
      'bg-muted',
      'text-foreground',
      'text-muted-foreground',
      'border-border',
    ];

    const hasThemeClasses = themeClasses.some((cls) => content.includes(cls));
    if (hasThemeClasses) {
      this.check('Theme integration present', true, 'info', 'Component properly uses theme system');
    }
  }

  validateAccessibility(content) {
    // Check for semantic HTML
    const hasSemanticTags = /(section|article|header|nav|main|aside|footer)/.test(content);
    this.check(
      'Uses semantic HTML elements',
      hasSemanticTags,
      'warning',
      'Consider using semantic HTML elements for better accessibility'
    );

    // Check for ARIA attributes when needed
    const hasInteractiveElements = /(button|input|select|textarea)/.test(content);
    const hasAriaAttributes = /(aria-label|aria-describedby|aria-expanded)/.test(content);

    if (hasInteractiveElements && !hasAriaAttributes) {
      this.check(
        'Interactive elements have ARIA attributes',
        false,
        'warning',
        'Interactive elements should include appropriate ARIA attributes'
      );
    }

    // Check for alt text on images
    const hasImages = /<img|<Image/.test(content);
    const hasAltText = /alt\\s*=/.test(content);

    if (hasImages) {
      this.check('Images have alt text', hasAltText, 'error', 'All images must have alt text for accessibility');
    }
  }

  validateTypeScript(filePath) {
    try {
      execSync(`bunx tsc --noEmit ${filePath}`, { stdio: 'pipe' });
      this.check('TypeScript compilation', true, 'error', 'TypeScript types are valid');
    } catch (error) {
      this.check('TypeScript compilation', false, 'error', 'TypeScript compilation failed - check types');
    }
  }

  getResults() {
    return this.results;
  }

  printResults() {
    console.log('\\n📊 Validation Results:\\n');

    // Group checks by severity
    const errors = this.results.checks.filter((c) => !c.passed && c.severity === 'error');
    const warnings = this.results.checks.filter((c) => !c.passed && c.severity === 'warning');
    const passed = this.results.checks.filter((c) => c.passed);

    // Print errors
    if (errors.length > 0) {
      console.log('❌ Errors:');
      errors.forEach((check) => {
        console.log(`  • ${check.name}: ${check.message}`);
      });
      console.log('');
    }

    // Print warnings
    if (warnings.length > 0) {
      console.log('⚠️  Warnings:');
      warnings.forEach((check) => {
        console.log(`  • ${check.name}: ${check.message}`);
      });
      console.log('');
    }

    // Summary
    console.log('📈 Summary:');
    console.log(`  ✅ Passed: ${this.results.passed}`);
    console.log(`  ❌ Failed: ${this.results.failed}`);
    console.log(`  ⚠️  Warnings: ${this.results.warnings}`);

    const score = Math.round((this.results.passed / this.results.checks.length) * 100);
    console.log(`\\n🎯 Quality Score: ${score}%`);

    if (score >= 90) {
      console.log('🎉 Excellent! Component follows best practices.');
    } else if (score >= 75) {
      console.log('✅ Good! Minor improvements needed.');
    } else if (score >= 60) {
      console.log('⚠️  Fair. Several issues to address.');
    } else {
      console.log('❌ Poor. Significant improvements needed.');
    }

    return score;
  }
}

function validateDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    console.error(`❌ Directory not found: ${dirPath}`);
    return;
  }

  const files = [];
  function scanDirectory(dir) {
    const items = fs.readdirSync(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
        scanDirectory(fullPath);
      } else if (item.endsWith('.tsx') && !item.includes('.test.') && !item.includes('.spec.')) {
        files.push(fullPath);
      }
    }
  }

  scanDirectory(dirPath);

  console.log(`🔍 Found ${files.length} components to validate in ${dirPath}`);

  const results = [];
  files.forEach((file) => {
    const validator = new ComponentValidator();
    validator.validateComponent(file);
    const score = validator.printResults();
    results.push({ file, score });
  });

  // Overall summary
  console.log('\\n\\n📊 Overall Report:');
  const avgScore = Math.round(results.reduce((sum, r) => sum + r.score, 0) / results.length);
  console.log(`Average Quality Score: ${avgScore}%`);

  // List components by score
  const sorted = results.sort((a, b) => b.score - a.score);
  console.log('\\nComponents by Quality:');
  sorted.forEach(({ file, score }) => {
    const icon = score >= 90 ? '🟢' : score >= 75 ? '🟡' : '🔴';
    console.log(`  ${icon} ${score}% - ${path.basename(file)}`);
  });
}

// CLI interface
const args = process.argv.slice(2);
const target = args[0];
const isDirectory = args.includes('--dir') || args.includes('-d');

if (!target) {
  console.log(`
✅ CreatorFlow Component Validation Suite

Usage:
  node scripts/validate-component.js <file>
  node scripts/validate-component.js <directory> --dir

Examples:
  node scripts/validate-component.js src/components/Hero.tsx
  node scripts/validate-component.js src/components/atomic/organisms --dir

Checks:
  ✅ File structure and exports
  ✅ Design token usage
  ✅ I18n implementation
  ✅ NextJS best practices
  ✅ Theme system integration
  ✅ Accessibility standards
  ✅ TypeScript compilation

Quality Score:
  🟢 90-100% - Excellent
  🟡 75-89%  - Good
  🔴 <75%    - Needs improvement
  `);
  process.exit(0);
}

if (isDirectory) {
  validateDirectory(target);
} else {
  const validator = new ComponentValidator();
  validator.validateComponent(target);
  validator.printResults();
}

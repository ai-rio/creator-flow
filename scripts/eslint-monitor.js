#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

/**
 * ESLint Monitoring Script
 * Runs ESLint checks and generates reports
 */

async function runESLintMonitoring() {
  console.log('🔍 Running ESLint monitoring...');

  try {
    // Run ESLint with JSON output
    const result = execSync('bun run lint:report', { encoding: 'utf8' });

    // Read the generated report
    const report = JSON.parse(fs.readFileSync('eslint-report.json', 'utf8'));

    // Calculate metrics
    const totalFiles = report.length;
    const filesWithErrors = report.filter((file) => file.errorCount > 0).length;
    const totalErrors = report.reduce((sum, file) => sum + file.errorCount, 0);
    const totalWarnings = report.reduce((sum, file) => sum + file.warningCount, 0);

    // Generate summary
    const summary = {
      timestamp: new Date().toISOString(),
      totalFiles,
      filesWithErrors,
      totalErrors,
      totalWarnings,
      errorRate: ((filesWithErrors / totalFiles) * 100).toFixed(2) + '%',
    };

    console.log('📊 ESLint Summary:');
    console.log(`  Files scanned: ${totalFiles}`);
    console.log(`  Files with errors: ${filesWithErrors}`);
    console.log(`  Total errors: ${totalErrors}`);
    console.log(`  Total warnings: ${totalWarnings}`);
    console.log(`  Error rate: ${summary.errorRate}`);

    // Save summary
    fs.writeFileSync('eslint-summary.json', JSON.stringify(summary, null, 2));

    // Exit with error code if there are errors
    if (totalErrors > 0) {
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ ESLint monitoring failed:', error.message);
    process.exit(1);
  }
}

runESLintMonitoring();

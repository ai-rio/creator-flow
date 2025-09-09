#!/usr/bin/env bun

import { readFile, writeFile } from 'fs/promises';
import * as ts from 'typescript';

const JSX_DIR = '/home/carlos/projects/creator-flow/docs/development/public-pages/03-jsx-mocks';
const TSX_DIR = '/home/carlos/projects/creator-flow/src/components/mocks';

interface ComponentAnalysis {
  hasTheme: boolean;
  hasUser: boolean;
  hasSystemStatus: boolean;
  stateTypes: string[];
  propTypes: string[];
  eventHandlers: string[];
  imports: string[];
}

class ReactToTypeScriptTransformer {
  private sourceFile: ts.SourceFile;
  private analysis: ComponentAnalysis;

  constructor(source: string, fileName: string) {
    this.sourceFile = ts.createSourceFile(fileName, source, ts.ScriptTarget.Latest, true);
    this.analysis = this.analyzeComponent();
  }

  private analyzeComponent(): ComponentAnalysis {
    const analysis: ComponentAnalysis = {
      hasTheme: false,
      hasUser: false,
      hasSystemStatus: false,
      stateTypes: [],
      propTypes: [],
      eventHandlers: [],
      imports: [],
    };

    const visit = (node: ts.Node) => {
      // Analyze imports
      if (ts.isImportDeclaration(node)) {
        const importText = node.getFullText(this.sourceFile).trim();
        analysis.imports.push(importText);
      }

      // Analyze variable declarations for useState
      if (ts.isVariableDeclaration(node) && node.initializer) {
        if (ts.isCallExpression(node.initializer)) {
          const expression = node.initializer.expression;
          if (ts.isIdentifier(expression) && expression.text === 'useState') {
            // Extract state type from useState argument
            if (node.initializer.arguments.length > 0) {
              const arg = node.initializer.arguments[0];
              const argText = arg.getFullText(this.sourceFile).trim();

              // Try to infer type from initial value
              if (ts.isStringLiteral(arg) || argText.includes("'") || argText.includes('"')) {
                analysis.stateTypes.push('string');
              } else if (ts.isNumericLiteral(arg) || /^\d+$/.test(argText)) {
                analysis.stateTypes.push('number');
              } else if (argText === 'true' || argText === 'false') {
                analysis.stateTypes.push('boolean');
              } else if (argText.startsWith('{') || argText.startsWith('[')) {
                analysis.stateTypes.push('any'); // Complex object/array
              } else {
                analysis.stateTypes.push('any');
              }
            }
          }
        }
      }

      // Analyze function parameters for props
      if (ts.isFunctionDeclaration(node) || ts.isArrowFunction(node)) {
        if (node.parameters.length > 0) {
          const firstParam = node.parameters[0];
          if (ts.isObjectBindingPattern(firstParam.name)) {
            firstParam.name.elements.forEach((element) => {
              if (ts.isBindingElement(element) && ts.isIdentifier(element.name)) {
                const propName = element.name.text;
                analysis.propTypes.push(`${propName}: any`);

                // Check for common patterns
                if (propName === 'theme' || propName === 'setTheme') {
                  analysis.hasTheme = true;
                }
                if (propName === 'user' || propName === 'handle') {
                  analysis.hasUser = true;
                }
                if (propName === 'systemStatus') {
                  analysis.hasSystemStatus = true;
                }
              }
            });
          }
        }
      }

      // Detect event handlers
      if (ts.isMethodDeclaration(node) || ts.isFunctionDeclaration(node)) {
        const name = node.name?.getText(this.sourceFile);
        if (name && (name.startsWith('handle') || name.startsWith('on'))) {
          analysis.eventHandlers.push(name);
        }
      }

      ts.forEachChild(node, visit);
    };

    visit(this.sourceFile);
    return analysis;
  }

  private generateInterfaces(): string {
    let interfaces = '\n// --- TypeScript Interfaces ---\n';

    if (this.analysis.hasUser) {
      interfaces += `interface User {
  handle: string;
  avatarUrl: string;
}\n\n`;
    }

    if (this.analysis.hasTheme) {
      interfaces += `interface ThemeToggleProps {
  theme: string;
  setTheme: (theme: string) => void;
}\n\n`;
    }

    if (this.analysis.hasSystemStatus) {
      interfaces += `interface SystemStatus {
  sales: 'nominal' | 'warning' | 'critical';
  viral: 'nominal' | 'warning' | 'critical';
  automation: 'nominal' | 'warning' | 'critical';
}\n\n`;
    }

    // Generate props interface if we found props
    if (this.analysis.propTypes.length > 0) {
      interfaces += `interface ComponentProps {
  children?: React.ReactNode;
  className?: string;
}\n\n`;
    }

    return interfaces;
  }

  private fixImports(content: string): string {
    const needsHooks = content.includes('useState') || content.includes('useEffect') || content.includes('useContext');
    const needsRef = content.includes('useRef');
    const needsMotion = content.includes('motion.') || content.includes('AnimatePresence');

    // Replace React import with proper TypeScript import
    let newImports = "import * as React from 'react';";

    if (needsHooks || needsRef) {
      const hooks = [];
      if (content.includes('useState')) hooks.push('useState');
      if (content.includes('useEffect')) hooks.push('useEffect');
      if (content.includes('useRef')) hooks.push('useRef');
      newImports += `\nimport { ${hooks.join(', ')} } from 'react';`;
    }

    if (needsMotion) {
      newImports += "\nimport { motion, AnimatePresence } from 'framer-motion';";
    }

    // Extract multi-line imports properly
    const lines = content.split('\n');
    const importLines = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i].trim();
      if (line.startsWith('import')) {
        let importStatement = line;

        // Handle multi-line imports
        if (!line.includes(';')) {
          i++;
          while (i < lines.length && !lines[i].includes(';')) {
            importStatement += '\n' + lines[i];
            i++;
          }
          if (i < lines.length) {
            importStatement += '\n' + lines[i]; // Add the closing line with ;
          }
        }

        // Preserve non-React/non-framer-motion imports
        if (
          !importStatement.includes("from 'react'") &&
          !importStatement.includes('from "react"') &&
          !importStatement.includes("'framer-motion'") &&
          !importStatement.includes('"framer-motion"')
        ) {
          importLines.push(importStatement);
        }
      }
      i++;
    }

    return [newImports, ...importLines].join('\n') + '\n';
  }

  transform(originalContent: string): string {
    let content = originalContent;

    // 1. Fix imports properly - extract non-import content more carefully
    const lines = content.split('\n');
    let nonImportContent = [];
    let i = 0;

    // Skip all import statements (including multi-line ones)
    while (i < lines.length) {
      const line = lines[i].trim();
      if (line.startsWith('import')) {
        // Skip this import and any continuation lines
        while (i < lines.length && !lines[i].includes(';')) {
          i++;
        }
        i++; // Skip the line with semicolon
      } else if (line === '' && i === 0) {
        // Skip empty lines at the start
        i++;
      } else {
        // This is non-import content
        nonImportContent = lines.slice(i);
        break;
      }
    }

    const fixedImports = this.fixImports(content);
    const interfaces = this.generateInterfaces();

    // 2. Fix component function signatures
    content = nonImportContent.join('\n');
    content = content.replace(
      /const (\w+) = \(\s*\{\s*([^}]+)\s*\}\s*\) => \{/g,
      'const $1: React.FC<any> = ({ $2 }: any) => {'
    );

    // 3. Fix default export functions
    content = content.replace(
      /export default function (\w+)\(\) \{/g,
      'export default function $1(): React.JSX.Element {'
    );

    // 4. Fix useState with better typing
    this.analysis.stateTypes.forEach((type, index) => {
      content = content.replace(
        /const \[(\w+), (set\w+)\] = useState\(([^)]+)\);/,
        `const [$1, $2] = useState<${type}>($3);`
      );
    });

    // 5. Fix event handlers with proper typing
    content = content.replace(
      /(\w+) = \(e\) => \{/g,
      '$1 = (e: React.MouseEvent | React.ChangeEvent<HTMLInputElement>) => {'
    );

    // 6. Fix arrow function parameters
    content = content.replace(/\(\s*\{\s*([^}]+)\s*\}\s*\) => \(/g, '({ $1 }: any) => (');

    // Combine everything with proper spacing
    return [fixedImports, interfaces, content].join('\n');
  }
}

async function convertSingleFile(jsxFileName: string, sourceDir?: string, destDir?: string) {
  const srcDir = sourceDir || JSX_DIR;
  const dstDir = destDir || TSX_DIR;

  const jsxPath = `${srcDir}/${jsxFileName}`;
  const content = await readFile(jsxPath, 'utf-8');

  if (content.trim().length === 0) {
    console.log(`❌ Skipping empty file: ${jsxFileName}`);
    return false;
  }

  // Generate TSX filename
  const tsxFileName = jsxFileName
    .replace('.jsx', '.tsx')
    .replace(/^([a-z])/, (match) => match.toUpperCase())
    .replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());

  console.log(`🔄 Converting: ${jsxFileName} -> ${tsxFileName}`);

  try {
    // Use AST-based transformation
    const transformer = new ReactToTypeScriptTransformer(content, jsxFileName);
    const transformedContent = transformer.transform(content);

    const tsxPath = `${dstDir}/${tsxFileName}`;
    await writeFile(tsxPath, transformedContent, 'utf-8');

    console.log(`✅ ${tsxFileName} - Converted successfully with AST analysis`);
    console.log(`📁 Saved to: ${tsxPath}`);

    return true;
  } catch (error) {
    console.error(`❌ Error converting ${jsxFileName}:`, error);
    return false;
  }
}

// Get filename from command line argument
const fileName = process.argv[2];
const sourceDir = process.argv[3];
const destDir = process.argv[4];

if (!fileName) {
  console.log('Usage: bun run scripts/convert-jsx-to-tsx-ast-improved.ts <filename.jsx> [source-dir] [dest-dir]');
  console.log('Example: bun run scripts/convert-jsx-to-tsx-ast-improved.ts o1-system-focus-header.jsx');
  console.log(
    'Example: bun run scripts/convert-jsx-to-tsx-ast-improved.ts BP-Complete-Content-Hub.jsx /path/to/source /path/to/dest'
  );
  process.exit(1);
}

convertSingleFile(fileName, sourceDir, destDir).catch(console.error);

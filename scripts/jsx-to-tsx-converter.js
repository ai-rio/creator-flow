#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Conversion configuration
const SERIES_CONFIG = {
  'M-Series': {
    prefix: 'M',
    files: ['m2-business-simphony-card.jsx', 'm3-strategic-command-card.jsx', 'm4-liberation-orchestra-card.jsx', 'm5-intel-briefing-card.jsx', 'm6-mobile-navbar.jsx']
  },
  'O-Series': {
    prefix: 'O', 
    files: ['o1-system-focus-header.jsx', 'o2-order-system-stats-card.jsx', 'o3-priority-order-card.jsx', 'o4-complete-flow-card.jsx', 'o5-order-sub-navbar.jsx']
  },
  'D-Series': {
    prefix: 'D',
    files: ['d1-d3-enhanced-desctop-ccc-768px.jsx', 'd4-enhanced-desctop-ccc-768px .jsx', 'd5-enhanced-desctop-ccc-768px .jsx', 'd6-enhanced-desctop-ccc-768px .jsx']
  },
  'I-Series': {
    prefix: 'I',
    files: ['i1-i5-inventory-management-focus-components.jsx', 'i3-critical-stock-card.jsx']
  },
  'Desktop': {
    prefix: 'Desktop',
    files: [
      '00-mobile-dashboard.jsx', '01-desktop-components-deom.jsx', '02-desktop-header-demo.jsx',
      '03-desktop-toast-notifications.jsx', '04-desktop-sidebar-demo.jsx', '05-desktop-modals.jsx',
      '06-desktop-onboarding-tour.demo.jsx', '07-desktop-feedback-widget.jsx', '08-mobile-order.jsx',
      '09-desktop-order-table-component.jsx', '10-desktop-dashboard-command-center.jsx',
      '11-desktop-order-flow-visualisation.jsx', '12-desktop-strategic-insights.jsx',
      '13-desktop-user-profile-card.jsx', '14-desktop-security-card.jsx', '15-desktop-email-notifications-card.jsx',
      '16-desktop-billinq-overview.jsx', '17-desktop-billing-history.jsx', '18-desktop-payment-method.jsx',
      '19-desktop-add-payment-method-card.jsx', '20-desktop-change-plan-modal.jsx'
    ]
  }
};

const SOURCE_DIR = 'docs/development/dashboard-design/03-jsx-mock';
const TARGET_DIR = 'src/components/mocks';

// Convert filename to PascalCase component name
function getComponentName(filename) {
  return filename
    .replace('.jsx', '')
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

// Convert JSX to TSX with minimal changes
function convertJsxToTsx(jsxContent, componentName) {
  let tsxContent = jsxContent;
  
  // Add React import if missing
  if (!tsxContent.includes("import React")) {
    tsxContent = `import React from 'react';\n${tsxContent}`;
  }
  
  // Add basic TypeScript interfaces for props
  if (tsxContent.includes('({ ') && !tsxContent.includes('interface ')) {
    const propsMatch = tsxContent.match(/\(\{\s*([^}]+)\s*\}/);
    if (propsMatch) {
      const props = propsMatch[1].split(',').map(p => p.trim());
      const interfaceProps = props.map(prop => {
        const propName = prop.split(':')[0].trim();
        return `  ${propName}: any;`;
      }).join('\n');
      
      const interfaceDef = `interface ${componentName}Props {\n${interfaceProps}\n}\n\n`;
      tsxContent = tsxContent.replace(/^/, interfaceDef);
    }
  }
  
  // Export default with proper typing
  if (!tsxContent.includes('export default function')) {
    tsxContent = tsxContent.replace(
      /export default (\w+)/,
      `export default function ${componentName}(): JSX.Element`
    );
  }
  
  return tsxContent;
}

// Process single file
async function convertFile(filename, series) {
  const sourcePath = path.join(SOURCE_DIR, filename);
  const componentName = getComponentName(filename);
  const targetPath = path.join(TARGET_DIR, `${componentName}.tsx`);
  
  try {
    const jsxContent = fs.readFileSync(sourcePath, 'utf8');
    const tsxContent = convertJsxToTsx(jsxContent, componentName);
    
    fs.writeFileSync(targetPath, tsxContent);
    console.log(`✅ ${filename} → ${componentName}.tsx`);
    
    return { success: true, filename, componentName };
  } catch (error) {
    console.error(`❌ Failed to convert ${filename}:`, error.message);
    return { success: false, filename, error: error.message };
  }
}

// Process entire series
async function convertSeries(seriesName) {
  console.log(`\n🚀 Converting ${seriesName}...`);
  const config = SERIES_CONFIG[seriesName];
  const results = [];
  
  for (const filename of config.files) {
    const result = await convertFile(filename, seriesName);
    results.push(result);
  }
  
  const successful = results.filter(r => r.success).length;
  console.log(`📊 ${seriesName}: ${successful}/${config.files.length} converted`);
  
  return results;
}

// Main execution
async function main() {
  console.log('🔄 Starting JSX→TSX Batch Conversion...\n');
  
  // Ensure target directory exists
  if (!fs.existsSync(TARGET_DIR)) {
    fs.mkdirSync(TARGET_DIR, { recursive: true });
  }
  
  const allResults = [];
  
  // Convert each series
  for (const seriesName of Object.keys(SERIES_CONFIG)) {
    const results = await convertSeries(seriesName);
    allResults.push(...results);
  }
  
  // Summary
  const totalSuccess = allResults.filter(r => r.success).length;
  const totalFiles = allResults.length;
  
  console.log(`\n🎉 Conversion Complete: ${totalSuccess}/${totalFiles} files converted`);
  
  if (totalSuccess < totalFiles) {
    console.log('\n❌ Failed conversions:');
    allResults.filter(r => !r.success).forEach(r => {
      console.log(`   - ${r.filename}: ${r.error}`);
    });
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { convertFile, convertSeries, getComponentName };
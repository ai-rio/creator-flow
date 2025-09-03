#!/usr/bin/env node

const { execSync } = require('child_process');

// Parse arguments
const args = process.argv.slice(2);
const branchName = args[0];
const typeArg = args.find(arg => arg.startsWith('--type='));
const explicitType = typeArg ? typeArg.split('=')[1] : null;

if (!branchName) {
  console.log('❌ Error: Branch name required');
  console.log('Usage: bun git:branch "branch-name" [--type=TYPE]');
  console.log('');
  console.log('Examples:');
  console.log('  bun git:branch "order-automation"           # Smart detection → feature/order-automation');
  console.log('  bun git:branch "fix-webhook-bug"           # Smart detection → fix/webhook-bug');
  console.log('  bun git:branch "critical-payment"         # Smart detection → hotfix/critical-payment');
  console.log('  bun git:branch "readme-update"            # Smart detection → docs/readme-update');
  console.log('  bun git:branch "dashboard" --type=refactor # Explicit type → refactor/dashboard');
  console.log('');
  console.log('Supported types: feature, fix, hotfix, docs, refactor, test, chore, perf, security');
  process.exit(1);
}

// Branch type detection keywords
const branchTypeKeywords = {
  fix: ['fix', 'bug', 'issue', 'error', 'broken', 'resolve', 'repair'],
  hotfix: ['hotfix', 'critical', 'urgent', 'emergency', 'prod', 'production'],
  docs: ['doc', 'docs', 'readme', 'guide', 'documentation', 'manual'],
  test: ['test', 'spec', 'testing', 'coverage', 'e2e', 'unit'],
  refactor: ['refactor', 'cleanup', 'restructure', 'reorganize', 'rewrite'],
  perf: ['perf', 'performance', 'optimize', 'speed', 'fast', 'slow'],
  security: ['security', 'auth', 'secure', 'vulnerability', 'exploit'],
  chore: ['chore', 'deps', 'dependency', 'config', 'setup', 'update', 'upgrade'],
  feature: [] // default fallback
};

// Clean branch name (remove spaces, special chars)
const cleanBranchName = branchName
  .toLowerCase()
  .replace(/[^a-z0-9-]/g, '-')
  .replace(/-+/g, '-')
  .replace(/^-|-$/g, '');

// Detect branch type
function detectBranchType(name) {
  // If already has a valid prefix, preserve it
  for (const type of Object.keys(branchTypeKeywords)) {
    if (name.startsWith(`${type}/`)) {
      return { type, detected: false, reason: 'existing prefix' };
    }
  }
  
  // Check for keywords in branch name - prioritize more specific terms first
  const nameLower = name.toLowerCase();
  
  // Priority order: more specific keywords first to avoid false matches
  const priorityOrder = [
    'hotfix', 'security', 'perf', 'refactor', 
    'test', 'docs', 'chore', 'fix' // fix last since it's in hotfix
  ];
  
  for (const type of priorityOrder) {
    const keywords = branchTypeKeywords[type] || [];
    for (const keyword of keywords) {
      if (nameLower.includes(keyword)) {
        return { type, detected: true, reason: `keyword: '${keyword}'` };
      }
    }
  }
  
  return { type: 'feature', detected: true, reason: 'default type' };
}

// Determine final branch type and name
let branchType, detectionInfo;
if (explicitType) {
  if (!Object.keys(branchTypeKeywords).includes(explicitType)) {
    console.log(`❌ Invalid branch type: ${explicitType}`);
    console.log(`Valid types: ${Object.keys(branchTypeKeywords).join(', ')}`);
    process.exit(1);
  }
  branchType = explicitType;
  detectionInfo = { detected: false, reason: 'explicit --type parameter' };
} else {
  const detection = detectBranchType(cleanBranchName);
  branchType = detection.type;
  detectionInfo = detection;
}

// Remove redundant keywords from branch name
function removeRedundantKeywords(name, type) {
  const keywords = branchTypeKeywords[type] || [];
  let cleanedName = name;
  
  // Remove the branch type itself if it's at the beginning
  if (cleanedName.startsWith(`${type}-`)) {
    cleanedName = cleanedName.substring(type.length + 1);
  }
  
  // Remove other keywords of the same type
  for (const keyword of keywords) {
    const keywordPattern = new RegExp(`^${keyword}-|^${keyword}$|-${keyword}-|-${keyword}$`, 'gi');
    cleanedName = cleanedName.replace(keywordPattern, (match) => {
      if (match.startsWith('-') && match.endsWith('-')) return '-';
      if (match.startsWith('-')) return '';
      if (match.endsWith('-')) return '';
      return '';
    });
  }
  
  // Clean up multiple dashes and trailing/leading dashes
  cleanedName = cleanedName.replace(/-+/g, '-').replace(/^-|-$/g, '');
  
  return cleanedName || name; // Fallback to original if cleaning results in empty string
}

const finalBranchName = removeRedundantKeywords(cleanBranchName, branchType);

// Create full branch name
const fullBranchName = cleanBranchName.includes('/') 
  ? cleanBranchName 
  : `${branchType}/${finalBranchName}`;

try {
  // Show branch type detection info
  console.log(`🧠 Branch type detection:`);
  if (detectionInfo.detected) {
    console.log(`   📝 Detected type: ${branchType} (${detectionInfo.reason})`);
  } else {
    console.log(`   ✋ Using type: ${branchType} (${detectionInfo.reason})`);
  }
  console.log(`   🌿 Final branch: ${fullBranchName}`);
  console.log('');

  console.log('🔍 Checking current state...');
  
  // Check for uncommitted changes
  try {
    execSync('git diff-index --quiet HEAD --', { stdio: 'pipe' });
  } catch (error) {
    console.log('⚠️  You have uncommitted changes. Please commit or stash them first.');
    console.log('💡 Use: bun git:wip "description" to save current work');
    process.exit(1);
  }

  // Update main branch
  console.log('📥 Updating main branch...');
  execSync('git checkout main', { stdio: 'inherit' });
  execSync('git pull origin main', { stdio: 'inherit' });

  // Create and switch to new branch
  console.log(`🌿 Creating branch: ${fullBranchName}`);
  execSync(`git checkout -b ${fullBranchName}`, { stdio: 'inherit' });

  console.log(`✅ Successfully created and switched to branch: ${fullBranchName}`);
  console.log(`🎯 Branch type: ${branchType.toUpperCase()}`);
  console.log('💡 Use bun git:done "message" to commit and push when ready');

} catch (error) {
  console.log('❌ Branch creation failed:', error.message);
  process.exit(1);
}
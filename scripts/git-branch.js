#!/usr/bin/env node

const { execSync } = require('child_process');
const branchName = process.argv[2];

if (!branchName) {
  console.log('❌ Error: Branch name required');
  console.log('Usage: bun git:branch "feature-name"');
  console.log('Examples:');
  console.log('  bun git:branch "order-automation"');
  console.log('  bun git:branch "fix-shipping-bug"');
  process.exit(1);
}

// Clean branch name (remove spaces, special chars)
const cleanBranchName = branchName
  .toLowerCase()
  .replace(/[^a-z0-9-]/g, '-')
  .replace(/-+/g, '-')
  .replace(/^-|-$/g, '');

const fullBranchName = cleanBranchName.startsWith('feature/') || cleanBranchName.startsWith('fix/') 
  ? cleanBranchName 
  : `feature/${cleanBranchName}`;

try {
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
  console.log('💡 Use bun git:done "message" to commit and push when ready');

} catch (error) {
  console.log('❌ Branch creation failed:', error.message);
  process.exit(1);
}
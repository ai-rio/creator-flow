#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function runCommand(command, options = {}) {
  try {
    return {
      success: true,
      output: execSync(command, { encoding: 'utf8', ...options }).trim()
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      output: error.stdout ? error.stdout.toString().trim() : ''
    };
  }
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

async function healthCheck() {
  console.log('🏥 CreatorFlow Git Repository Health Check');
  console.log('==========================================');
  console.log('');

  const issues = [];
  const warnings = [];

  // Check if we're in a git repository
  const isGitRepo = runCommand('git rev-parse --is-inside-work-tree');
  if (!isGitRepo.success) {
    console.log('❌ CRITICAL: Not in a git repository');
    process.exit(1);
  }
  console.log('✅ Git repository detected');

  // Check repository integrity
  console.log('🔍 Checking repository integrity...');
  const fsckResult = runCommand('git fsck --full --strict');
  if (!fsckResult.success) {
    issues.push('Repository corruption detected');
    console.log(`❌ CRITICAL: ${fsckResult.error}`);
  } else {
    console.log('✅ Repository integrity OK');
  }

  // Check for uncommitted changes
  const statusResult = runCommand('git status --porcelain');
  if (statusResult.success && statusResult.output.length > 0) {
    warnings.push('Uncommitted changes detected');
    console.log('⚠️  Warning: Uncommitted changes found');
    console.log('   💡 Run: bun git:wip "description" to save work');
  } else {
    console.log('✅ Working tree clean');
  }

  // Check remote connectivity
  console.log('🌐 Checking remote connectivity...');
  const remoteResult = runCommand('git remote -v');
  if (remoteResult.success && remoteResult.output.length > 0) {
    const remotes = remoteResult.output.split('\n');
    console.log('✅ Configured remotes:');
    
    for (const remote of remotes) {
      if (remote.includes('(fetch)')) {
        const [name, url] = remote.split('\t');
        console.log(`   📡 ${name}: ${url.replace(' (fetch)', '')}`);
        
        // Test remote connectivity
        const testResult = runCommand(`git ls-remote --heads ${name}`, { timeout: 10000 });
        if (testResult.success) {
          console.log(`   ✅ ${name} connectivity OK`);
        } else {
          issues.push(`Remote ${name} unreachable`);
          console.log(`   ❌ ${name} unreachable`);
        }
      }
    }
  } else {
    warnings.push('No remote repositories configured');
    console.log('⚠️  Warning: No remote repositories configured');
    console.log('   💡 Consider adding backup remotes for disaster recovery');
  }

  // Check repository size and cleanup recommendations
  console.log('📊 Repository statistics...');
  const repoSizeResult = runCommand('git count-objects -vH');
  if (repoSizeResult.success) {
    console.log('✅ Repository size information:');
    const lines = repoSizeResult.output.split('\n');
    for (const line of lines) {
      if (line.includes('size-pack') || line.includes('size')) {
        console.log(`   📈 ${line}`);
      }
    }
  }

  // Check for large files
  const largeFilesResult = runCommand('git rev-list --objects --all | git cat-file --batch-check="%(objecttype) %(objectname) %(objectsize) %(rest)" | awk \'$1=="blob" && $3>1048576 {print $3, $4}\' | sort -nr | head -5');
  if (largeFilesResult.success && largeFilesResult.output.length > 0) {
    console.log('⚠️  Large files detected (>1MB):');
    const largeFiles = largeFilesResult.output.split('\n');
    for (const file of largeFiles) {
      if (file.trim()) {
        const [size, filename] = file.trim().split(' ', 2);
        console.log(`   📄 ${formatBytes(parseInt(size))}: ${filename || 'unknown'}`);
      }
    }
    warnings.push('Large files in repository');
    console.log('   💡 Consider using Git LFS for large files');
  } else {
    console.log('✅ No large files detected');
  }

  // Check backup status
  console.log('💾 Checking backup status...');
  const backupDir = path.join(process.cwd(), '.git-backups');
  if (fs.existsSync(backupDir)) {
    const backups = fs.readdirSync(backupDir)
      .filter(file => file.endsWith('.bundle'))
      .sort()
      .reverse()
      .slice(0, 3);
    
    if (backups.length > 0) {
      console.log('✅ Recent backups found:');
      for (const backup of backups) {
        const backupPath = path.join(backupDir, backup);
        const stat = fs.statSync(backupPath);
        console.log(`   💾 ${backup} (${formatBytes(stat.size)}, ${stat.mtime.toLocaleDateString()})`);
      }
    } else {
      warnings.push('No backups found');
      console.log('⚠️  No backups found');
    }
  } else {
    warnings.push('Backup directory not found');
    console.log('⚠️  Backup directory not found');
    console.log('   💡 Run: bun git:backup to create first backup');
  }

  // Check branch protection
  console.log('🛡️  Checking branch status...');
  const currentBranch = runCommand('git rev-parse --abbrev-ref HEAD');
  if (currentBranch.success) {
    console.log(`✅ Current branch: ${currentBranch.output}`);
    
    // Check if branch is up to date with remote
    const upstreamResult = runCommand(`git rev-list --count HEAD..origin/${currentBranch.output}`);
    if (upstreamResult.success) {
      const behindCount = parseInt(upstreamResult.output) || 0;
      if (behindCount > 0) {
        warnings.push(`Branch is ${behindCount} commits behind remote`);
        console.log(`⚠️  Branch is ${behindCount} commits behind remote`);
        console.log('   💡 Run: git pull origin main');
      } else {
        console.log('✅ Branch is up to date with remote');
      }
    }
  }

  // Summary
  console.log('');
  console.log('📋 Health Check Summary');
  console.log('=======================');
  
  if (issues.length === 0) {
    console.log('🎉 Repository health: EXCELLENT');
    console.log('   No critical issues detected');
  } else {
    console.log('🚨 Repository health: CRITICAL ISSUES');
    console.log('   Critical issues requiring immediate attention:');
    issues.forEach(issue => console.log(`   ❌ ${issue}`));
  }

  if (warnings.length > 0) {
    console.log('');
    console.log('⚠️  Warnings (recommended improvements):');
    warnings.forEach(warning => console.log(`   ⚠️  ${warning}`));
  }

  console.log('');
  console.log('💡 Recommended Actions:');
  console.log('   • Run health checks weekly: bun git:health-check');
  console.log('   • Create backups regularly: bun git:backup');
  console.log('   • Monitor repository size and clean up periodically');
  console.log('   • Keep remotes accessible and test connectivity');
  
  if (issues.length > 0) {
    process.exit(1); // Exit with error if critical issues found
  }
}

healthCheck().catch(error => {
  console.error('❌ Health check failed:', error.message);
  process.exit(1);
});
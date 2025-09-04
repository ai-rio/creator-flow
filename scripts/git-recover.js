#!/usr/bin/env node

const { execSync } = require('child_process');

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

const recoveryType = process.argv[2];
const target = process.argv[3];

if (!recoveryType) {
  console.log('🚨 CreatorFlow Advanced Git Recovery');
  console.log('====================================');
  console.log('');
  console.log('Usage: bun git:recover [TYPE] [TARGET]');
  console.log('');
  console.log('Recovery Types:');
  console.log('  branch [name]     - Recover deleted branch from reflog');
  console.log('  commit [hash]     - Recover specific commit');
  console.log('  file [path]       - Recover deleted file from history');
  console.log('  reset-soft        - Undo last commit (keep changes)');
  console.log('  reset-hard        - Reset to last clean state (DESTRUCTIVE)');
  console.log('  emergency         - Emergency recovery to last known good state');
  console.log('  stash             - Recover from git stash');
  console.log('');
  console.log('Examples:');
  console.log('  bun git:recover branch feature/lost-work');
  console.log('  bun git:recover commit abc123');
  console.log('  bun git:recover file src/important.js');
  console.log('  bun git:recover reset-soft');
  console.log('  bun git:recover emergency');
  process.exit(0);
}

console.log('🚨 CreatorFlow Git Recovery Tool');
console.log('================================');
console.log('');

switch (recoveryType.toLowerCase()) {
  case 'branch':
    recoverBranch(target);
    break;
  case 'commit':
    recoverCommit(target);
    break;
  case 'file':
    recoverFile(target);
    break;
  case 'reset-soft':
    resetSoft();
    break;
  case 'reset-hard':
    resetHard();
    break;
  case 'emergency':
    emergencyRecovery();
    break;
  case 'stash':
    recoverFromStash();
    break;
  default:
    console.log(`❌ Unknown recovery type: ${recoveryType}`);
    process.exit(1);
}

function recoverBranch(branchName) {
  if (!branchName) {
    console.log('❌ Branch name required');
    console.log('Usage: bun git:recover branch [branch-name]');
    process.exit(1);
  }

  console.log(`🔍 Searching for deleted branch: ${branchName}`);
  
  // Search reflog for branch references
  const reflogResult = runCommand('git reflog --all --grep-reflog="branch" --date=relative');
  
  if (reflogResult.success) {
    const entries = reflogResult.output.split('\n')
      .filter(line => line.toLowerCase().includes(branchName.toLowerCase()))
      .slice(0, 10);
    
    if (entries.length === 0) {
      console.log(`❌ No references to branch '${branchName}' found in reflog`);
      console.log('💡 Try: git reflog --all | grep -i "branch-name"');
      process.exit(1);
    }

    console.log('🔍 Found potential references:');
    entries.forEach((entry, index) => {
      console.log(`   ${index + 1}. ${entry}`);
    });

    // Try to find the branch's last commit
    const branchRefResult = runCommand(`git reflog --all | grep "checkout.*${branchName}"`);
    if (branchRefResult.success) {
      const lastEntry = branchRefResult.output.split('\n')[0];
      const commitMatch = lastEntry.match(/^([a-f0-9]+)/);
      
      if (commitMatch) {
        const commitHash = commitMatch[1];
        console.log(`🎯 Found last commit for branch: ${commitHash}`);
        
        // Recreate the branch
        const recreateResult = runCommand(`git checkout -b ${branchName} ${commitHash}`);
        if (recreateResult.success) {
          console.log(`✅ Successfully recovered branch: ${branchName}`);
          console.log(`🌿 Switched to recovered branch`);
        } else {
          console.log(`❌ Failed to recreate branch: ${recreateResult.error}`);
        }
      }
    }
  } else {
    console.log('❌ Could not access reflog');
    process.exit(1);
  }
}

function recoverCommit(commitHash) {
  if (!commitHash) {
    console.log('❌ Commit hash required');
    console.log('Usage: bun git:recover commit [commit-hash]');
    console.log('💡 Find commits with: git reflog');
    process.exit(1);
  }

  console.log(`🔍 Recovering commit: ${commitHash}`);

  // Check if commit exists
  const showResult = runCommand(`git show --stat ${commitHash}`);
  if (!showResult.success) {
    console.log(`❌ Commit ${commitHash} not found`);
    console.log('💡 Try searching reflog: git reflog | grep ${commitHash.substring(0, 6)}');
    process.exit(1);
  }

  console.log('📝 Commit information:');
  console.log(showResult.output.split('\n').slice(0, 10).join('\n'));
  console.log('');

  console.log('🔧 Recovery options:');
  console.log('   1. Cherry-pick commit to current branch');
  console.log('   2. Create new branch from commit');
  console.log('   3. Show commit details only');
  console.log('');

  // For safety, just show the commit details
  console.log('📋 Commit details shown above. To apply recovery:');
  console.log(`   Cherry-pick: git cherry-pick ${commitHash}`);
  console.log(`   New branch:  git checkout -b recovered-commit ${commitHash}`);
}

function recoverFile(filePath) {
  if (!filePath) {
    console.log('❌ File path required');
    console.log('Usage: bun git:recover file [path/to/file]');
    process.exit(1);
  }

  console.log(`🔍 Searching for deleted file: ${filePath}`);

  // Search for file in git history
  const logResult = runCommand(`git log --follow --all --format="%H %ai %s" -- "${filePath}"`);
  
  if (!logResult.success || !logResult.output) {
    console.log(`❌ No history found for file: ${filePath}`);
    console.log('💡 Check if the file path is correct');
    process.exit(1);
  }

  const commits = logResult.output.split('\n').slice(0, 10);
  console.log('📚 File history (last 10 commits):');
  commits.forEach((commit, index) => {
    const parts = commit.split(' ');
    const hash = parts[0];
    const date = parts.slice(1, 3).join(' ');
    const message = parts.slice(3).join(' ');
    console.log(`   ${index + 1}. ${hash.substring(0, 8)} ${date} - ${message}`);
  });

  const latestCommit = commits[0].split(' ')[0];
  console.log('');
  console.log('🔧 Recovery options:');
  console.log(`   Restore file: git checkout ${latestCommit.substring(0, 8)} -- "${filePath}"`);
  console.log(`   Show content: git show ${latestCommit.substring(0, 8)}:"${filePath}"`);
}

function resetSoft() {
  console.log('🔄 Performing soft reset (undo last commit, keep changes)');

  const resetResult = runCommand('git reset --soft HEAD~1');
  if (resetResult.success) {
    console.log('✅ Soft reset successful');
    console.log('📝 Last commit undone, changes preserved in staging area');
    console.log('💡 Changes are ready to be recommitted with modifications');
  } else {
    console.log(`❌ Soft reset failed: ${resetResult.error}`);
  }
}

function resetHard() {
  console.log('⚠️  DANGER: Hard reset will PERMANENTLY DESTROY uncommitted changes!');
  console.log('This will reset to the last clean committed state.');
  console.log('');
  
  // Check for uncommitted changes
  const statusResult = runCommand('git status --porcelain');
  if (statusResult.success && statusResult.output.length > 0) {
    console.log('🚨 UNCOMMITTED CHANGES DETECTED:');
    console.log(statusResult.output);
    console.log('');
    console.log('💾 Consider backing up your work first:');
    console.log('   bun git:wip "backup before hard reset"');
    console.log('');
    console.log('To proceed with DESTRUCTIVE reset: git reset --hard HEAD');
    return;
  }

  console.log('✅ No uncommitted changes detected');
  const resetResult = runCommand('git reset --hard HEAD');
  if (resetResult.success) {
    console.log('✅ Hard reset completed - repository is now clean');
  } else {
    console.log(`❌ Hard reset failed: ${resetResult.error}`);
  }
}

function emergencyRecovery() {
  console.log('🚨 EMERGENCY RECOVERY MODE');
  console.log('==========================');
  console.log('');

  // Check repository health
  console.log('🔍 Checking repository health...');
  const fsckResult = runCommand('git fsck --full');
  
  if (!fsckResult.success) {
    console.log('❌ Repository corruption detected!');
    console.log('🚨 CRITICAL: Repository may be severely damaged');
    console.log('');
    console.log('💾 Emergency actions:');
    console.log('   1. Create backup: bun git:backup');
    console.log('   2. Clone fresh copy from remote');
    console.log('   3. Manually recover important changes');
    return;
  }

  console.log('✅ Repository structure is healthy');

  // Find last known good state
  const reflogResult = runCommand('git reflog --oneline -10');
  if (reflogResult.success) {
    console.log('');
    console.log('📚 Recent activity (last 10 operations):');
    console.log(reflogResult.output);
    console.log('');

    // Get current state info
    const currentBranch = runCommand('git rev-parse --abbrev-ref HEAD');
    const currentCommit = runCommand('git rev-parse HEAD');
    
    console.log('📊 Current state:');
    console.log(`   Branch: ${currentBranch.output}`);
    console.log(`   Commit: ${currentCommit.output?.substring(0, 8)}`);
    
    // Check for issues
    const statusResult = runCommand('git status --porcelain');
    if (statusResult.success && statusResult.output.length > 0) {
      console.log('⚠️  Uncommitted changes detected');
      console.log('');
      console.log('🔧 Recovery options:');
      console.log('   Save work: bun git:wip "emergency backup"');
      console.log('   Discard:   git reset --hard HEAD');
      console.log('   Review:    git status');
    } else {
      console.log('✅ Working tree is clean - no emergency action needed');
    }
    
    console.log('');
    console.log('💡 If you need to recover specific data:');
    console.log('   • Branch: bun git:recover branch [name]');
    console.log('   • Commit: bun git:recover commit [hash]');
    console.log('   • File:   bun git:recover file [path]');
  }
}

function recoverFromStash() {
  console.log('📦 Recovering from git stash');

  const stashListResult = runCommand('git stash list');
  if (!stashListResult.success || !stashListResult.output) {
    console.log('❌ No stashes found');
    return;
  }

  console.log('📚 Available stashes:');
  console.log(stashListResult.output);
  console.log('');
  console.log('🔧 Recovery commands:');
  console.log('   Apply latest: git stash apply');
  console.log('   Apply specific: git stash apply stash@{0}');
  console.log('   Pop latest: git stash pop');
  console.log('   Show stash: git stash show -p stash@{0}');
}
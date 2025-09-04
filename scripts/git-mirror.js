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
      error: error.message
    };
  }
}

const action = process.argv[2];
const remoteUrl = process.argv[3];

if (!action) {
  console.log('🪞 CreatorFlow Multi-Remote Backup System');
  console.log('=========================================');
  console.log('');
  console.log('Usage: bun git:mirror [ACTION] [REMOTE_URL]');
  console.log('');
  console.log('Actions:');
  console.log('  setup [url]       - Add backup remote repository');
  console.log('  list              - List all configured remotes');
  console.log('  sync              - Sync all branches to all remotes');
  console.log('  sync [remote]     - Sync to specific remote');
  console.log('  test              - Test connectivity to all remotes');
  console.log('  remove [remote]   - Remove backup remote');
  console.log('');
  console.log('Examples:');
  console.log('  bun git:mirror setup https://gitlab.com/user/repo.git');
  console.log('  bun git:mirror setup https://bitbucket.org/user/repo.git');
  console.log('  bun git:mirror sync');
  console.log('  bun git:mirror test');
  process.exit(0);
}

console.log('🪞 Multi-Remote Backup System');
console.log('=============================');
console.log('');

switch (action.toLowerCase()) {
  case 'setup':
    setupMirror(remoteUrl);
    break;
  case 'list':
    listRemotes();
    break;
  case 'sync':
    syncRemotes(remoteUrl);
    break;
  case 'test':
    testRemotes();
    break;
  case 'remove':
    removeRemote(remoteUrl);
    break;
  default:
    console.log(`❌ Unknown action: ${action}`);
    process.exit(1);
}

function setupMirror(url) {
  if (!url) {
    console.log('❌ Remote URL required');
    console.log('Usage: bun git:mirror setup [REMOTE_URL]');
    process.exit(1);
  }

  console.log(`🔧 Setting up backup remote: ${url}`);

  // Determine remote name based on URL
  let remoteName;
  if (url.includes('gitlab')) {
    remoteName = 'gitlab-backup';
  } else if (url.includes('bitbucket')) {
    remoteName = 'bitbucket-backup';  
  } else if (url.includes('github') && !url.includes('origin')) {
    remoteName = 'github-backup';
  } else {
    remoteName = 'backup-remote';
  }

  // Check if remote already exists
  const existingResult = runCommand(`git remote get-url ${remoteName}`);
  if (existingResult.success) {
    console.log(`⚠️  Remote '${remoteName}' already exists: ${existingResult.output}`);
    console.log('💡 Use git:mirror remove to remove it first, or choose different URL');
    return;
  }

  // Add remote
  const addResult = runCommand(`git remote add ${remoteName} ${url}`);
  if (!addResult.success) {
    console.log(`❌ Failed to add remote: ${addResult.error}`);
    return;
  }

  console.log(`✅ Remote '${remoteName}' added successfully`);

  // Test connectivity
  console.log('🔍 Testing connectivity...');
  const testResult = runCommand(`git ls-remote ${remoteName}`, { timeout: 10000 });
  
  if (testResult.success) {
    console.log('✅ Connectivity test passed');
    
    // Try initial push
    console.log('🚀 Performing initial sync...');
    const pushResult = runCommand(`git push ${remoteName} --all`);
    
    if (pushResult.success) {
      console.log('✅ Initial sync completed successfully');
      console.log('');
      console.log('💡 Next steps:');
      console.log('   • Run: bun git:mirror sync (to sync all remotes)');
      console.log('   • Run: bun git:mirror test (to verify all connections)');
      console.log('   • Consider automating syncs with cron jobs');
    } else {
      console.log('⚠️  Initial sync failed - you may need to create the remote repository first');
      console.log('   Remote has been added but not synced');
    }
  } else {
    console.log('❌ Connectivity test failed');
    console.log('   Remote added but may not be accessible');
    console.log('   Verify the URL and your credentials');
  }
}

function listRemotes() {
  console.log('📋 Configured Git Remotes');
  console.log('');

  const remotesResult = runCommand('git remote -v');
  if (!remotesResult.success || !remotesResult.output) {
    console.log('❌ No remotes configured');
    return;
  }

  const remotes = remotesResult.output.split('\n');
  const remoteInfo = {};

  // Group fetch/push URLs
  remotes.forEach(line => {
    const match = line.match(/^(\S+)\s+(\S+)\s+\((\w+)\)$/);
    if (match) {
      const [, name, url, type] = match;
      if (!remoteInfo[name]) remoteInfo[name] = {};
      remoteInfo[name][type] = url;
    }
  });

  Object.entries(remoteInfo).forEach(([name, info]) => {
    const isPrimary = name === 'origin';
    const isBackup = name.includes('backup') || ['gitlab-backup', 'bitbucket-backup', 'github-backup'].includes(name);
    
    const icon = isPrimary ? '🎯' : isBackup ? '💾' : '📡';
    const type = isPrimary ? '(PRIMARY)' : isBackup ? '(BACKUP)' : '';
    
    console.log(`${icon} ${name} ${type}`);
    console.log(`   📤 Push:  ${info.push || info.fetch}`);
    console.log(`   📥 Fetch: ${info.fetch}`);
    console.log('');
  });

  const backupCount = Object.keys(remoteInfo).filter(name => 
    name.includes('backup') || ['gitlab-backup', 'bitbucket-backup', 'github-backup'].includes(name)
  ).length;

  if (backupCount === 0) {
    console.log('⚠️  No backup remotes configured');
    console.log('💡 Add backup remotes for disaster recovery:');
    console.log('   bun git:mirror setup https://gitlab.com/user/repo.git');
  } else {
    console.log(`✅ ${backupCount} backup remote(s) configured`);
  }
}

function syncRemotes(specificRemote) {
  const remotesResult = runCommand('git remote');
  if (!remotesResult.success || !remotesResult.output) {
    console.log('❌ No remotes configured');
    return;
  }

  const allRemotes = remotesResult.output.split('\n').filter(name => name.trim());
  const remotesToSync = specificRemote ? [specificRemote] : allRemotes;

  console.log('🔄 Syncing repositories...');
  console.log('');

  for (const remote of remotesToSync) {
    if (specificRemote && !allRemotes.includes(remote)) {
      console.log(`❌ Remote '${remote}' not found`);
      continue;
    }

    console.log(`📤 Syncing to ${remote}...`);
    
    // Push all branches
    const pushBranchesResult = runCommand(`git push ${remote} --all`);
    if (pushBranchesResult.success) {
      console.log(`   ✅ Branches synced to ${remote}`);
    } else {
      console.log(`   ❌ Failed to sync branches to ${remote}: ${pushBranchesResult.error}`);
    }
    
    // Push all tags
    const pushTagsResult = runCommand(`git push ${remote} --tags`);
    if (pushTagsResult.success) {
      console.log(`   ✅ Tags synced to ${remote}`);
    } else {
      console.log(`   ⚠️  Failed to sync tags to ${remote}`);
    }
    
    console.log('');
  }

  console.log('🎉 Sync process completed');
  console.log('💡 Your code is now safely backed up across multiple locations');
}

function testRemotes() {
  console.log('🔍 Testing Remote Connectivity');
  console.log('');

  const remotesResult = runCommand('git remote');
  if (!remotesResult.success || !remotesResult.output) {
    console.log('❌ No remotes configured');
    return;
  }

  const remotes = remotesResult.output.split('\n').filter(name => name.trim());
  let allPassed = true;

  for (const remote of remotes) {
    console.log(`🌐 Testing ${remote}...`);
    
    const testResult = runCommand(`git ls-remote --heads ${remote}`, { timeout: 15000 });
    
    if (testResult.success) {
      console.log(`   ✅ ${remote} - Connection successful`);
      
      // Count remote branches
      const branchCount = testResult.output.split('\n').length;
      console.log(`   📊 ${branchCount} branches available`);
    } else {
      console.log(`   ❌ ${remote} - Connection failed`);
      console.log(`   🔍 Error: ${testResult.error}`);
      allPassed = false;
    }
    console.log('');
  }

  if (allPassed) {
    console.log('🎉 All remotes are accessible!');
    console.log('✅ Your backup system is healthy');
  } else {
    console.log('⚠️  Some remotes failed connectivity tests');
    console.log('💡 Check your network connection and credentials');
  }
}

function removeRemote(remoteName) {
  if (!remoteName) {
    console.log('❌ Remote name required');
    console.log('Usage: bun git:mirror remove [REMOTE_NAME]');
    console.log('');
    console.log('Available remotes:');
    const remotesResult = runCommand('git remote');
    if (remotesResult.success) {
      remotesResult.output.split('\n').forEach(name => {
        if (name.trim()) console.log(`   ${name}`);
      });
    }
    return;
  }

  console.log(`🗑️  Removing remote: ${remoteName}`);

  const removeResult = runCommand(`git remote remove ${remoteName}`);
  if (removeResult.success) {
    console.log(`✅ Remote '${remoteName}' removed successfully`);
  } else {
    console.log(`❌ Failed to remove remote: ${removeResult.error}`);
  }
}
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
      error: error.message
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

async function restoreBackup() {
  const backupIdentifier = process.argv[2];
  
  if (!backupIdentifier) {
    console.log('💾 CreatorFlow Backup Restoration');
    console.log('=================================');
    console.log('');
    console.log('Usage: bun git:restore-backup [BACKUP_ID]');
    console.log('');
    console.log('Available backups:');
    
    const backupDir = path.join(process.cwd(), '.git-backups');
    if (!fs.existsSync(backupDir)) {
      console.log('❌ No backups found. Run bun git:backup first.');
      process.exit(1);
    }

    const backups = fs.readdirSync(backupDir)
      .filter(file => file.endsWith('.bundle'))
      .sort()
      .reverse();

    if (backups.length === 0) {
      console.log('❌ No backup files found in .git-backups/');
      process.exit(1);
    }

    backups.forEach((backup, index) => {
      const backupPath = path.join(backupDir, backup);
      const stat = fs.statSync(backupPath);
      const metadataPath = backupPath.replace('.bundle', '.json');
      
      let metadata = {};
      if (fs.existsSync(metadataPath)) {
        try {
          metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
        } catch (e) {
          // Ignore metadata parsing errors
        }
      }
      
      console.log(`${index + 1}. ${backup}`);
      console.log(`   📊 Size: ${formatBytes(stat.size)}`);
      console.log(`   📅 Date: ${stat.mtime.toLocaleString()}`);
      if (metadata.branch) console.log(`   🌿 Branch: ${metadata.branch}`);
      if (metadata.commit) console.log(`   📝 Commit: ${metadata.commit.substring(0, 8)}`);
      console.log('');
    });
    
    console.log('Examples:');
    console.log(`  bun git:restore-backup 1                    # Restore latest backup`);
    console.log(`  bun git:restore-backup "${backups[0]}"       # Restore by filename`);
    console.log('  bun git:restore-backup "2024-01-15"         # Restore by date pattern');
    
    return;
  }

  console.log('🔄 CreatorFlow Backup Restoration');
  console.log('==================================');
  console.log('');

  const backupDir = path.join(process.cwd(), '.git-backups');
  if (!fs.existsSync(backupDir)) {
    console.log('❌ Error: No backup directory found');
    process.exit(1);
  }

  // Find backup file
  let backupFile;
  const availableBackups = fs.readdirSync(backupDir)
    .filter(file => file.endsWith('.bundle'))
    .sort()
    .reverse();

  // Try to match backup by different methods
  if (backupIdentifier.match(/^\d+$/)) {
    // Numeric index
    const index = parseInt(backupIdentifier) - 1;
    if (index >= 0 && index < availableBackups.length) {
      backupFile = availableBackups[index];
    }
  } else if (availableBackups.includes(backupIdentifier)) {
    // Exact filename match
    backupFile = backupIdentifier;
  } else {
    // Partial name match
    const matches = availableBackups.filter(backup => backup.includes(backupIdentifier));
    if (matches.length === 1) {
      backupFile = matches[0];
    } else if (matches.length > 1) {
      console.log('❌ Multiple backups match your criteria:');
      matches.forEach(match => console.log(`   📄 ${match}`));
      console.log('Please be more specific.');
      process.exit(1);
    }
  }

  if (!backupFile) {
    console.log('❌ Error: Backup not found');
    console.log('Available backups:');
    availableBackups.forEach((backup, index) => {
      console.log(`   ${index + 1}. ${backup}`);
    });
    process.exit(1);
  }

  const backupPath = path.join(backupDir, backupFile);
  const metadataPath = backupPath.replace('.bundle', '.json');

  // Load and display backup metadata
  let metadata = {};
  if (fs.existsSync(metadataPath)) {
    try {
      metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
    } catch (e) {
      console.log('⚠️  Warning: Could not read backup metadata');
    }
  }

  console.log(`📦 Restoring backup: ${backupFile}`);
  if (metadata.timestamp) console.log(`📅 Created: ${new Date(metadata.timestamp).toLocaleString()}`);
  if (metadata.repository) console.log(`📂 Repository: ${metadata.repository}`);
  if (metadata.branch) console.log(`🌿 Branch: ${metadata.branch}`);
  if (metadata.commit) console.log(`📝 Commit: ${metadata.commit.substring(0, 8)}`);
  console.log('');

  // Verify backup integrity first
  console.log('🔍 Verifying backup integrity...');
  const verifyResult = runCommand(`git bundle verify "${backupPath}"`);
  
  if (!verifyResult.success) {
    console.log('❌ Error: Backup verification failed');
    console.log('   Backup may be corrupted or incomplete');
    process.exit(1);
  }
  console.log('✅ Backup verification successful');

  // Warning about destructive operation
  console.log('');
  console.log('⚠️  WARNING: This operation will replace your current repository!');
  console.log('   All current changes, branches, and commits will be replaced');
  console.log('   with the backup contents.');
  console.log('');

  // Check if current repo has uncommitted changes
  const statusResult = runCommand('git status --porcelain');
  if (statusResult.success && statusResult.output.length > 0) {
    console.log('⚠️  CRITICAL: You have uncommitted changes that will be LOST!');
    console.log('   Current changes:');
    const changes = statusResult.output.split('\n').slice(0, 5);
    changes.forEach(change => console.log(`   ${change}`));
    if (statusResult.output.split('\n').length > 5) {
      console.log(`   ... and ${statusResult.output.split('\n').length - 5} more files`);
    }
    console.log('');
    console.log('   💡 Consider running: bun git:wip "before restore" first');
  }

  // For safety, require explicit confirmation for non-test environments
  const isTest = process.env.NODE_ENV === 'test' || process.argv.includes('--force');
  if (!isTest) {
    console.log('Type "CONFIRM RESTORE" to proceed with restoration:');
    process.exit(0); // Exit for manual confirmation - would implement readline in production
  }

  try {
    // Create a temporary directory for restoration
    const tempDir = path.join(process.cwd(), '.temp-restore');
    const timestamp = new Date().getTime();
    const restoreDir = `${tempDir}-${timestamp}`;

    console.log('🔄 Starting restoration process...');
    
    // Create temporary directory and clone from bundle
    fs.mkdirSync(restoreDir, { recursive: true });
    process.chdir(restoreDir);
    
    const cloneResult = runCommand(`git clone "${backupPath}" restored-repo`);
    if (!cloneResult.success) {
      throw new Error(`Failed to clone from backup: ${cloneResult.error}`);
    }

    console.log('✅ Backup successfully restored to temporary directory');
    console.log(`📍 Restored repository location: ${path.join(restoreDir, 'restored-repo')}`);
    console.log('');
    console.log('💡 Next steps:');
    console.log('   1. Review the restored repository');
    console.log('   2. Copy needed files to your working directory');
    console.log('   3. Clean up temporary directory when done');
    console.log('');
    console.log('🚨 For complete replacement:');
    console.log('   1. Backup your current repo: bun git:backup');
    console.log('   2. Remove current .git directory');
    console.log('   3. Copy restored .git directory');
    console.log('   4. Run git reset --hard HEAD');

  } catch (error) {
    console.error('❌ Restoration failed:', error.message);
    
    // Cleanup on failure
    if (fs.existsSync(restoreDir)) {
      fs.rmSync(restoreDir, { recursive: true, force: true });
    }
    
    process.exit(1);
  }
}

restoreBackup().catch(error => {
  console.error('❌ Restoration process failed:', error.message);
  process.exit(1);
});
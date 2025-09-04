#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function runCommand(command) {
  try {
    return {
      success: true,
      output: execSync(command, { encoding: 'utf8' }).trim()
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

function getAutomationStatus() {
  const statusFile = path.join(process.cwd(), '.automation-status');
  
  if (!fs.existsSync(statusFile)) {
    return {
      running: false,
      level: 'off',
      startTime: null,
      stats: null
    };
  }

  try {
    const status = JSON.parse(fs.readFileSync(statusFile, 'utf8'));
    return status;
  } catch {
    return {
      running: false,
      level: 'unknown',
      startTime: null,
      stats: null
    };
  }
}

function showStatus() {
  console.log('🤖 CreatorFlow Intelligent Automation Status');
  console.log('============================================');
  console.log('');

  const status = getAutomationStatus();
  
  // Basic status
  const runningIcon = status.running ? '✅' : '❌';
  console.log(`${runningIcon} Status: ${status.running ? 'RUNNING' : 'STOPPED'}`);
  console.log(`🎯 Level: ${status.level.toUpperCase()}`);
  
  if (status.startTime) {
    const uptime = Math.round((Date.now() - new Date(status.startTime).getTime()) / 1000 / 60);
    console.log(`⏰ Uptime: ${uptime} minutes`);
  }
  
  console.log('');

  // Statistics
  if (status.stats) {
    console.log('📊 Statistics:');
    console.log(`   Commands Executed: ${status.stats.commandsExecuted}`);
    console.log(`   Errors Handled: ${status.stats.errorsHandled}`);
    console.log(`   Active Commands: ${status.stats.activeCommands}`);
    console.log(`   Queued Commands: ${status.stats.queuedCommands}`);
    console.log('');
  }

  // System health
  console.log('🏥 System Health:');
  
  // Check if automation engine is actually running
  const psResult = runCommand('ps aux | grep -v grep | grep automation-engine');
  const actuallyRunning = psResult.success && psResult.output.length > 0;
  
  if (status.running && !actuallyRunning) {
    console.log('   ⚠️  Status file shows running but process not found');
    console.log('   💡 Try: bun auto:start');
  } else if (actuallyRunning) {
    console.log('   ✅ Process running normally');
  } else {
    console.log('   💤 Process stopped');
  }

  // Check dependencies
  try {
    require.resolve('chokidar');
    console.log('   ✅ Dependencies available');
  } catch {
    console.log('   ❌ Missing chokidar dependency');
    console.log('   💡 Run: bun install');
  }

  // Check git status
  const gitStatus = runCommand('git status --porcelain');
  if (gitStatus.success) {
    const hasChanges = gitStatus.output.length > 0;
    console.log(`   ${hasChanges ? '📝' : '✅'} Working tree: ${hasChanges ? 'has changes' : 'clean'}`);
  }

  // Check current branch
  const branch = runCommand('git rev-parse --abbrev-ref HEAD');
  if (branch.success) {
    console.log(`   🌿 Branch: ${branch.output}`);
  }

  console.log('');

  // Recent activity
  if (status.stats && status.stats.recentHistory) {
    console.log('📚 Recent Activity:');
    const history = status.stats.recentHistory.slice(-5);
    
    if (history.length === 0) {
      console.log('   No recent activity');
    } else {
      history.forEach(entry => {
        const time = new Date(entry.timestamp).toLocaleTimeString();
        const icon = entry.success ? '✅' : '❌';
        const duration = entry.executionTime ? ` (${entry.executionTime}ms)` : '';
        console.log(`   ${icon} ${time}: ${entry.command}${duration}`);
      });
    }
    console.log('');
  }

  // Commands reference
  console.log('⚡ Quick Commands:');
  console.log('   bun auto:start    - Start intelligent automation (smart level)');
  console.log('   bun auto:full     - Start with maximum automation');
  console.log('   bun auto:minimal  - Start with minimal automation');
  console.log('   bun auto:off      - Stop automation');
  console.log('   bun auto:config   - Configure automation settings');
  console.log('   bun auto:status   - Show this status (current)');

  console.log('');

  // Automation levels explanation
  if (!status.running || process.argv.includes('--help')) {
    console.log('🎚️  Automation Levels:');
    console.log('   FULL     - All commands run automatically on file changes');
    console.log('   SMART    - Intelligent command selection based on context');
    console.log('   MINIMAL  - Only critical commands (type-check, tests)');
    console.log('   OFF      - No automation, manual execution only');
    console.log('');
  }

  // Performance indicators
  if (status.stats) {
    const avgExecutionTime = status.stats.recentHistory?.length > 0 
      ? status.stats.recentHistory.reduce((sum, entry) => sum + (entry.executionTime || 0), 0) / status.stats.recentHistory.length
      : 0;
    
    if (avgExecutionTime > 0) {
      console.log('⚡ Performance:');
      console.log(`   Average Execution: ${Math.round(avgExecutionTime)}ms`);
      
      if (avgExecutionTime > 5000) {
        console.log('   ⚠️  Commands taking longer than expected');
        console.log('   💡 Consider switching to minimal level: bun auto:minimal');
      } else {
        console.log('   ✅ Performance is good');
      }
      console.log('');
    }
  }

  // Tips based on current state
  console.log('💡 Tips:');
  
  if (!status.running) {
    console.log('   • Start automation with: bun auto:start');
    console.log('   • Begin with smart level to see how it works');
  } else {
    console.log('   • Press Ctrl+C in automation terminal to stop');
    console.log('   • Check git status regularly: bun git:status');
    console.log('   • Use bun git:wip "message" for quick saves');
  }

  if (status.level === 'full' && status.stats?.errorsHandled > 5) {
    console.log('   • Many errors detected - consider bun auto:minimal');
  }

  if (status.stats?.queuedCommands > 10) {
    console.log('   • Many queued commands - system may be overloaded');
  }
}

// Handle command line arguments
const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  console.log('Usage: bun auto:status [options]');
  console.log('');
  console.log('Options:');
  console.log('  --help, -h     Show this help message');
  console.log('  --json         Output status as JSON');
  console.log('  --quiet, -q    Show minimal output');
  console.log('');
  process.exit(0);
}

if (args.includes('--json')) {
  console.log(JSON.stringify(getAutomationStatus(), null, 2));
  process.exit(0);
}

if (args.includes('--quiet') || args.includes('-q')) {
  const status = getAutomationStatus();
  console.log(`Status: ${status.running ? 'RUNNING' : 'STOPPED'} (${status.level})`);
  if (status.stats) {
    console.log(`Commands: ${status.stats.commandsExecuted} executed, ${status.stats.queuedCommands} queued`);
  }
  process.exit(0);
}

// Show full status
showStatus();
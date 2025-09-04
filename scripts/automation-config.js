#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

class AutomationConfigManager {
  constructor() {
    this.configPath = path.join(process.cwd(), '.automation-config.json');
    this.defaultConfig = {
      automationLevel: 'smart',
      debounceDelay: 1000,
      maxConcurrentCommands: 3,
      maxCpuUsage: 70,
      enableLogging: true,
      notifications: {
        errors: true,
        successes: false,
        warnings: true
      },
      patterns: {
        components: {
          enabled: true,
          commands: ['type-check', 'test:components', 'lint:fix'],
          debounce: 800,
          priority: 1
        },
        api: {
          enabled: true,
          commands: ['type-check', 'test:api', 'build:verify'],
          debounce: 500,
          priority: 0
        },
        tests: {
          enabled: true,
          commands: ['test:file', 'type-check'],
          debounce: 1500,
          priority: 2
        },
        types: {
          enabled: true,
          commands: ['type-check', 'generate-types'],
          debounce: 600,
          priority: 1
        },
        database: {
          enabled: true,
          commands: ['db:check', 'generate-types', 'test:db'],
          debounce: 200,
          priority: 0
        },
        config: {
          enabled: true,
          commands: ['health-check:full', 'type-check', 'install'],
          debounce: 100,
          priority: 0
        },
        docs: {
          enabled: true,
          commands: ['docs:lint'],
          debounce: 3000,
          priority: 3
        }
      },
      contextualWorkflows: {
        featureDevelopment: {
          enabled: true,
          commands: ['git:safe-start', 'type-check:watch', 'test:related']
        },
        bugFixing: {
          enabled: true,
          commands: ['test:failing', 'type-check:strict']
        },
        refactoring: {
          enabled: true,
          commands: ['test:affected', 'type-check:full', 'build:verify']
        }
      },
      performance: {
        enableSmartThrottling: true,
        enableResourceMonitoring: true,
        enableCommandCaching: true
      }
    };
  }

  loadConfig() {
    try {
      if (!fs.existsSync(this.configPath)) {
        return { ...this.defaultConfig };
      }
      
      const config = JSON.parse(fs.readFileSync(this.configPath, 'utf8'));
      return { ...this.defaultConfig, ...config };
    } catch (error) {
      console.log(`⚠️  Error loading config: ${error.message}`);
      return { ...this.defaultConfig };
    }
  }

  saveConfig(config) {
    try {
      fs.writeFileSync(this.configPath, JSON.stringify(config, null, 2));
      console.log('✅ Configuration saved successfully');
      return true;
    } catch (error) {
      console.log(`❌ Error saving config: ${error.message}`);
      return false;
    }
  }

  showCurrentConfig() {
    const config = this.loadConfig();
    
    console.log('🤖 CreatorFlow Automation Configuration');
    console.log('=====================================');
    console.log('');
    
    console.log(`🎯 Automation Level: ${config.automationLevel.toUpperCase()}`);
    console.log(`⏰ Debounce Delay: ${config.debounceDelay}ms`);
    console.log(`🔀 Max Concurrent: ${config.maxConcurrentCommands} commands`);
    console.log(`🖥️  Max CPU Usage: ${config.maxCpuUsage}%`);
    console.log(`📝 Logging: ${config.enableLogging ? 'Enabled' : 'Disabled'}`);
    console.log('');

    console.log('🔔 Notifications:');
    console.log(`   Errors: ${config.notifications.errors ? '✅' : '❌'}`);
    console.log(`   Successes: ${config.notifications.successes ? '✅' : '❌'}`);
    console.log(`   Warnings: ${config.notifications.warnings ? '✅' : '❌'}`);
    console.log('');

    console.log('📁 File Patterns:');
    Object.entries(config.patterns).forEach(([name, pattern]) => {
      const status = pattern.enabled ? '✅' : '❌';
      const commandCount = pattern.commands.length;
      console.log(`   ${status} ${name}: ${commandCount} commands (${pattern.debounce}ms debounce)`);
    });
    console.log('');

    console.log('🔄 Contextual Workflows:');
    Object.entries(config.contextualWorkflows).forEach(([name, workflow]) => {
      const status = workflow.enabled ? '✅' : '❌';
      const commandCount = workflow.commands.length;
      console.log(`   ${status} ${name}: ${commandCount} commands`);
    });
    console.log('');

    console.log('⚡ Performance:');
    console.log(`   Smart Throttling: ${config.performance.enableSmartThrottling ? '✅' : '❌'}`);
    console.log(`   Resource Monitoring: ${config.performance.enableResourceMonitoring ? '✅' : '❌'}`);
    console.log(`   Command Caching: ${config.performance.enableCommandCaching ? '✅' : '❌'}`);
    console.log('');
  }

  async interactiveConfig() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    const question = (prompt) => new Promise(resolve => rl.question(prompt, resolve));

    try {
      console.log('🤖 Interactive Automation Configuration');
      console.log('=====================================');
      console.log('');

      const config = this.loadConfig();

      // Automation Level
      console.log('Current automation levels:');
      console.log('  1. FULL     - All commands run automatically');
      console.log('  2. SMART    - Intelligent command selection (recommended)');
      console.log('  3. MINIMAL  - Only critical commands');
      console.log('  4. OFF      - No automation');
      console.log('');

      const levelMap = { '1': 'full', '2': 'smart', '3': 'minimal', '4': 'off' };
      const currentLevel = Object.keys(levelMap).find(key => levelMap[key] === config.automationLevel) || '2';
      
      const levelChoice = await question(`Select automation level [${currentLevel}]: `);
      if (levelChoice && levelMap[levelChoice]) {
        config.automationLevel = levelMap[levelChoice];
      }

      // Performance Settings
      console.log('');
      const maxCommands = await question(`Max concurrent commands [${config.maxConcurrentCommands}]: `);
      if (maxCommands && !isNaN(maxCommands)) {
        config.maxConcurrentCommands = parseInt(maxCommands);
      }

      const maxCpu = await question(`Max CPU usage % [${config.maxCpuUsage}]: `);
      if (maxCpu && !isNaN(maxCpu)) {
        config.maxCpuUsage = parseInt(maxCpu);
      }

      const debounce = await question(`Debounce delay ms [${config.debounceDelay}]: `);
      if (debounce && !isNaN(debounce)) {
        config.debounceDelay = parseInt(debounce);
      }

      // Notifications
      console.log('');
      const showErrors = await question(`Show error notifications? [${config.notifications.errors ? 'y' : 'n'}]: `);
      if (showErrors.toLowerCase() === 'y' || showErrors.toLowerCase() === 'n') {
        config.notifications.errors = showErrors.toLowerCase() === 'y';
      }

      const showSuccesses = await question(`Show success notifications? [${config.notifications.successes ? 'y' : 'n'}]: `);
      if (showSuccesses.toLowerCase() === 'y' || showSuccesses.toLowerCase() === 'n') {
        config.notifications.successes = showSuccesses.toLowerCase() === 'y';
      }

      // File Patterns
      console.log('');
      console.log('Configure file pattern automations:');
      
      for (const [patternName, pattern] of Object.entries(config.patterns)) {
        const enable = await question(`Enable ${patternName} automation? [${pattern.enabled ? 'y' : 'n'}]: `);
        if (enable.toLowerCase() === 'y' || enable.toLowerCase() === 'n') {
          config.patterns[patternName].enabled = enable.toLowerCase() === 'y';
        }
      }

      // Save configuration
      console.log('');
      const save = await question('Save configuration? [y]: ');
      if (save.toLowerCase() !== 'n') {
        this.saveConfig(config);
        console.log('');
        console.log('🎉 Configuration updated successfully!');
        console.log('💡 Restart automation to apply changes: bun auto:start');
      }

    } catch (error) {
      console.log(`❌ Configuration error: ${error.message}`);
    } finally {
      rl.close();
    }
  }

  quickConfig(level) {
    const config = this.loadConfig();
    
    const presets = {
      beginner: {
        automationLevel: 'smart',
        maxConcurrentCommands: 2,
        maxCpuUsage: 60,
        debounceDelay: 2000,
        notifications: { errors: true, successes: false, warnings: true },
        performance: { enableSmartThrottling: true, enableResourceMonitoring: true, enableCommandCaching: true }
      },
      
      developer: {
        automationLevel: 'smart',
        maxConcurrentCommands: 3,
        maxCpuUsage: 70,
        debounceDelay: 1000,
        notifications: { errors: true, successes: false, warnings: true },
        performance: { enableSmartThrottling: true, enableResourceMonitoring: true, enableCommandCaching: true }
      },
      
      power: {
        automationLevel: 'full',
        maxConcurrentCommands: 5,
        maxCpuUsage: 80,
        debounceDelay: 500,
        notifications: { errors: true, successes: true, warnings: true },
        performance: { enableSmartThrottling: true, enableResourceMonitoring: true, enableCommandCaching: true }
      },
      
      conservative: {
        automationLevel: 'minimal',
        maxConcurrentCommands: 1,
        maxCpuUsage: 50,
        debounceDelay: 3000,
        notifications: { errors: true, successes: false, warnings: false },
        performance: { enableSmartThrottling: true, enableResourceMonitoring: true, enableCommandCaching: false }
      }
    };

    if (!presets[level]) {
      console.log(`❌ Unknown preset: ${level}`);
      console.log('Available presets: beginner, developer, power, conservative');
      return false;
    }

    const preset = presets[level];
    const newConfig = { ...config, ...preset };

    if (this.saveConfig(newConfig)) {
      console.log(`✅ Applied ${level} preset successfully!`);
      console.log('');
      this.showCurrentConfig();
      return true;
    }

    return false;
  }

  resetToDefaults() {
    if (this.saveConfig(this.defaultConfig)) {
      console.log('✅ Configuration reset to defaults');
      this.showCurrentConfig();
      return true;
    }
    return false;
  }

  exportConfig() {
    const config = this.loadConfig();
    const exportPath = path.join(process.cwd(), 'automation-config-backup.json');
    
    try {
      fs.writeFileSync(exportPath, JSON.stringify(config, null, 2));
      console.log(`✅ Configuration exported to: ${exportPath}`);
      return true;
    } catch (error) {
      console.log(`❌ Export failed: ${error.message}`);
      return false;
    }
  }

  importConfig(importPath) {
    try {
      if (!fs.existsSync(importPath)) {
        console.log(`❌ Config file not found: ${importPath}`);
        return false;
      }

      const importedConfig = JSON.parse(fs.readFileSync(importPath, 'utf8'));
      const mergedConfig = { ...this.defaultConfig, ...importedConfig };

      if (this.saveConfig(mergedConfig)) {
        console.log('✅ Configuration imported successfully');
        this.showCurrentConfig();
        return true;
      }

      return false;
    } catch (error) {
      console.log(`❌ Import failed: ${error.message}`);
      return false;
    }
  }
}

// CLI Interface
async function main() {
  const manager = new AutomationConfigManager();
  const args = process.argv.slice(2);

  if (args.length === 0) {
    manager.showCurrentConfig();
    return;
  }

  const command = args[0];

  switch (command) {
    case 'show':
    case 'status':
      manager.showCurrentConfig();
      break;

    case 'edit':
    case 'interactive':
      await manager.interactiveConfig();
      break;

    case 'preset':
      const preset = args[1];
      if (!preset) {
        console.log('Available presets: beginner, developer, power, conservative');
        console.log('Usage: bun auto:config preset [preset-name]');
      } else {
        manager.quickConfig(preset);
      }
      break;

    case 'reset':
      manager.resetToDefaults();
      break;

    case 'export':
      manager.exportConfig();
      break;

    case 'import':
      const importPath = args[1];
      if (!importPath) {
        console.log('Usage: bun auto:config import [path-to-config.json]');
      } else {
        manager.importConfig(importPath);
      }
      break;

    case 'help':
    case '--help':
    case '-h':
      console.log('CreatorFlow Automation Configuration');
      console.log('');
      console.log('Usage: bun auto:config [command] [options]');
      console.log('');
      console.log('Commands:');
      console.log('  show              Show current configuration (default)');
      console.log('  edit              Interactive configuration editor');
      console.log('  preset [name]     Apply preset configuration');
      console.log('  reset             Reset to default configuration');
      console.log('  export            Export configuration to backup file');
      console.log('  import [path]     Import configuration from file');
      console.log('  help              Show this help');
      console.log('');
      console.log('Presets:');
      console.log('  beginner          Safe settings for new users');
      console.log('  developer         Balanced settings for daily development');
      console.log('  power             Maximum automation for power users');
      console.log('  conservative      Minimal automation, maximum stability');
      console.log('');
      console.log('Examples:');
      console.log('  bun auto:config preset developer');
      console.log('  bun auto:config edit');
      console.log('  bun auto:config export');
      break;

    default:
      console.log(`❌ Unknown command: ${command}`);
      console.log('Run "bun auto:config help" for usage information');
  }
}

if (require.main === module) {
  main().catch(error => {
    console.error('❌ Configuration error:', error);
    process.exit(1);
  });
}

module.exports = AutomationConfigManager;
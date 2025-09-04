#!/usr/bin/env node

const { execSync, spawn } = require('child_process');
const chokidar = require('chokidar');
const path = require('path');
const fs = require('fs');
const { EventEmitter } = require('events');

class IntelligentAutomationEngine extends EventEmitter {
  constructor(config = {}) {
    super();
    
    // Load configuration from file
    this.configPath = path.join(process.cwd(), '.automation-config.json');
    this.statusPath = path.join(process.cwd(), '.automation-status');
    this.loadConfiguration();
    
    // Override with any passed config
    this.config = { ...this.config, ...config };
    
    this.commandQueue = new Map();
    this.activeCommands = new Map();
    this.commandHistory = [];
    this.isRunning = false;
    this.startTime = null;
    this.stats = {
      commandsExecuted: 0,
      errorsHandled: 0,
      timesSaved: 0
    };
    
    this.setupIntelligentPatterns();
    this.setupContextDetection();
    
    // Persist status every 10 seconds
    this.statusInterval = null;
  }

  loadConfiguration() {
    try {
      if (fs.existsSync(this.configPath)) {
        const fileConfig = JSON.parse(fs.readFileSync(this.configPath, 'utf8'));
        this.config = fileConfig;
      } else {
        // Default configuration
        this.config = {
          automationLevel: 'smart',
          debounceDelay: 1000,
          maxConcurrentCommands: 3,
          maxCpuUsage: 70,
          enableLogging: true,
          notifications: {
            errors: true,
            successes: false,
            warnings: true
          }
        };
      }
    } catch (error) {
      console.log(`⚠️  Error loading configuration: ${error.message}`);
      this.config = {
        automationLevel: 'smart',
        debounceDelay: 1000,
        maxConcurrentCommands: 3,
        maxCpuUsage: 70,
        enableLogging: true
      };
    }
  }

  persistStatus() {
    try {
      const status = {
        running: this.isRunning,
        level: this.config.automationLevel,
        startTime: this.startTime,
        stats: {
          ...this.stats,
          activeCommands: this.activeCommands.size,
          queuedCommands: this.commandQueue.size,
          recentHistory: this.commandHistory.slice(-10)
        },
        lastUpdate: new Date().toISOString()
      };

      fs.writeFileSync(this.statusPath, JSON.stringify(status, null, 2));
    } catch (error) {
      // Silent fail for status persistence
    }
  }

  setupIntelligentPatterns() {
    this.patterns = {
      // React Components - High Priority
      components: {
        pattern: ['src/components/**/*.{tsx,ts}', 'src/features/**/*.{tsx,ts}'],
        commands: ['type-check', 'test:components', 'lint:fix'],
        debounce: 800,
        priority: 1,
        parallel: true,
        description: 'React component development'
      },

      // API Routes - Critical Priority
      api: {
        pattern: ['src/app/api/**/*.ts', 'src/app/**/route.ts'],
        commands: ['type-check', 'test:api', 'build:verify'],
        debounce: 500,
        priority: 0, // Highest priority
        parallel: false,
        description: 'API route development'
      },

      // Test Files - Medium Priority
      tests: {
        pattern: ['**/*.{test,spec}.{ts,tsx,js}', '__tests__/**/*.{ts,tsx,js}'],
        commands: ['test:file', 'type-check'],
        debounce: 1500,
        priority: 2,
        parallel: true,
        description: 'Test development'
      },

      // Type Definitions - High Priority
      types: {
        pattern: ['src/types/**/*.ts', '**/*.d.ts'],
        commands: ['type-check', 'generate-types'],
        debounce: 600,
        priority: 1,
        parallel: true,
        description: 'Type definitions'
      },

      // Database Changes - Critical Priority
      database: {
        pattern: ['supabase/**/*.{sql,ts}', 'src/lib/supabase/**/*.ts'],
        commands: ['db:check', 'generate-types', 'test:db'],
        debounce: 200,
        priority: 0,
        parallel: false,
        description: 'Database schema changes'
      },

      // Configuration Files - System Priority
      config: {
        pattern: ['*.config.{js,ts}', '.env*', 'package.json', 'tsconfig.json'],
        commands: ['health-check:full', 'type-check', 'install'],
        debounce: 100,
        priority: 0,
        parallel: false,
        description: 'Configuration changes'
      },

      // Documentation - Low Priority
      docs: {
        pattern: ['docs/**/*.md', 'README.md', '**/*.mdx'],
        commands: ['docs:lint'],
        debounce: 3000,
        priority: 3,
        parallel: true,
        description: 'Documentation updates'
      }
    };
  }

  setupContextDetection() {
    this.contextDetectors = {
      // New feature development
      featureDevelopment: {
        detect: (filePath, changeType) => {
          return changeType === 'add' && 
                 filePath.includes('src/features/') && 
                 this.getCurrentBranch().startsWith('feature/');
        },
        workflow: ['git:safe-start', 'type-check:watch', 'test:related'],
        description: 'New feature development detected'
      },

      // Bug fixing
      bugFixing: {
        detect: (filePath, changeType) => {
          const branch = this.getCurrentBranch();
          return (branch.startsWith('fix/') || branch.startsWith('hotfix/')) &&
                 (filePath.includes('.test.') || filePath.includes('__tests__'));
        },
        workflow: ['test:failing', 'type-check:strict'],
        description: 'Bug fixing workflow detected'
      },

      // Refactoring
      refactoring: {
        detect: (filePath, changeType) => {
          return this.getCurrentBranch().startsWith('refactor/') &&
                 changeType === 'change';
        },
        workflow: ['test:affected', 'type-check:full', 'build:verify'],
        description: 'Refactoring workflow detected'
      }
    };
  }

  async start() {
    if (this.isRunning) {
      this.log('Automation engine already running');
      return;
    }

    this.log('🚀 Starting Intelligent Automation Engine');
    this.log(`📊 Automation Level: ${this.config.automationLevel}`);
    this.log(`🎯 Max Concurrent Commands: ${this.config.maxConcurrentCommands}`);
    
    if (this.config.automationLevel === 'off') {
      this.log('❌ Automation disabled');
      return;
    }

    this.isRunning = true;
    this.startTime = new Date().toISOString();
    
    this.setupWatchers();
    this.startCommandProcessor();
    
    // Start status persistence
    this.statusInterval = setInterval(() => {
      this.persistStatus();
    }, 10000); // Every 10 seconds
    
    // Initial status save
    this.persistStatus();
    
    // Show initial status
    this.showStatus();
    
    this.emit('started');
  }

  setupWatchers() {
    // Collect all patterns
    const allPatterns = Object.values(this.patterns)
      .flatMap(p => Array.isArray(p.pattern) ? p.pattern : [p.pattern]);

    this.watcher = chokidar.watch(allPatterns, {
      ignored: [
        'node_modules/**',
        '.git/**',
        'dist/**',
        'build/**',
        '.next/**',
        '**/*.log',
        'coverage/**',
        '.git-backups/**'
      ],
      persistent: true,
      ignoreInitial: true,
      awaitWriteFinish: {
        stabilityThreshold: 100,
        pollInterval: 50
      }
    });

    this.watcher
      .on('add', (filePath) => this.handleFileChange(filePath, 'add'))
      .on('change', (filePath) => this.handleFileChange(filePath, 'change'))
      .on('unlink', (filePath) => this.handleFileChange(filePath, 'delete'))
      .on('error', (error) => this.handleError('watcher', error));

    this.log('👀 File watchers initialized');
  }

  async handleFileChange(filePath, changeType) {
    if (!this.isRunning) return;

    const relativePath = path.relative(process.cwd(), filePath);
    this.log(`📁 File ${changeType}: ${relativePath}`);

    // Analyze context
    const context = this.analyzeContext(relativePath, changeType);
    if (!context) return;

    // Check if we should trigger contextual workflow
    this.checkContextualWorkflows(relativePath, changeType);

    // Queue appropriate commands
    await this.queueCommands(context, relativePath);
  }

  analyzeContext(filePath, changeType) {
    for (const [name, pattern] of Object.entries(this.patterns)) {
      const patterns = Array.isArray(pattern.pattern) ? pattern.pattern : [pattern.pattern];
      
      for (const p of patterns) {
        if (this.matchesPattern(filePath, p)) {
          return {
            name,
            ...pattern,
            filePath,
            changeType
          };
        }
      }
    }
    return null;
  }

  matchesPattern(filePath, pattern) {
    // Convert glob pattern to regex (simplified)
    const regexPattern = pattern
      .replace(/\*\*/g, '.*')
      .replace(/\*/g, '[^/]*')
      .replace(/\./g, '\\.')
      .replace(/\{([^}]+)\}/g, '($1)')
      .replace(/,/g, '|');
    
    const regex = new RegExp(`^${regexPattern}$`);
    return regex.test(filePath);
  }

  async queueCommands(context, filePath) {
    const commands = this.selectCommands(context);
    
    for (const command of commands) {
      const queueKey = `${context.name}-${command}`;
      
      // Debounce: if same command is already queued, update timestamp
      if (this.commandQueue.has(queueKey)) {
        this.commandQueue.get(queueKey).timestamp = Date.now();
        this.log(`⏰ Debounced: ${command} (${context.description})`);
      } else {
        this.commandQueue.set(queueKey, {
          command,
          context,
          filePath,
          timestamp: Date.now(),
          debounce: context.debounce
        });
        this.log(`📋 Queued: ${command} (${context.description})`);
      }
    }
  }

  selectCommands(context) {
    // Smart command selection based on automation level
    switch (this.config.automationLevel) {
      case 'full':
        return context.commands;
      
      case 'smart':
        // Filter based on priority and system load
        return context.commands.filter(cmd => {
          const isHighPriority = context.priority <= 1;
          const isSystemHealthy = this.getSystemLoad() < this.config.maxCpuUsage;
          return isHighPriority || isSystemHealthy;
        });
      
      case 'minimal':
        // Only critical commands
        return context.priority === 0 ? context.commands.slice(0, 1) : [];
      
      default:
        return [];
    }
  }

  startCommandProcessor() {
    // Process command queue every second
    this.commandInterval = setInterval(() => {
      this.processCommandQueue();
    }, 1000);
  }

  async processCommandQueue() {
    if (this.activeCommands.size >= this.config.maxConcurrentCommands) {
      return; // Too many active commands
    }

    const now = Date.now();
    const readyCommands = [];

    // Find commands ready for execution
    for (const [key, queuedCommand] of this.commandQueue.entries()) {
      if (now - queuedCommand.timestamp >= queuedCommand.debounce) {
        readyCommands.push({ key, ...queuedCommand });
      }
    }

    // Sort by priority
    readyCommands.sort((a, b) => a.context.priority - b.context.priority);

    // Execute ready commands
    for (const readyCommand of readyCommands) {
      if (this.activeCommands.size >= this.config.maxConcurrentCommands) {
        break;
      }

      this.commandQueue.delete(readyCommand.key);
      await this.executeCommand(readyCommand);
    }
  }

  async executeCommand(queuedCommand) {
    const { command, context, filePath } = queuedCommand;
    const executionId = `${command}-${Date.now()}`;

    try {
      this.log(`🚀 Executing: ${command} (${context.description})`);
      
      this.activeCommands.set(executionId, {
        command,
        startTime: Date.now(),
        filePath
      });

      const startTime = Date.now();
      const result = await this.runBunCommand(command);
      const executionTime = Date.now() - startTime;

      this.activeCommands.delete(executionId);
      this.stats.commandsExecuted++;

      if (result.success) {
        this.log(`✅ Completed: ${command} (${executionTime}ms)`);
        this.emit('commandSuccess', { command, executionTime, output: result.output });
      } else {
        this.log(`❌ Failed: ${command} - ${result.error}`);
        this.handleCommandError(command, result.error);
      }

      // Record in history
      this.commandHistory.push({
        command,
        success: result.success,
        executionTime,
        timestamp: Date.now(),
        filePath
      });

      // Keep only last 100 entries
      if (this.commandHistory.length > 100) {
        this.commandHistory = this.commandHistory.slice(-100);
      }

    } catch (error) {
      this.activeCommands.delete(executionId);
      this.handleCommandError(command, error.message);
    }
  }

  async runBunCommand(command) {
    return new Promise((resolve) => {
      const fullCommand = `bun run ${command}`;
      
      const child = spawn('bun', ['run', command], {
        stdio: ['pipe', 'pipe', 'pipe'],
        cwd: process.cwd(),
        timeout: 60000 // 60 second timeout
      });

      let output = '';
      let error = '';

      child.stdout.on('data', (data) => {
        output += data.toString();
      });

      child.stderr.on('data', (data) => {
        error += data.toString();
      });

      child.on('close', (code) => {
        resolve({
          success: code === 0,
          output: output.trim(),
          error: error.trim(),
          exitCode: code
        });
      });

      child.on('error', (err) => {
        resolve({
          success: false,
          output: '',
          error: err.message,
          exitCode: -1
        });
      });
    });
  }

  handleCommandError(command, error) {
    this.stats.errorsHandled++;
    this.log(`⚠️  Error in ${command}: ${error}`, 'warn');
    
    // Emit error event for external handling
    this.emit('commandError', { command, error });

    // Smart error recovery
    if (error.includes('ENOENT') || error.includes('not found')) {
      this.log(`💡 Suggestion: Check if '${command}' script exists in package.json`, 'info');
    }
    
    if (error.includes('EACCES')) {
      this.log('💡 Suggestion: Check file permissions', 'info');
    }
  }

  checkContextualWorkflows(filePath, changeType) {
    for (const [name, detector] of Object.entries(this.contextDetectors)) {
      if (detector.detect(filePath, changeType)) {
        this.log(`🎯 ${detector.description}`);
        
        // Queue contextual workflow commands
        for (const workflowCommand of detector.workflow) {
          this.commandQueue.set(`workflow-${name}-${workflowCommand}`, {
            command: workflowCommand,
            context: { 
              name: `workflow-${name}`, 
              description: detector.description,
              priority: 0,
              debounce: 500,
              parallel: true
            },
            filePath,
            timestamp: Date.now()
          });
        }
        break; // Only trigger first matching workflow
      }
    }
  }

  getCurrentBranch() {
    try {
      return execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).trim();
    } catch {
      return 'unknown';
    }
  }

  getSystemLoad() {
    // Simplified system load check - would use actual system metrics in production
    return Math.min(this.activeCommands.size * 20, 100);
  }

  showStatus() {
    console.log('\n🤖 Intelligent Automation Engine Status');
    console.log('==========================================');
    console.log(`📊 Automation Level: ${this.config.automationLevel}`);
    console.log(`🏃 Active Commands: ${this.activeCommands.size}/${this.config.maxConcurrentCommands}`);
    console.log(`📋 Queued Commands: ${this.commandQueue.size}`);
    console.log(`✅ Commands Executed: ${this.stats.commandsExecuted}`);
    console.log(`❌ Errors Handled: ${this.stats.errorsHandled}`);
    console.log(`🌿 Current Branch: ${this.getCurrentBranch()}`);
    
    if (this.commandQueue.size > 0) {
      console.log('\n📋 Current Queue:');
      for (const [key, cmd] of this.commandQueue.entries()) {
        const timeLeft = Math.max(0, cmd.debounce - (Date.now() - cmd.timestamp));
        console.log(`   ⏰ ${cmd.command} (${Math.round(timeLeft/1000)}s) - ${cmd.context.description}`);
      }
    }

    if (this.activeCommands.size > 0) {
      console.log('\n🚀 Active Commands:');
      for (const [id, cmd] of this.activeCommands.entries()) {
        const runtime = Math.round((Date.now() - cmd.startTime) / 1000);
        console.log(`   ▶️  ${cmd.command} (${runtime}s)`);
      }
    }
    console.log('');
  }

  async stop() {
    if (!this.isRunning) return;

    this.log('🛑 Stopping Automation Engine...');
    this.isRunning = false;

    if (this.watcher) {
      await this.watcher.close();
    }

    if (this.commandInterval) {
      clearInterval(this.commandInterval);
    }

    if (this.statusInterval) {
      clearInterval(this.statusInterval);
    }

    // Wait for active commands to finish
    while (this.activeCommands.size > 0) {
      this.log(`⏳ Waiting for ${this.activeCommands.size} commands to finish...`);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // Final status update
    this.persistStatus();

    this.emit('stopped');
    this.log('✅ Automation Engine stopped');
  }

  handleError(source, error) {
    this.log(`❌ ${source} error: ${error.message}`, 'error');
    this.emit('error', { source, error });
  }

  log(message, level = 'info') {
    if (!this.config.enableLogging) return;

    const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
    const prefix = level === 'error' ? '❌' : level === 'warn' ? '⚠️' : '🤖';
    console.log(`[${timestamp}] ${prefix} ${message}`);
  }

  // Public API methods
  getStats() {
    return {
      ...this.stats,
      activeCommands: this.activeCommands.size,
      queuedCommands: this.commandQueue.size,
      recentHistory: this.commandHistory.slice(-10)
    };
  }

  pauseAutomation() {
    this.config.automationLevel = 'off';
    this.log('⏸️  Automation paused');
  }

  resumeAutomation(level = 'smart') {
    this.config.automationLevel = level;
    this.log(`▶️  Automation resumed (${level})`);
  }
}

// CLI Interface
if (require.main === module) {
  const config = {
    automationLevel: process.argv[2] || 'smart',
    enableLogging: !process.argv.includes('--silent')
  };

  const engine = new IntelligentAutomationEngine(config);

  // Handle graceful shutdown
  process.on('SIGINT', async () => {
    console.log('\n🛑 Received SIGINT, shutting down gracefully...');
    await engine.stop();
    process.exit(0);
  });

  process.on('SIGTERM', async () => {
    console.log('\n🛑 Received SIGTERM, shutting down gracefully...');
    await engine.stop();
    process.exit(0);
  });

  // Handle uncaught errors
  process.on('uncaughtException', (error) => {
    console.error('❌ Uncaught Exception:', error);
    engine.stop().then(() => process.exit(1));
  });

  // Start the engine
  engine.start().catch(error => {
    console.error('❌ Failed to start automation engine:', error);
    process.exit(1);
  });

  // Status updates every 30 seconds
  setInterval(() => {
    if (engine.isRunning && process.argv.includes('--verbose')) {
      engine.showStatus();
    }
  }, 30000);
}

module.exports = IntelligentAutomationEngine;
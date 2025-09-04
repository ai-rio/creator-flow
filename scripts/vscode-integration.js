#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class VSCodeIntegration {
  constructor() {
    this.vscodeDir = path.join(process.cwd(), '.vscode');
    this.settingsPath = path.join(this.vscodeDir, 'settings.json');
    this.tasksPath = path.join(this.vscodeDir, 'tasks.json');
    this.keybindingsPath = path.join(this.vscodeDir, 'keybindings.json');
    this.extensionsPath = path.join(this.vscodeDir, 'extensions.json');
  }

  async setup() {
    console.log('🚀 Setting up VS Code Integration for CreatorFlow');
    console.log('===============================================');
    console.log('');

    // Ensure .vscode directory exists
    if (!fs.existsSync(this.vscodeDir)) {
      fs.mkdirSync(this.vscodeDir, { recursive: true });
      console.log('✅ Created .vscode directory');
    }

    // Setup all integration components
    await this.setupSettings();
    await this.setupTasks();
    await this.setupKeybindings();
    await this.setupExtensions();
    await this.setupStatusBar();

    console.log('');
    console.log('🎉 VS Code Integration Complete!');
    console.log('');
    console.log('📋 Next Steps:');
    console.log('   1. Restart VS Code to load new settings');
    console.log('   2. Install recommended extensions when prompted');
    console.log('   3. Use Ctrl+Shift+P → "CreatorFlow" to see commands');
    console.log('   4. Check status bar for automation status');
    console.log('');
    console.log('⌨️  Quick Keyboard Shortcuts:');
    console.log('   Ctrl+Alt+A     - Toggle automation');
    console.log('   Ctrl+Alt+S     - Show automation status');
    console.log('   Ctrl+Alt+G     - Quick git workflow');
    console.log('   Ctrl+Alt+T     - Run type check');
    console.log('   Ctrl+Alt+B     - Build project');
  }

  async setupSettings() {
    console.log('⚙️  Configuring VS Code settings...');

    const settings = {
      // TypeScript settings for better automation
      "typescript.preferences.includePackageJsonAutoImports": "on",
      "typescript.suggest.autoImports": true,
      "typescript.updateImportsOnFileMove.enabled": "always",
      
      // Auto-save settings for better automation triggers
      "files.autoSave": "afterDelay",
      "files.autoSaveDelay": 1000,
      
      // File watching settings
      "files.watcherExclude": {
        "**/.git/**": true,
        "**/node_modules/**": true,
        "**/.next/**": true,
        "**/dist/**": true,
        "**/.git-backups/**": true,
        "**/.automation-*": true
      },

      // Terminal integration
      "terminal.integrated.cwd": "${workspaceFolder}",
      "terminal.integrated.defaultProfile.linux": "bash",
      "terminal.integrated.defaultProfile.osx": "zsh",
      "terminal.integrated.defaultProfile.windows": "PowerShell",

      // Editor settings for better workflow
      "editor.formatOnSave": true,
      "editor.codeActionsOnSave": {
        "source.fixAll.eslint": "explicit",
        "source.organizeImports": "explicit"
      },

      // Git settings
      "git.autofetch": true,
      "git.enableSmartCommit": true,
      "git.confirmSync": false,

      // CreatorFlow specific settings
      "creatorflow.automation.enabled": true,
      "creatorflow.automation.level": "smart",
      "creatorflow.showStatusBar": true,
      "creatorflow.autoGitWorkflow": true,

      // Integrated terminal
      "terminal.integrated.env.linux": {
        "CREATORFLOW_IDE": "vscode"
      },
      "terminal.integrated.env.osx": {
        "CREATORFLOW_IDE": "vscode"
      },
      "terminal.integrated.env.windows": {
        "CREATORFLOW_IDE": "vscode"
      }
    };

    await this.mergeJsonFile(this.settingsPath, settings);
    console.log('   ✅ Settings configured');
  }

  async setupTasks() {
    console.log('⚡ Configuring VS Code tasks...');

    const tasks = {
      "version": "2.0.0",
      "tasks": [
        {
          "label": "CreatorFlow: Start Automation",
          "type": "shell",
          "command": "bun",
          "args": ["auto:start"],
          "group": {
            "kind": "build",
            "isDefault": false
          },
          "presentation": {
            "echo": true,
            "reveal": "always",
            "focus": false,
            "panel": "shared",
            "showReuseMessage": true,
            "clear": false
          },
          "runOptions": {
            "runOn": "folderOpen"
          },
          "problemMatcher": []
        },
        {
          "label": "CreatorFlow: Stop Automation",
          "type": "shell",
          "command": "pkill",
          "args": ["-f", "automation-engine"],
          "group": "build",
          "presentation": {
            "echo": true,
            "reveal": "silent",
            "focus": false,
            "panel": "shared"
          }
        },
        {
          "label": "CreatorFlow: Type Check",
          "type": "shell",
          "command": "bun",
          "args": ["run", "type-check"],
          "group": {
            "kind": "build",
            "isDefault": true
          },
          "presentation": {
            "echo": true,
            "reveal": "always",
            "focus": false,
            "panel": "shared"
          },
          "problemMatcher": ["$tsc"]
        },
        {
          "label": "CreatorFlow: Run Tests",
          "type": "shell",
          "command": "bun",
          "args": ["test"],
          "group": "test",
          "presentation": {
            "echo": true,
            "reveal": "always",
            "focus": false,
            "panel": "shared"
          }
        },
        {
          "label": "CreatorFlow: Git Safe Start",
          "type": "shell",
          "command": "bun",
          "args": ["git:safe-start"],
          "group": "build",
          "presentation": {
            "echo": true,
            "reveal": "always",
            "focus": true,
            "panel": "shared"
          }
        },
        {
          "label": "CreatorFlow: Git WIP Save",
          "type": "shell",
          "command": "bun",
          "args": ["git:wip", "${input:wipMessage}"],
          "group": "build",
          "presentation": {
            "echo": true,
            "reveal": "always",
            "focus": false,
            "panel": "shared"
          }
        },
        {
          "label": "CreatorFlow: Git Done",
          "type": "shell",
          "command": "bun",
          "args": ["git:done"],
          "group": "build",
          "presentation": {
            "echo": true,
            "reveal": "always",
            "focus": false,
            "panel": "shared"
          }
        },
        {
          "label": "CreatorFlow: Health Check",
          "type": "shell",
          "command": "bun",
          "args": ["git:health-check"],
          "group": "build",
          "presentation": {
            "echo": true,
            "reveal": "always",
            "focus": false,
            "panel": "shared"
          }
        }
      ],
      "inputs": [
        {
          "id": "wipMessage",
          "description": "WIP commit message",
          "default": "work in progress",
          "type": "promptString"
        }
      ]
    };

    await this.writeJsonFile(this.tasksPath, tasks);
    console.log('   ✅ Tasks configured');
  }

  async setupKeybindings() {
    console.log('⌨️  Configuring keyboard shortcuts...');

    const keybindings = [
      {
        "key": "ctrl+alt+a",
        "command": "workbench.action.tasks.runTask",
        "args": "CreatorFlow: Start Automation",
        "when": "!terminalFocus"
      },
      {
        "key": "ctrl+alt+shift+a",
        "command": "workbench.action.tasks.runTask",
        "args": "CreatorFlow: Stop Automation",
        "when": "!terminalFocus"
      },
      {
        "key": "ctrl+alt+s",
        "command": "workbench.action.terminal.sendSequence",
        "args": { "text": "bun auto:status\n" },
        "when": "terminalFocus"
      },
      {
        "key": "ctrl+alt+t",
        "command": "workbench.action.tasks.runTask",
        "args": "CreatorFlow: Type Check",
        "when": "!terminalFocus"
      },
      {
        "key": "ctrl+alt+g",
        "command": "workbench.action.tasks.runTask",
        "args": "CreatorFlow: Git Safe Start",
        "when": "!terminalFocus"
      },
      {
        "key": "ctrl+alt+w",
        "command": "workbench.action.tasks.runTask",
        "args": "CreatorFlow: Git WIP Save",
        "when": "!terminalFocus"
      },
      {
        "key": "ctrl+alt+d",
        "command": "workbench.action.tasks.runTask",
        "args": "CreatorFlow: Git Done",
        "when": "!terminalFocus"
      },
      {
        "key": "ctrl+alt+h",
        "command": "workbench.action.tasks.runTask",
        "args": "CreatorFlow: Health Check",
        "when": "!terminalFocus"
      },
      {
        "key": "ctrl+shift+`",
        "command": "workbench.action.terminal.new",
        "when": "!terminalFocus"
      }
    ];

    await this.writeJsonFile(this.keybindingsPath, keybindings);
    console.log('   ✅ Keyboard shortcuts configured');
  }

  async setupExtensions() {
    console.log('📦 Configuring recommended extensions...');

    const extensions = {
      "recommendations": [
        // Essential for TypeScript/React development
        "ms-vscode.vscode-typescript-next",
        "bradlc.vscode-tailwindcss",
        "esbenp.prettier-vscode",
        "ms-vscode.vscode-eslint",
        
        // Git workflow
        "eamodio.gitlens",
        "github.vscode-pull-request-github",
        "mhutchie.git-graph",
        
        // Database and API
        "supabase.supabase-vscode",
        "ms-vscode.vscode-json",
        
        // Testing
        "ms-vscode.test-adapter-converter",
        "orta.vscode-jest",
        
        // Productivity
        "ms-vscode.vscode-todo-highlight",
        "aaron-bond.better-comments",
        "formulahendry.auto-rename-tag",
        "christian-kohler.path-intellisense",
        
        // Terminal and automation
        "ms-vscode.powershell",
        "formulahendry.terminal",
        
        // Documentation
        "yzhang.markdown-all-in-one",
        "davidanson.vscode-markdownlint"
      ],
      "unwantedRecommendations": [
        "ms-vscode.vscode-typescript", // Use typescript-next instead
        "hookyqr.beautify" // Use prettier instead
      ]
    };

    await this.writeJsonFile(this.extensionsPath, extensions);
    console.log('   ✅ Extensions configured');
  }

  async setupStatusBar() {
    console.log('📊 Setting up status bar integration...');

    // Create a simple status bar script
    const statusBarScript = `#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function getAutomationStatus() {
  const statusFile = path.join(process.cwd(), '.automation-status');
  
  if (!fs.existsSync(statusFile)) {
    return { running: false, level: 'off' };
  }
  
  try {
    const status = JSON.parse(fs.readFileSync(statusFile, 'utf8'));
    return status;
  } catch {
    return { running: false, level: 'unknown' };
  }
}

const status = getAutomationStatus();
const icon = status.running ? '🤖' : '💤';
const level = status.level.toUpperCase();
console.log(\`\${icon} CreatorFlow \${level}\`);
`;

    const statusBarPath = path.join(process.cwd(), 'scripts', 'vscode-status.js');
    fs.writeFileSync(statusBarPath, statusBarScript);
    fs.chmodSync(statusBarPath, '755');

    console.log('   ✅ Status bar script created');
  }

  async mergeJsonFile(filePath, newContent) {
    let existingContent = {};
    
    if (fs.existsSync(filePath)) {
      try {
        existingContent = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      } catch (error) {
        // If file exists but is invalid JSON, backup and create new
        const backupPath = `${filePath}.backup`;
        if (fs.existsSync(filePath)) {
          fs.copyFileSync(filePath, backupPath);
          console.log(`   ⚠️  Backed up invalid JSON to ${backupPath}`);
        }
      }
    }

    const mergedContent = { ...existingContent, ...newContent };
    fs.writeFileSync(filePath, JSON.stringify(mergedContent, null, 2));
  }

  async writeJsonFile(filePath, content) {
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
  }

  async installRecommendedExtensions() {
    console.log('🔧 Installing recommended VS Code extensions...');

    const extensions = [
      'ms-vscode.vscode-typescript-next',
      'bradlc.vscode-tailwindcss',
      'esbenp.prettier-vscode',
      'ms-vscode.vscode-eslint',
      'eamodio.gitlens',
      'supabase.supabase-vscode'
    ];

    for (const extension of extensions) {
      try {
        console.log(`   Installing ${extension}...`);
        execSync(`code --install-extension ${extension}`, { stdio: 'pipe' });
        console.log(`   ✅ ${extension} installed`);
      } catch (error) {
        console.log(`   ⚠️  ${extension} installation failed (may already be installed)`);
      }
    }
  }

  async createWorkspaceFile() {
    console.log('📁 Creating VS Code workspace file...');

    const workspace = {
      "folders": [
        {
          "path": "."
        }
      ],
      "settings": {
        "creatorflow.workspace": true
      },
      "extensions": {
        "recommendations": [
          "ms-vscode.vscode-typescript-next",
          "bradlc.vscode-tailwindcss",
          "esbenp.prettier-vscode",
          "supabase.supabase-vscode"
        ]
      },
      "tasks": {
        "version": "2.0.0",
        "tasks": [
          {
            "label": "Start CreatorFlow Development",
            "dependsOrder": "sequence",
            "dependsOn": [
              "CreatorFlow: Start Automation",
              "CreatorFlow: Type Check"
            ]
          }
        ]
      }
    };

    const workspacePath = path.join(process.cwd(), 'creator-flow.code-workspace');
    fs.writeFileSync(workspacePath, JSON.stringify(workspace, null, 2));
    console.log('   ✅ Workspace file created: creator-flow.code-workspace');
  }

  showUsage() {
    console.log('🚀 CreatorFlow VS Code Integration');
    console.log('=================================');
    console.log('');
    console.log('Usage: bun vscode:setup [options]');
    console.log('');
    console.log('Options:');
    console.log('  --full          Complete setup including extension installation');
    console.log('  --extensions    Install recommended extensions only');
    console.log('  --workspace     Create workspace file only');
    console.log('  --help, -h      Show this help');
    console.log('');
    console.log('Examples:');
    console.log('  bun vscode:setup');
    console.log('  bun vscode:setup --full');
    console.log('  bun vscode:setup --extensions');
  }
}

// CLI Interface
async function main() {
  const args = process.argv.slice(2);
  const integration = new VSCodeIntegration();

  if (args.includes('--help') || args.includes('-h')) {
    integration.showUsage();
    return;
  }

  if (args.includes('--extensions')) {
    await integration.installRecommendedExtensions();
    return;
  }

  if (args.includes('--workspace')) {
    await integration.createWorkspaceFile();
    return;
  }

  // Default: full setup
  await integration.setup();
  
  if (args.includes('--full')) {
    console.log('');
    await integration.installRecommendedExtensions();
    await integration.createWorkspaceFile();
  }

  console.log('');
  console.log('🎯 VS Code integration is ready!');
  console.log('💡 Restart VS Code and use Ctrl+Alt+A to start automation');
}

if (require.main === module) {
  main().catch(error => {
    console.error('❌ VS Code setup error:', error);
    process.exit(1);
  });
}

module.exports = VSCodeIntegration;
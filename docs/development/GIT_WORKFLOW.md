# CreatorFlow Git Safety Workflow

## 🎯 Overview

This guide establishes mandatory git safety procedures to ensure we never lose work and maintain clean development states. The core principle is simple: **Never start new work with uncommitted changes**.

## 🛡️ Git Safety Workflow (MANDATORY)

### **Core Principle**: "Never Start New Work with Uncommitted Changes"

### **Before ANY New Task** (5-second safety check):

```bash
# Option 1: Manual workflow
git status                              # Check current state
git add . && git commit -m "wip: brief description"  # Commit if changes exist
git push origin main                    # Push if work is approved
git status                              # Verify clean state

# Option 2: Use bun scripts (recommended)
bun git:safe-start                      # Automated safety check
```

### **During Development**:
- **Commit at logical breakpoints**: tests pass, feature works, bug fixed
- **Use conventional commits**: `feat:`, `fix:`, `docs:`, `refactor:`, `wip:`
- **Push immediately** when work is approved/complete
- **Never commit broken code** to main (unless clearly marked `wip:`)

### **Completing Work**:
```bash
# Manual
git add .
git commit -m "feat: implement order automation"
git push origin main

# Or use bun script
bun git:done "feat: implement order automation"
```

## 🌿 Smart Branching Strategy

### **Decision Tree**:
- **Small changes** (<30min): Work on `main`, commit when done
- **Features/Large work** (>30min): Create feature branch → PR → merge
- **Experimental work**: Always use feature branch
- **Bug fixes**: Depends on size (small → main, complex → branch)

### **Enhanced Feature Branch Workflow**:

#### **Automated Approach** (Recommended):
```bash
# Create feature branch with safety checks
bun git:branch "order-automation"

# Work on feature, commit progress
bun git:wip "implementing order validation"
bun git:save "feat: add order processing logic"

# Create PR when ready
bun git:pr "Add Order Automation" "Implements automated order processing"

# After PR is merged, cleanup
bun git:switch main
bun git:cleanup "feature/order-automation"
```

#### **Manual Approach** (Traditional):
```bash
# Create and switch to feature branch
git checkout -b feature/order-automation

# Work, commit, and push
git add .
git commit -m "feat: add order processing logic"
git push origin feature/order-automation

# Create PR when ready
gh pr create --title "Add Order Automation" --body "Description..."
```

## ⚡ Speed Optimization

### **Bun Scripts** (Available in package.json):

#### **Basic Workflow:**
```bash
bun git:safe-start          # Check if ready for new task
bun git:status              # Quick status check
bun git:save "message"      # Add, commit with message
bun git:done "message"      # Add, commit, and push
bun git:wip "description"   # Quick work-in-progress commit
```

#### **Smart Branch Management:**
```bash
# Smart branch type detection
bun git:branch "fix-webhook-bug"         # → fix/webhook  (detects "fix", removes redundant words)
bun git:branch "critical-payment"        # → hotfix/payment  (detects "critical")  
bun git:branch "update-docs"             # → docs/update  (detects "docs")
bun git:branch "optimize-queries"        # → perf/queries  (detects "optimize")
bun git:branch "tiktok-integration"      # → feature/tiktok-integration  (default)

# Explicit type override
bun git:branch "dashboard" --type=refactor  # → refactor/dashboard

# Other commands
bun git:switch "branch-name"      # Switch branches safely (auto-saves work)
bun git:pr "title" "description"  # Create pull request from current branch
bun git:cleanup                   # Delete merged branches automatically
```

### **Recommended Git Aliases** (Optional - add to ~/.gitconfig):
```bash
[alias]
    s = status
    ac = "!git add . && git commit -m"
    p = push origin HEAD
    co = checkout
    cb = checkout -b
    l = log --oneline -10
```

### **Usage Examples**:

#### **Main Branch Workflow**:
```bash
# Starting new task
bun git:safe-start

# Quick save during work
bun git:wip "halfway through order validation"

# Complete and push approved work
bun git:done "feat: complete order automation system"

# Just commit without push
bun git:save "fix: resolve shipping calculation bug"
```

#### **Feature Branch Workflow**:
```bash
# Create new feature branch
bun git:branch "shipping-optimization"

# Work and commit
bun git:wip "implementing rate comparison"
bun git:done "feat: add multi-carrier rate comparison"

# Create pull request
bun git:pr "Shipping Rate Optimization" "Adds rate comparison across carriers"

# Switch back to main
bun git:switch main

# Clean up after merge
bun git:cleanup "feature/shipping-optimization"
```

## 🧠 Smart Branch Type Detection

### **Supported Branch Types:**

| Branch Type | Keywords | Purpose | Examples |
|-------------|----------|---------|----------|
| `feature/` | *(default)* | New functionality | `feature/tiktok-integration` |
| `fix/` | fix, bug, issue, error, broken, resolve, repair | Bug fixes | `fix/webhook-validation` |
| `hotfix/` | hotfix, critical, urgent, emergency, prod, production | Critical production fixes | `hotfix/payment-failure` |
| `docs/` | doc, docs, readme, guide, documentation, manual | Documentation updates | `docs/api-reference` |
| `refactor/` | refactor, cleanup, restructure, reorganize, rewrite | Code restructuring | `refactor/order-service` |
| `test/` | test, spec, testing, coverage, e2e, unit | Adding/updating tests | `test/shipping-integration` |
| `perf/` | perf, performance, optimize, speed, fast, slow | Performance improvements | `perf/database-queries` |
| `security/` | security, auth, secure, vulnerability, exploit | Security-related changes | `security/webhook-validation` |
| `chore/` | chore, deps, dependency, config, setup, update, upgrade | Maintenance tasks | `chore/update-dependencies` |

### **Smart Detection Examples:**
```bash
# Input → Detection → Final Branch Name
bun git:branch "fix-order-bug"           # → fix/order (removes "fix" and "bug")
bun git:branch "critical-webhook"        # → hotfix/webhook (critical = hotfix)
bun git:branch "update-readme"           # → docs/readme (update + docs keyword)
bun git:branch "refactor-components"     # → refactor/components
bun git:branch "optimize-shipping"       # → perf/shipping (optimize = performance)
bun git:branch "add-auth-tests"          # → test/add-auth
bun git:branch "order-management"        # → feature/order-management (default)

# Explicit type override when smart detection isn't perfect
bun git:branch "performance-dashboard" --type=feature  # → feature/performance-dashboard
```

### **Priority Detection Order:**
Smart detection prioritizes more specific keywords first to avoid false matches:
1. `hotfix` (checked before `fix` to avoid "hotfix" → "fix")
2. `security`, `perf`, `refactor`, `test`, `docs`, `chore`
3. `fix` (checked last since it appears in "hotfix")
4. `feature` (default fallback)

## 🛡️ Advanced Branch Safety Features

### **Auto-Save Before Branch Switch**:
```bash
# Automatically saves uncommitted work before switching
bun git:switch main  # Auto-commits current work if needed
```

### **Smart Branch Creation**:
```bash
# Updates main, creates clean branch
bun git:branch "new-feature"
# - Checks for uncommitted changes
# - Updates main branch from remote
# - Creates feature branch with clean naming
```

### **Automated PR Creation**:
```bash
# Creates PR with template
bun git:pr "Feature Title" "Description"
# - Pushes branch automatically
# - Uses standardized PR template
# - Falls back to manual URL if gh CLI unavailable
```

### **Intelligent Cleanup**:
```bash
# Auto-finds and removes merged branches
bun git:cleanup
# - Finds all merged branches
# - Safely deletes local and remote branches
# - Preserves main and current branch
```

## 🚨 Emergency Recovery

Since all work is committed, you can always recover:

### **View Recent Work**:
```bash
git log --oneline -10       # See last 10 commits
git show HEAD               # See last commit details
```

### **Undo Operations**:
```bash
git reset HEAD~1            # Undo last commit (keep changes)
git reset --hard HEAD~1     # Undo last commit (discard changes)
git revert <commit-hash>    # Undo specific commit safely
```

### **Recover Lost Work**:
```bash
git reflog                  # See all recent operations
git checkout <commit>       # Go to specific point
git cherry-pick <commit>    # Apply specific commit elsewhere
```

## 📋 Development Workflow Examples

### **Small Bug Fix**:
```bash
bun git:safe-start                    # Ensure clean state
# Fix the bug
bun test                              # Verify fix works
bun git:done "fix: resolve order total calculation"
```

### **New Feature Development**:
```bash
bun git:safe-start
git checkout -b feature/analytics-dashboard
# Develop feature
bun test && bun run type-check        # Verify quality
bun git:save "feat: add analytics dashboard layout"
git push origin feature/analytics-dashboard
gh pr create --title "Analytics Dashboard"
```

### **Work Session End**:
```bash
# If work is incomplete
bun git:wip "progress on shipping integration - 70% complete"

# If work is complete and tested
bun git:done "feat: complete shipping carrier integration"
```

## 🔍 Quality Gates

Before committing to main:
- [ ] `bun run type-check` passes
- [ ] `bun run lint` passes  
- [ ] Core functionality tested
- [ ] No console errors
- [ ] Changes align with PR/issue requirements

Before pushing:
- [ ] Commit message follows conventional format
- [ ] Changes are complete and functional
- [ ] User/team has approved the work (if applicable)

## 🎯 Common Scenarios

### **Switching Tasks Mid-Work**:
```bash
# Save current progress
bun git:wip "partial implementation of user auth"

# Switch to urgent task
git checkout -b hotfix/critical-bug
# ... fix bug ...
bun git:done "fix: resolve payment processing error"

# Return to previous work
git checkout main  # or feature branch
# Continue where you left off
```

### **Collaborating with Team**:
```bash
# Before starting work on shared main branch
git pull origin main              # Get latest changes
bun git:safe-start               # Ensure clean state

# Before creating PR
git pull origin main              # Get latest changes
git rebase main                   # Clean up commits if needed
```

### **Handling Merge Conflicts**:
```bash
git pull origin main
# Resolve conflicts in editor
git add .
git commit -m "resolve: merge conflicts from main"
bun git:done "feat: complete feature with resolved conflicts"
```

## 🛠️ Setup Instructions

The git workflow scripts are already configured in `package.json`. To use them:

```bash
# Check available scripts
bun run

# Use any git workflow script
bun git:safe-start
bun git:done "your commit message"
```

## 📚 Related Documentation

- [Development Guide](./README.md) - Complete development setup
- [Documentation Standards](./documentation-standards/DOCUMENTATION_STANDARDS.md) - Project documentation rules
- [Project Overview](../../CLAUDE.md) - Main project guidelines

---

## 🚨 Enterprise Disaster Recovery

### **5-Layer Protection System:**

| Layer | Protection Level | Commands | Purpose |
|-------|-----------------|----------|---------|
| **Level 1** | Basic Safety | `git:safe-start`, `git:wip`, `git:done` | Never lose current work |
| **Level 2** | Remote Backup | `git push origin main` | GitHub backup (automatic) |
| **Level 3** | Repository Health | `git:health-check`, `git:backup` | Local backups + integrity monitoring |
| **Level 4** | Multi-Remote Safety | `git:mirror setup`, `git:mirror sync` | Multiple backup locations |
| **Level 5** | Catastrophic Recovery | `git:recover emergency`, `git:restore-backup` | Nuclear recovery options |

### **Disaster Recovery Commands:**

#### **Health Monitoring:**
```bash
bun git:health-check              # Complete repository health scan
# ✅ Checks: integrity, remotes, backups, large files, branch status
```

#### **Backup System:**
```bash
bun git:backup                    # Create complete repository backup
bun git:restore-backup            # List and restore from backups
bun git:restore-backup 1          # Restore latest backup
bun git:restore-backup "2024-01-15" # Restore by date
```

#### **Multi-Remote Redundancy:**
```bash
bun git:mirror setup https://gitlab.com/user/repo.git    # Add backup remote
bun git:mirror setup https://bitbucket.org/user/repo.git # Add another backup
bun git:mirror sync               # Sync to all backup remotes
bun git:mirror test               # Test all remote connections
bun git:mirror list               # Show all configured remotes
```

#### **Advanced Recovery:**
```bash
# Recover specific items
bun git:recover branch "lost-branch"     # Recover deleted branch
bun git:recover commit "abc123"          # Recover specific commit
bun git:recover file "deleted-file.js"   # Recover deleted file

# Emergency situations
bun git:recover emergency                 # Emergency recovery mode
bun git:recover reset-soft               # Undo last commit (keep changes)
bun git:recover stash                    # Recover from git stash

# Nuclear options (DESTRUCTIVE)
bun git:recover reset-hard               # Reset to last clean state
```

### **Disaster Recovery Scenarios:**

#### **Scenario 1: Accidental Branch Delete**
```bash
# Problem: Deleted important feature branch
bun git:recover branch "feature/important-work"
# ✅ Recovers branch from reflog, switches to recovered branch
```

#### **Scenario 2: Repository Corruption**
```bash
# Problem: Git repository corrupted
bun git:health-check                      # Diagnose corruption
bun git:restore-backup                   # Restore from backup
# ✅ Complete repository restoration from backup bundle
```

#### **Scenario 3: Remote Repository Deleted**
```bash
# Problem: GitHub repository accidentally deleted
bun git:mirror list                       # Check backup remotes
bun git:mirror sync gitlab-backup        # Push to backup remote
# ✅ Code safely stored across multiple remotes
```

#### **Scenario 4: Hard Drive Failure**
```bash
# Problem: Local machine failed, need to recover work
# 1. Clone from any backup remote:
git clone https://gitlab.com/user/repo.git
# 2. Restore local backups if needed:
bun git:restore-backup
# ✅ Full recovery from multiple backup sources
```

#### **Scenario 5: Commit History Destroyed**
```bash
# Problem: Someone force-pushed and destroyed history
bun git:recover emergency                 # Assess damage
bun git:restore-backup 2                 # Restore from before incident
# ✅ Complete history restoration
```

### **Automated Backup Strategy:**

#### **Daily Backup Automation (Cron Job):**
```bash
# Add to crontab: crontab -e
0 2 * * * cd /path/to/creator-flow && bun git:backup && bun git:mirror sync
# Runs daily at 2 AM: backup + sync to all remotes
```

#### **Pre-Push Hook Backup:**
```bash
# .git/hooks/pre-push
#!/bin/bash
echo "🔒 Creating backup before push..."
bun git:backup
bun git:health-check
```

### **Enterprise Setup Checklist:**

- [ ] **Primary Remote**: GitHub (origin) configured ✅
- [ ] **Backup Remote 1**: GitLab backup configured  
- [ ] **Backup Remote 2**: Bitbucket backup configured
- [ ] **Local Backups**: `.git-backups/` directory created
- [ ] **Health Monitoring**: Weekly health checks scheduled
- [ ] **Team Training**: All developers know recovery commands
- [ ] **Documentation**: Recovery procedures documented
- [ ] **Testing**: Recovery procedures tested monthly

**Remember**: This enterprise-grade disaster recovery system ensures your CreatorFlow development is protected against any catastrophic failure. The 5-layer protection prevents data loss at multiple levels.
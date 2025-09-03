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

### **Feature Branch Workflow**:
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
```bash
bun git:safe-start          # Check if ready for new task
bun git:status              # Quick status check
bun git:save "message"      # Add, commit with message
bun git:done "message"      # Add, commit, and push
bun git:wip "description"   # Quick work-in-progress commit
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

**Remember**: This workflow ensures we never lose work and maintains clean development states. The 5-second safety check prevents hours of potential work loss.
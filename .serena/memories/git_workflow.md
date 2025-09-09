# CreatorFlow Git Workflow

## Core Principle
**"Never Start New Work with Uncommitted Changes"**

## Essential Commands

### Before ANY New Task (5-second safety check)
```bash
bun git:safe-start          # Automated safety check (RECOMMENDED)
# OR manual: git status → git add . → git commit → git push
```

### During Development
```bash
bun git:wip "description"   # Quick work-in-progress commit
bun git:save "message"      # Add, commit with message (no push)
bun git:done "message"      # Add, commit, and push (complete work)
```

### Branch Management
```bash
# Smart branch creation with type detection
bun git:branch "fix-webhook-bug"      # → fix/webhook
bun git:branch "critical-payment"     # → hotfix/payment  
bun git:branch "update-docs"          # → docs/update
bun git:branch "optimize-queries"     # → perf/queries
bun git:branch "tiktok-integration"   # → feature/tiktok-integration

# Branch operations
bun git:switch "branch-name"          # Switch safely (auto-saves work)
bun git:pr "title" "description"      # Create pull request
bun git:cleanup                       # Delete merged branches
```

## Branching Strategy

### Decision Tree
- **Small changes** (<30min): Work on `main`, commit when done
- **Features/Large work** (>30min): Create feature branch → PR → merge
- **Experimental work**: Always use feature branch
- **Bug fixes**: Depends on size (small → main, complex → branch)

### Branch Types (Auto-detected)
- `feature/` - New functionality (default)
- `fix/` - Bug fixes (keywords: fix, bug, issue, error, broken)
- `hotfix/` - Critical production fixes (keywords: hotfix, critical, urgent, emergency)
- `docs/` - Documentation (keywords: doc, docs, readme, guide)
- `refactor/` - Code restructuring (keywords: refactor, cleanup, restructure)
- `test/` - Testing (keywords: test, spec, testing, coverage)
- `perf/` - Performance (keywords: perf, performance, optimize, speed)
- `chore/` - Maintenance (keywords: chore, deps, dependency, config)

## Workflow Examples

### Main Branch Workflow
```bash
bun git:safe-start                    # Check clean state
# ... make changes ...
bun git:wip "halfway through feature" # Save progress
# ... continue work ...
bun git:done "feat: complete feature" # Finish and push
```

### Feature Branch Workflow
```bash
bun git:branch "shipping-optimization"              # Create branch
bun git:wip "implementing rate comparison"          # Save progress
bun git:done "feat: add multi-carrier comparison"   # Complete work
bun git:pr "Shipping Optimization" "Description"    # Create PR
bun git:switch main                                 # Return to main
bun git:cleanup "feature/shipping-optimization"     # Clean up
```

## Commit Message Format
- Use conventional commits: `feat:`, `fix:`, `docs:`, `refactor:`, `wip:`
- Present tense: "implement feature" not "implemented feature"
- Commit at logical breakpoints: tests pass, feature works, bug fixed
- Never commit broken code to main (unless marked `wip:`)

## Emergency Recovery
```bash
git log --oneline -10       # See recent commits
git reset HEAD~1            # Undo last commit (keep changes)
git reset --hard HEAD~1     # Undo last commit (discard changes)
git reflog                  # See all operations for recovery
```

## Safety Rules
1. Always commit before switching branches
2. Push immediately when work is approved/complete
3. Use `bun git:safe-start` before new tasks
4. Never force push to shared branches
5. All work is committed - nothing is ever lost
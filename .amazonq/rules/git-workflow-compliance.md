# Git Workflow Compliance

## Mandatory Git Rules

- **NEVER bypass pre-commit hooks** under any circumstances
- **MUST follow** `/home/carlos/projects/creator-flow/docs/development/GIT_WORKFLOW.md`
- Use `bun git:safe-start` before starting new tasks
- Use `bun git:done "message"` for commits and push
- **NEVER execute destructive git commands** (git reset, git clean, git checkout --force)
- **NEVER use git:wip** or any git workflow commands that modify files without user instruction

## Pre-commit Hook Requirements

- All commits must pass linting (ESLint)
- All commits must pass type checking (TypeScript)
- All commits must pass quality gates
- If pre-commit hooks fail, **fix the underlying issues** rather than bypassing them
- Never suggest using `--no-verify` or similar bypass flags

## Branch Strategy

- Use feature branches: `feature/description`, `fix/issue-name`
- Test locally before committing: `bun test && bun run test:e2e`
- Follow proper commit message conventions
- Ensure all changes are tested and documented

# Task Completion Checklist for CreatorFlow

When completing a task, ensure you follow these steps:

## Code Quality Checks
1. Run TypeScript type checking:
   ```bash
   bun run type-check
   ```

2. Run ESLint to check for linting issues:
   ```bash
   bun run lint
   ```

3. Fix any linting issues that can be automatically resolved:
   ```bash
   bun run lint:fix
   ```

## Testing
1. Run unit tests to ensure no regressions:
   ```bash
   bun test
   ```

2. For UI-related changes, consider running E2E tests:
   ```bash
   bun run test:e2e
   ```

## Code Review
1. Ensure code follows the style and conventions documented in code_style_and_conventions.md
2. Verify that the code change is focused and doesn't include unrelated modifications
3. Check that any new components or functions are properly typed
4. Confirm that any new features are appropriately documented

## Git Practices
1. Make sure your commit message is clear and concise
2. Follow conventional commit message format if applicable
3. Ensure you've only staged the files that are part of this specific task

After completing these steps, your task can be considered complete and ready for review or deployment.
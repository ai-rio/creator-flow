# Testing Requirements

## Mandatory Testing Standards

- **Unit Tests**: >90% coverage for business logic (Jest, React Testing Library)
- **Integration Tests**: 100% coverage for API endpoints
- **E2E Tests**: 100% coverage for critical user journeys (Playwright)
- **DO NOT automatically add tests** unless explicitly requested by user
- **Only modify/remove unit tests** when explicitly requested by user

## Testing Strategy

- **Test Pyramid**: More unit tests, fewer E2E tests
- **Test Independence**: Tests should not depend on each other
- **Fast Feedback**: Critical tests run on every commit
- **Realistic Data**: Use production-like test data
- **Security Testing**: Include security testing in automation

## Quality Gates

- All tests must pass before commits
- No flaky tests allowed (>99% pass rate)
- Performance tests for critical paths
- Accessibility testing with axe-core
- Cross-browser testing (Chrome, Firefox, Safari)

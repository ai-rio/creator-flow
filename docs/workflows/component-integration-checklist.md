# Component Integration Checklist

## Pre-Integration Validation

### 1. Layout Integration

- [ ] **Route Structure**: Place page in correct locale structure (`src/app/[locale]/page-name/page.tsx`)
- [ ] **Layout Usage**: Ensure component uses appropriate layout (avoid `(public)` for pages needing header/footer)
- [ ] **Layout Conflicts**: Remove duplicate elements (headers, footers, theme toggles) that layout provides

### 2. Theme Integration

- [ ] **System Theme**: Use `useTheme()` from `next-themes` instead of local theme state
- [ ] **Theme Provider**: Ensure component is wrapped by ThemeProvider context
- [ ] **No Duplicate Toggles**: Remove custom theme toggles if layout provides one
- [ ] **Theme Consistency**: Use system theme classes instead of hardcoded theme objects

### 3. Internationalization (i18n)

- [ ] **Translation Namespace**: Use correct namespace (`useTranslations('namespace')`)
- [ ] **Translation Files**: Create dedicated translation files (e.g., `legal.json`)
- [ ] **i18n Configuration**: Add new translation module to `src/i18n/request.ts`
- [ ] **Locale Support**: Add translations for all supported locales (EN/ES/PT-BR)

### 4. Hydration & SSR

- [ ] **Client Directive**: Add `'use client'` for components using hooks
- [ ] **Hydration Safety**: Handle client-only features with `useEffect` and mounting state
- [ ] **Static Rendering**: Ensure server and client render same initial state

### 5. TypeScript Compliance

- [ ] **Type Safety**: All props and state properly typed
- [ ] **Import Sorting**: Use correct import order (external, internal, types)
- [ ] **Type Check**: Run `bun run type-check` before commit

### 6. Performance & Accessibility

- [ ] **Reduced Motion**: Support `prefers-reduced-motion` for animations
- [ ] **ARIA Labels**: Include proper accessibility attributes
- [ ] **GPU Acceleration**: Use `transform: translate3d(0, 0, 0)` for animations
- [ ] **Memoization**: Use `React.memo` and `useCallback` for performance

## Common Anti-Patterns to Avoid

❌ **Don't**: Create custom theme toggles when layout provides one
❌ **Don't**: Place pages in `(public)` route group if they need header/footer
❌ **Don't**: Use hardcoded theme objects instead of system theme
❌ **Don't**: Mix translation namespaces (e.g., legal content in features.json)
❌ **Don't**: Forget to add new translation modules to i18n configuration

## Validation Commands

```bash
# Type checking
bun run type-check

# Linting
bun run lint

# Development server test
bun run dev
```

## Integration Phases

1. **Motion Specialist**: Component creation with animations
2. **UI Translator**: Complete internationalization setup
3. **Integration**: Layout, theme, and route integration
4. **Validation**: Type checking, testing, and quality assurance

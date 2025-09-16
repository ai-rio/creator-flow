# Component Translation Workflow

## Overview

This workflow ensures all UI components are properly localized across English, Spanish, and Portuguese.

## Supported Languages

- 🇺🇸 **English** (`en`) - Default/Fallback
- 🇪🇸 **Spanish** (`es`)
- 🇧🇷 **Portuguese Brazil** (`pt-br`)

## Translation Files Structure

```
src/messages/
├── en.json      # English (default)
├── es.json      # Spanish
└── pt-br.json   # Portuguese Brazil
```

## Step-by-Step Workflow

### 1. Add Translation Keys

Add new translation keys to all language files:

**English (`en.json`):**

```json
{
  "componentName": {
    "title": "Component Title",
    "description": "Component description",
    "actions": {
      "save": "Save",
      "cancel": "Cancel"
    }
  }
}
```

**Spanish (`es.json`):**

```json
{
  "componentName": {
    "title": "Título del Componente",
    "description": "Descripción del componente",
    "actions": {
      "save": "Guardar",
      "cancel": "Cancelar"
    }
  }
}
```

**Portuguese (`pt-br.json`):**

```json
{
  "componentName": {
    "title": "Título do Componente",
    "description": "Descrição do componente",
    "actions": {
      "save": "Salvar",
      "cancel": "Cancelar"
    }
  }
}
```

### 2. Update Component Code

**Server Components:**

```tsx
import { getTranslations } from 'next-intl/server';

export default async function MyComponent() {
  const t = await getTranslations('componentName');

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </div>
  );
}
```

**Client Components:**

```tsx
'use client';
import { useTranslations } from 'next-intl';

export function MyClientComponent() {
  const t = useTranslations('componentName');

  return (
    <div>
      <h1>{t('title')}</h1>
      <button>{t('actions.save')}</button>
    </div>
  );
}
```

### 3. Translation Key Naming Convention

**Hierarchical Structure:**

```json
{
  "navigation": { ... },
  "auth": { ... },
  "dashboard": { ... },
  "componentName": {
    "title": "...",
    "subtitle": "...",
    "actions": {
      "primary": "...",
      "secondary": "..."
    },
    "messages": {
      "success": "...",
      "error": "..."
    }
  }
}
```

**Key Naming Rules:**

- Use camelCase for keys
- Group related translations under parent objects
- Use descriptive names (not generic like `text1`, `text2`)

### 4. Common Translation Categories

**Standard Categories:**

- `navigation` - Menu items, links
- `auth` - Login, signup, logout
- `dashboard` - Dashboard-specific content
- `account` - Account management
- `header` - Header component content
- `errors` - Error messages
- `actions` - Button labels, CTAs

### 5. Testing Translations

**Manual Testing:**

1. Visit `/en/page` - Check English
2. Visit `/es/page` - Check Spanish
3. Visit `/pt-br/page` - Check Portuguese

**Validation:**

- Ensure all keys exist in all language files
- Test with different browser languages
- Verify fallback to English works

### 6. Auto-Detection Behavior

**Browser Language Detection:**

- Spanish browser → `/es/` routes
- Portuguese browser → `/pt-br/` routes
- Other languages → `/en/` (fallback)

**Manual Language Switching:**

- Users can manually navigate to `/es/`, `/pt-br/`, `/en/`
- Language preference persists in URL

## Best Practices

### ✅ Do's

- Always add translations to ALL language files
- Use descriptive translation keys
- Test in all supported languages
- Keep translations consistent across components
- Use nested objects for organization

### ❌ Don'ts

- Don't hardcode text in components
- Don't leave missing translation keys
- Don't use generic key names
- Don't forget to test fallback behavior
- Don't mix languages in the same file

## Troubleshooting

**Common Errors:**

```
MISSING_MESSAGE: Could not resolve `keyName` in messages for locale `es`
```

**Solution:** Add the missing key to the Spanish translation file.

**Fallback Not Working:**

- Check `defaultLocale: 'en'` in middleware
- Verify English translations exist
- Ensure proper import in `i18n.ts`

## Quick Reference

**Import Patterns:**

```tsx
// Server component
import { getTranslations } from 'next-intl/server';
const t = await getTranslations('namespace');

// Client component
import { useTranslations } from 'next-intl';
const t = useTranslations('namespace');
```

**Usage Patterns:**

```tsx
{
  t('simpleKey');
}
{
  t('nested.key');
}
{
  t('actions.save');
}
```

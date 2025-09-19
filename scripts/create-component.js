#!/usr/bin/env node

/**
 * CreatorFlow Component Scaffolding CLI
 * Generates NextJS components with shadcn, i18n, and design tokens
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Component templates
const TEMPLATES = {
  hero: {
    shadcnComponents: ['card', 'button'],
    category: 'organisms',
    description: 'Hero section with call-to-action',
  },
  card: {
    shadcnComponents: ['card', 'badge'],
    category: 'molecules',
    description: 'Feature card with metrics',
  },
  nav: {
    shadcnComponents: ['button', 'sheet'],
    category: 'organisms',
    description: 'Navigation component',
  },
};

function createComponent(name, template = 'card') {
  const templateConfig = TEMPLATES[template];
  if (!templateConfig) {
    console.error(`❌ Template '${template}' not found. Available: ${Object.keys(TEMPLATES).join(', ')}`);
    process.exit(1);
  }

  const componentName = name.charAt(0).toUpperCase() + name.slice(1);
  const componentPath = `src/components/atomic/${templateConfig.category}/${componentName}.tsx`;
  const i18nKey = `components.atomic.${templateConfig.category}.${name}`;

  // 1. Install required shadcn components
  console.log('📦 Installing shadcn components...');
  templateConfig.shadcnComponents.forEach((comp) => {
    try {
      execSync(`bunx shadcn@latest add ${comp}`, { stdio: 'inherit' });
    } catch (error) {
      console.log(`⚠️  Component ${comp} may already exist`);
    }
  });

  // 2. Generate component file
  const componentContent = generateComponentContent(componentName, template, i18nKey);

  // Ensure directory exists
  const dir = path.dirname(componentPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(componentPath, componentContent);
  console.log(`✅ Created component: ${componentPath}`);

  // 3. Generate i18n keys in all locales
  const locales = ['en', 'es', 'pt-br'];
  locales.forEach((locale) => {
    addI18nKeys(locale, i18nKey, template);
  });

  // 4. Update atomic index
  updateAtomicIndex(templateConfig.category, componentName);

  console.log(`🎉 Component '${componentName}' created successfully!`);
  console.log(`📝 Edit translations in: locales/*/features.json`);
  console.log(`🔧 Component file: ${componentPath}`);
}

function generateComponentContent(name, template, i18nKey) {
  switch (template) {
    case 'hero':
      return `import { getTranslations } from 'next-intl/server';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default async function ${name}() {
  const t = await getTranslations('${i18nKey}');

  return (
    <section className="bg-background py-strategic px-tactical transition-colors duration-300">
      <div className="max-w-content mx-auto">
        <Card className="border-border bg-card text-card-foreground">
          <CardHeader>
            <CardTitle className="text-heading-xl text-center">
              {t('title')}
            </CardTitle>
            <p className="text-body-lg text-muted-foreground text-center">
              {t('description')}
            </p>
          </CardHeader>
          <CardContent className="flex justify-center gap-tactical">
            <Button className="bg-brand-teal-primary text-white rounded-premium">
              {t('actions.primary')}
            </Button>
            <Button variant="outline" className="rounded-premium">
              {t('actions.secondary')}
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}`;

    case 'card':
      return `import { getTranslations } from 'next-intl/server';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ${name}Props {
  variant?: 'default' | 'featured';
  className?: string;
}

export default async function ${name}({ variant = 'default', className = '' }: ${name}Props) {
  const t = await getTranslations('${i18nKey}');

  return (
    <Card className={\`bg-card border-border transition-colors duration-300 \${className}\`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-heading-md">
            {t('title')}
          </CardTitle>
          {variant === 'featured' && (
            <Badge className="bg-brand-teal-primary text-white">
              {t('badge.featured')}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-body-md text-muted-foreground">
          {t('description')}
        </p>
        <div className="mt-tactical">
          <span className="text-metric-lg text-foreground">
            {t('metric.value')}
          </span>
          <span className="text-body-sm text-muted-foreground ml-1">
            {t('metric.label')}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}`;

    case 'nav':
      return `'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

export default function ${name}() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('${i18nKey}');

  const navItems = [
    { key: 'dashboard', href: '/dashboard' },
    { key: 'orders', href: '/orders' },
    { key: 'analytics', href: '/analytics' },
  ];

  return (
    <nav className="bg-background border-b border-border transition-colors duration-300">
      <div className="max-w-content mx-auto px-tactical py-tactical">
        <div className="flex items-center justify-between">
          <h1 className="text-heading-md font-bold">
            {t('brand')}
          </h1>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-tactical">
            {navItems.map((item) => (
              <Button key={item.key} variant="ghost" className="rounded-premium">
                {t(\`items.\${item.key}\`)}
              </Button>
            ))}
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-icon-sm w-icon-sm" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-tactical mt-strategic">
                {navItems.map((item) => (
                  <Button key={item.key} variant="ghost" className="justify-start">
                    {t(\`items.\${item.key}\`)}
                  </Button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}`;

    default:
      return `// Component template not implemented`;
  }
}

function addI18nKeys(locale, i18nKey, template) {
  const featuresPath = `locales/${locale}/features.json`;

  if (!fs.existsSync(featuresPath)) {
    console.log(`⚠️  Features file not found: ${featuresPath}`);
    return;
  }

  let features;
  try {
    features = JSON.parse(fs.readFileSync(featuresPath, 'utf8'));
  } catch (error) {
    console.log(`⚠️  Could not parse ${featuresPath}`);
    return;
  }

  // Navigate to the nested key
  const keyParts = i18nKey.split('.');
  let current = features;

  // Create nested structure if needed
  for (let i = 0; i < keyParts.length - 1; i++) {
    if (!current[keyParts[i]]) {
      current[keyParts[i]] = {};
    }
    current = current[keyParts[i]];
  }

  const finalKey = keyParts[keyParts.length - 1];

  // Add template-specific keys
  const templateKeys = getTemplateI18nKeys(template, locale);
  if (!current[finalKey]) {
    current[finalKey] = templateKeys;
  }

  fs.writeFileSync(featuresPath, JSON.stringify(features, null, 2));
  console.log(`✅ Added i18n keys to ${featuresPath}`);
}

function getTemplateI18nKeys(template, locale) {
  const keys = {
    en: {
      hero: {
        title: 'Transform Your Business',
        description: 'Built for creators who refuse to let logistics limit their growth.',
        actions: {
          primary: 'Get Started',
          secondary: 'Learn More',
        },
      },
      card: {
        title: 'Feature Title',
        description: 'Feature description goes here.',
        badge: {
          featured: 'Featured',
        },
        metric: {
          value: '99.8%',
          label: 'accuracy',
        },
      },
      nav: {
        brand: 'CreatorFlow',
        items: {
          dashboard: 'Dashboard',
          orders: 'Orders',
          analytics: 'Analytics',
        },
      },
    },
    es: {
      hero: {
        title: 'Transforma Tu Negocio',
        description: 'Construido para creadores que se niegan a dejar que la logística limite su crecimiento.',
        actions: {
          primary: 'Comenzar',
          secondary: 'Saber Más',
        },
      },
      card: {
        title: 'Título de Función',
        description: 'La descripción de la función va aquí.',
        badge: {
          featured: 'Destacado',
        },
        metric: {
          value: '99.8%',
          label: 'precisión',
        },
      },
      nav: {
        brand: 'CreatorFlow',
        items: {
          dashboard: 'Panel',
          orders: 'Pedidos',
          analytics: 'Analíticas',
        },
      },
    },
    'pt-br': {
      hero: {
        title: 'Transforme Seu Negócio',
        description: 'Construído para criadores que se recusam a deixar a logística limitar seu crescimento.',
        actions: {
          primary: 'Começar',
          secondary: 'Saiba Mais',
        },
      },
      card: {
        title: 'Título do Recurso',
        description: 'A descrição do recurso vai aqui.',
        badge: {
          featured: 'Destaque',
        },
        metric: {
          value: '99.8%',
          label: 'precisão',
        },
      },
      nav: {
        brand: 'CreatorFlow',
        items: {
          dashboard: 'Painel',
          orders: 'Pedidos',
          analytics: 'Análises',
        },
      },
    },
  };

  return keys[locale]?.[template] || keys.en[template];
}

function updateAtomicIndex(category, componentName) {
  const indexPath = `src/components/atomic/${category}/index.ts`;

  let indexContent = '';
  if (fs.existsSync(indexPath)) {
    indexContent = fs.readFileSync(indexPath, 'utf8');
  }

  const exportLine = `export { default as ${componentName} } from './${componentName}';`;

  if (!indexContent.includes(exportLine)) {
    indexContent += `\n${exportLine}`;
    fs.writeFileSync(indexPath, indexContent);
    console.log(`✅ Updated index: ${indexPath}`);
  }
}

// CLI interface
const args = process.argv.slice(2);
const command = args[0];
const name = args[1];
const template = args[2] || 'card';

if (command === 'create' && name) {
  createComponent(name, template);
} else {
  console.log(`
🚀 CreatorFlow Component Scaffolding CLI

Usage:
  node scripts/create-component.js create <name> [template]

Templates:
  card    - Feature card component (default)
  hero    - Hero section with CTAs
  nav     - Navigation component

Examples:
  node scripts/create-component.js create featureCard card
  node scripts/create-component.js create heroSection hero
  node scripts/create-component.js create navbar nav

Features:
  ✅ Installs required shadcn components
  ✅ Generates NextJS component with i18n
  ✅ Creates translations in all locales
  ✅ Applies CreatorFlow design tokens
  ✅ Updates atomic component index
  `);
}
